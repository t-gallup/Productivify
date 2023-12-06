import "./NewTaskWindow.css";
import PropTypes from "prop-types";


function NewTaskWindow(props) {
  return (props.openWindow) ? (
    <div className="window-wrapper">
      <h1>Add a New Task</h1>
      <button className="close-button" onClick={() => props.setOpenWindow(false)}>X</button>
      <div className="task-attributes">
        <h2>Completion Day</h2>
        <input type="date"/>
        <h2>Task Description</h2>
        <input type="text"/>
        
      </div>
      <button className="submit-button">Submit</button>
      
    </div>
    
  ) : "";

}

NewTaskWindow.propTypes = {
  openWindow: PropTypes.bool,
  setOpenWindow: PropTypes.func
}

export default NewTaskWindow;