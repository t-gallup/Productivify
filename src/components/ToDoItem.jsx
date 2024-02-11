import "./ToDoItem.css";
import PropTypes from "prop-types";
import CheckBox from '@mui/joy/Checkbox'


function handleEditButtonClick(description, day, setEditDay, setEditDescription, setOpenEditWindow) {
  setEditDay(day);
  setEditDescription(description)
  setOpenEditWindow(true);
}
function handleAddToDo() {

}
function ToDoItem({ description, day, setEditDescription, setEditDay, setOpenEditWindow }) {
  return (
    <>
      <div className="task-box">
        <CheckBox onChange={handleAddToDo}></CheckBox>
        <button className="ind-task-button" onClick={() => handleEditButtonClick(description, day, setEditDay, setEditDescription, setOpenEditWindow)}>
          <p className="task-description"> {description}</p>
        </button>
      </div>
    </>
  );
}

ToDoItem.propTypes = {
  description: PropTypes.string,
  day: PropTypes.string,
  setEditDescription: PropTypes.func,
  setEditDay: PropTypes.func,
  setOpenEditWindow: PropTypes.func,

};

export default ToDoItem;
