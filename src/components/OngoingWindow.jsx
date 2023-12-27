import "./OngoingWindow.css";
import PropTypes from "prop-types";
import { useState } from "react";

function OngoingWindow(props) {
    return props.openOngoingWindow ? (
        <div className="window-wrapper">
            <h1>Edit This Task</h1>
            <button
                className="close-button"
                onClick={() => props.setOpenOngoingWindow(false)}
            >
                X
            </button>
            <div className="list-wrapper">
                <li>
                    <ul>
                        <input type="text"></input>
                    </ul>
                </li>
                <li></li>
            </div>
            <button
                className="edit-button"
                onClick={() =>
                props.handleEditTask(oldDay, newDay, oldDescription, newDescription)
                }
            >
                Submit Edits
            </button>
            <button
                className="delete-button"
                // onClick={() => submitTask(completionDay, taskDescription, props.taskList, props.setOpenWindow)}
                onClick={() =>
                props.handleDeleteTask(props.editDay, props.editDescription)
                }
            >
                Delete Task
            </button>
        </div>
    ) : (
    ""
    );
}
    
OngoingWindow.propTypes = {
    openOngoingWindow: PropTypes.bool,
    setOpenOngoingWindow: PropTypes.func,

};

export default OngoingWindow;
