import { useState, useEffect } from "react";
import "./StatsPage.css";
import Navbar from "../components/Navbar.jsx";
import PropTypes from "prop-types";
import { DateToKey } from "../functions/DateChanges.jsx";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

function StatsPage(props) {
  const [stats, setStats] = useState({
    totalCompleted: 0,
    totalTime: 0,
    weekComparison: {
      current: { tasks: 0, time: 0 },
      previous: { tasks: 0, time: 0 },
      changes: { tasks: 0, time: 0 }
    },
    pendingTasks: 0,
    habitCompletion: 0,
    habitStreak: 0,
    dayOfWeek: {
      mostProductive: "",
      leastProductive: "",
      data: { tasks: [0,0,0,0,0,0,0], times: [0,0,0,0,0,0,0] }
    },
    monthlyData: [],
    taskDistribution: []
  });
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#a05195', '#d45087'];

  useEffect(() => {
    calculateStatistics();
  }, [props.taskList, props.toDoList, props.habitList]);

  const calculateStatistics = () => {
    const completedTasks = Object.values(props.taskList).flat().length;
    
    const totalTaskTime = Object.values(props.taskList).flat().reduce((total, task) => 
      total + parseInt(task[1], 10), 0);
    
    const weekData = getWeekData(props.taskList);
    
    const pendingTodos = Object.values(props.toDoList).flat().length;
    
    let habitCompletionRate = 0;
    let completedHabits = 0;
    let missedHabits = 0;
    
    Object.entries(props.habitList).forEach(([_, habitData]) => {
      if (habitData.Dates) {
        completedHabits += Object.values(habitData.Dates).filter(status => status === 1).length;
        missedHabits += Object.values(habitData.Dates).filter(status => status === 0).length;
      }
    });
    
    if (completedHabits + missedHabits > 0) {
      habitCompletionRate = (completedHabits / (completedHabits + missedHabits) * 100).toFixed(1);
    }
    
    const dayOfWeekData = getDayOfWeekData(props.taskList);
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
    let maxDay = 0;
    let minDay = 0;
    
    if (dayOfWeekData.tasks.some(val => val > 0)) {
      maxDay = dayOfWeekData.tasks.indexOf(Math.max(...dayOfWeekData.tasks));
      
      const nonZeroDays = dayOfWeekData.tasks.map((val, idx) => ({ val, idx }))
        .filter(item => item.val > 0);
      
      if (nonZeroDays.length > 0) {
        minDay = nonZeroDays.reduce((min, item) => 
          item.val < min.val ? item : min, nonZeroDays[0]
        ).idx;
      }
    }
    
    const dayOfWeekChartData = dayOfWeekData.tasks.map((tasks, index) => ({
      name: dayNames[index].substring(0, 3),
      tasks: tasks,
      hours: dayOfWeekData.times[index]
    }));
    
    const monthlyTrends = getMonthlyTrends(props.taskList, props.toDoList, props.habitList);
    
    const monthlyChartData = monthlyTrends.map(([month, data]) => ({
      name: month,
      tasks: data.tasks,
      todos: data.todos,
      habits: data.habits,
      hours: data.total_time
    }));
    
    const taskDistribution = [
      { name: 'Completed Tasks', value: completedTasks },
      { name: 'Pending Tasks', value: pendingTodos }
    ];
    
    const totalDays = Object.keys(props.taskList).length || 1;
    const avgDailyTasks = (completedTasks / totalDays).toFixed(1);
    
    const habitStreak = calculateLongestStreak(props.habitList);
    
    setStats({
      totalCompleted: completedTasks,
      totalTime: totalTaskTime,
      avgDailyTasks,
      weekComparison: weekData,
      pendingTasks: pendingTodos,
      habitCompletion: habitCompletionRate,
      habitStreak,
      dayOfWeek: {
        mostProductive: dayNames[maxDay],
        leastProductive: dayNames[minDay],
        data: dayOfWeekData,
        chartData: dayOfWeekChartData
      },
      monthlyData: monthlyTrends,
      monthlyChartData,
      taskDistribution
    });
  };

  const getWeekData = (taskList) => {
    const oneDay = 24 * 60 * 60 * 1000;
    const today = new Date();
    
    const currentDay = today.getDay();
    const startOfWeek = new Date(today.getTime() - currentDay * oneDay);
    
    const startOfPrevWeek = new Date(startOfWeek.getTime() - 7 * oneDay);
    
    const formatDate = date => DateToKey(date);
    
    const currentWeekDates = [];
    const prevWeekDates = [];
    
    for (let i = 0; i < 7; i++) {
      currentWeekDates.push(formatDate(new Date(startOfWeek.getTime() + i * oneDay)));
      prevWeekDates.push(formatDate(new Date(startOfPrevWeek.getTime() + i * oneDay)));
    }
    
    const currentWeekTasks = currentWeekDates
      .filter(date => date in taskList)
      .reduce((total, date) => total + taskList[date].length, 0);
    
    const prevWeekTasks = prevWeekDates
      .filter(date => date in taskList)
      .reduce((total, date) => total + taskList[date].length, 0);
    
    const currentWeekTime = currentWeekDates
      .filter(date => date in taskList)
      .reduce((total, date) => 
        total + taskList[date].reduce((sum, task) => sum + parseInt(task[1], 10), 0), 0);
    
    const prevWeekTime = prevWeekDates
      .filter(date => date in taskList)
      .reduce((total, date) => 
        total + taskList[date].reduce((sum, task) => sum + parseInt(task[1], 10), 0), 0);
    
    const taskChange = prevWeekTasks === 0 ? 0 : ((currentWeekTasks - prevWeekTasks) / prevWeekTasks) * 100;
    const timeChange = prevWeekTime === 0 ? 0 : ((currentWeekTime - prevWeekTime) / prevWeekTime) * 100;
    
    return {
      current: {
        tasks: currentWeekTasks,
        time: currentWeekTime
      },
      previous: {
        tasks: prevWeekTasks,
        time: prevWeekTime
      },
      changes: {
        tasks: taskChange.toFixed(1),
        time: timeChange.toFixed(1)
      }
    };
  };

  const getDayOfWeekData = (taskList) => {
    const dayStats = [0, 0, 0, 0, 0, 0, 0];
    const dayTimes = [0, 0, 0, 0, 0, 0, 0];
    
    Object.entries(taskList).forEach(([dateStr, tasks]) => {
      const date = new Date(dateStr + "T00:00:00");
      const dayOfWeek = date.getDay();
      
      dayStats[dayOfWeek] += tasks.length;
      dayTimes[dayOfWeek] += tasks.reduce((sum, task) => sum + parseInt(task[1], 10), 0);
    });
    
    return {
      tasks: dayStats,
      times: dayTimes
    };
  };

  const getMonthlyTrends = (taskList, toDoList, habitList) => {
    const months = {};
    
    Object.entries(taskList).forEach(([date, tasks]) => {
      const month = date.substring(0, 7); // YYYY-MM
      if (!months[month]) {
        months[month] = { tasks: 0, todos: 0, habits: 0, total_time: 0 };
      }
      months[month].tasks += tasks.length;
      months[month].total_time += tasks.reduce((sum, task) => sum + parseInt(task[1], 10), 0);
    });
    
    Object.entries(toDoList).forEach(([date, todos]) => {
      if (date !== "on-00-00" && date !== "1111-11-11") {
        const month = date.substring(0, 7); // YYYY-MM
        if (!months[month]) {
          months[month] = { tasks: 0, todos: 0, habits: 0, total_time: 0 };
        }
        months[month].todos += todos.length;
      }
    });
    
    Object.entries(habitList).forEach(([_, habitData]) => {
      if (habitData.Dates) {
        Object.entries(habitData.Dates).forEach(([date, completed]) => {
          if (completed === 1) {
            const month = date.substring(0, 7);
            if (!months[month]) {
              months[month] = { tasks: 0, todos: 0, habits: 0, total_time: 0 };
            }
            months[month].habits++;
          }
        });
      }
    });
    
    return Object.entries(months)
      .sort(([monthA], [monthB]) => monthA.localeCompare(monthB))
      .slice(-6);
  };

  const calculateLongestStreak = (habitList) => {
    let longestStreak = 0;
    
    Object.values(habitList).forEach(habit => {
      if (habit.Dates) {
        const dates = Object.entries(habit.Dates)
          .filter(([_, completed]) => completed === 1)
          .map(([date]) => date)
          .sort();
        
        if (dates.length === 0) return;
        
        let currentStreak = 1;
        let maxStreak = 1;
        
        for (let i = 1; i < dates.length; i++) {
          const prevDate = new Date(dates[i-1] + "T00:00:00");
          const currDate = new Date(dates[i] + "T00:00:00");
          
          const diffTime = Math.abs(currDate - prevDate);
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          
          if (diffDays === 1) {
            currentStreak++;
            maxStreak = Math.max(maxStreak, currentStreak);
          } else {
            currentStreak = 1;
          }
        }
        
        longestStreak = Math.max(longestStreak, maxStreak);
      }
    });
    
    return longestStreak;
  };

  const renderChangeIndicator = (change) => {
    const numChange = parseFloat(change);
    
    if (numChange > 0) {
      return <span className="positive-change">+{change}% ↑</span>;
    } else if (numChange < 0) {
      return <span className="negative-change">{change}% ↓</span>;
    } else {
      return <span className="neutral-change">0% →</span>;
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`${label}`}</p>
          {payload.map((entry, index) => (
            <p key={`item-${index}`} style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <Navbar
        user={props.user}
        setUser={props.setUser}
        setTaskList={props.setTaskList}
        setToDoList={props.setToDoList}
        setHabitList={props.setHabitList}
      />
      
      <div className="stats-container">
        <h1 className="stats-title">Productivity Statistics</h1>
        
        <div className="stats-grid">
          <div className="stat-card">
            <h2>Tasks Completed</h2>
            <div className="stat-value">{stats.totalCompleted}</div>
          </div>
          
          <div className="stat-card">
            <h2>Total Hours</h2>
            <div className="stat-value">{stats.totalTime}</div>
          </div>
          
          <div className="stat-card">
            <h2>Pending Tasks</h2>
            <div className="stat-value">{stats.pendingTasks}</div>
          </div>
          
          <div className="stat-card">
            <h2>Habit Completion</h2>
            <div className="stat-value">{stats.habitCompletion}%</div>
          </div>
          
          <div className="stat-card wide">
            <h2>Weekly Performance</h2>
            <div className="week-comparison">
              <div>
                <h3>This Week</h3>
                <p>{stats.weekComparison.current.tasks} tasks</p>
                <p>{stats.weekComparison.current.time} hours</p>
              </div>
              <div>
                <h3>Last Week</h3>
                <p>{stats.weekComparison.previous.tasks} tasks</p>
                <p>{stats.weekComparison.previous.time} hours</p>
              </div>
              <div>
                <h3>Change</h3>
                <p>Tasks: {renderChangeIndicator(stats.weekComparison.changes.tasks)}</p>
                <p>Hours: {renderChangeIndicator(stats.weekComparison.changes.time)}</p>
              </div>
            </div>
          </div>
          
          <div className="stat-card wide">
            <h2>Productivity Patterns</h2>
            <div className="productivity-patterns">
              <div>
                <h3>Most Productive Day</h3>
                <p>{stats.dayOfWeek.mostProductive}</p>
              </div>
              <div>
                <h3>Least Productive Day</h3>
                <p>{stats.dayOfWeek.leastProductive}</p>
              </div>
              <div>
                <h3>Avg. Daily Tasks</h3>
                <p>{stats.avgDailyTasks}</p>
              </div>
              <div>
                <h3>Longest Habit Streak</h3>
                <p>{stats.habitStreak} days</p>
              </div>
            </div>
          </div>
          
          <div className="stat-card wide">
            <h2>Monthly Activity</h2>
            <div className="chart-container">
              {stats.monthlyChartData && stats.monthlyChartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart
                    data={stats.monthlyChartData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.2)" />
                    <XAxis 
                      dataKey="name" 
                      stroke="#FFFFFF" 
                      tick={{ fill: '#FFFFFF' }} 
                      tickLine={{ stroke: '#FFFFFF' }}
                      axisLine={{ stroke: '#FFFFFF' }}
                    />
                    <YAxis 
                      stroke="#FFFFFF" 
                      tick={{ fill: '#FFFFFF' }} 
                      tickLine={{ stroke: '#FFFFFF' }}
                      axisLine={{ stroke: '#FFFFFF' }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(47, 79, 79, 0.9)', 
                        border: '1px solid #FFF',
                        color: '#FFFFFF'
                      }} 
                      labelStyle={{ color: '#FFFFFF' }}
                      itemStyle={{ color: '#FFFFFF' }}
                    />
                    <Legend 
                      wrapperStyle={{ color: '#FFFFFF' }}
                      formatter={(value) => <span style={{ color: '#FFFFFF' }}>{value}</span>}
                    />
                    <Line type="monotone" dataKey="tasks" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="todos" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="habits" stroke="#ffc658" />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="no-data-message">
                  <p>No monthly data available yet. Complete more tasks to see trends!</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="stat-card wide">
            <h2>Day of Week Performance</h2>
            <div className="chart-container">
              {stats.dayOfWeek.chartData && stats.dayOfWeek.chartData.some(day => day.tasks > 0) ? (
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart
                    data={stats.dayOfWeek.chartData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.2)" />
                    <XAxis 
                      dataKey="name" 
                      stroke="#FFFFFF" 
                      tick={{ fill: '#FFFFFF' }} 
                      tickLine={{ stroke: '#FFFFFF' }}
                      axisLine={{ stroke: '#FFFFFF' }}
                    />
                    <YAxis 
                      stroke="#FFFFFF" 
                      tick={{ fill: '#FFFFFF' }} 
                      tickLine={{ stroke: '#FFFFFF' }}
                      axisLine={{ stroke: '#FFFFFF' }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(47, 79, 79, 0.9)', 
                        border: '1px solid #FFF',
                        color: '#FFFFFF'
                      }} 
                      labelStyle={{ color: '#FFFFFF' }}
                      itemStyle={{ color: '#FFFFFF' }}
                    />
                    <Legend 
                      wrapperStyle={{ color: '#FFFFFF' }}
                      formatter={(value) => <span style={{ color: '#FFFFFF' }}>{value}</span>}
                    />
                    <Bar dataKey="tasks" name="Tasks" fill="#8884d8" />
                    <Bar dataKey="hours" name="Hours" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="no-data-message">
                  <p>No day of week data available yet. Complete tasks on different days to see patterns!</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="stat-card wide">
            <h2>Task Distribution</h2>
            <div className="chart-container">
              {stats.taskDistribution && stats.taskDistribution.some(item => item.value > 0) ? (
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={stats.taskDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={{ stroke: '#FFFFFF' }}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      labelStyle={{ fill: '#FFFFFF' }}
                    >
                      {stats.taskDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(47, 79, 79, 0.9)', 
                        border: '1px solid #FFF',
                        color: '#FFFFFF'
                      }} 
                      labelStyle={{ color: '#FFFFFF' }}
                      itemStyle={{ color: '#FFFFFF' }}
                    />
                    <Legend 
                      wrapperStyle={{ color: '#FFFFFF' }}
                      formatter={(value) => <span style={{ color: '#FFFFFF' }}>{value}</span>}
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="no-data-message">
                  <p>No task distribution data available yet. Add both completed and to-do tasks to see the breakdown!</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="stat-card wide">
            <h2>Time Breakdown</h2>
            <div className="chart-container">
              {stats.monthlyChartData && stats.monthlyChartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart
                    data={stats.monthlyChartData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.2)" />
                    <XAxis 
                      dataKey="name" 
                      stroke="#FFFFFF" 
                      tick={{ fill: '#FFFFFF' }} 
                      tickLine={{ stroke: '#FFFFFF' }}
                      axisLine={{ stroke: '#FFFFFF' }}
                    />
                    <YAxis 
                      stroke="#FFFFFF" 
                      tick={{ fill: '#FFFFFF' }} 
                      tickLine={{ stroke: '#FFFFFF' }}
                      axisLine={{ stroke: '#FFFFFF' }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(47, 79, 79, 0.9)', 
                        border: '1px solid #FFF',
                        color: '#FFFFFF'
                      }} 
                      labelStyle={{ color: '#FFFFFF' }}
                      itemStyle={{ color: '#FFFFFF' }}
                    />
                    <Legend 
                      wrapperStyle={{ color: '#FFFFFF' }}
                      formatter={(value) => <span style={{ color: '#FFFFFF' }}>{value}</span>}
                    />
                    <Bar dataKey="hours" name="Hours" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="no-data-message">
                  <p>No time data available yet. Add tasks with time estimates to see your time breakdown!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

StatsPage.propTypes = {
  user: PropTypes.object,
  setUser: PropTypes.func,
  setTaskList: PropTypes.func,
  setToDoList: PropTypes.func,
  setHabitList: PropTypes.func,
  taskList: PropTypes.object,
  toDoList: PropTypes.object,
  habitList: PropTypes.object,
};

export default StatsPage;