import React, { useState, useEffect } from "react";
import { getTasks, deleteTask } from "../services/api";
import { Link } from "react-router-dom";

function Tasklist() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await getTasks();
        setTasks(response.data); // assuming response.data contains the task array
      } catch (err) {
        setError("Failed to fetch tasks");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await deleteTask(id); // Call the delete task API
        setTasks(tasks.filter((task) => task.id !== id)); // Update the task list
      } catch (err) {
        setError("Error deleting task. Please try again.");
      }
    }
  };

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mt-4">
      <h2>Task List</h2>
      <div className="row">
        {tasks.length === 0 ? (
          <p>No tasks available</p>
        ) : (
          tasks.map((task) => (
            <div className="col-md-4" key={task.id}>
              <div className="card mb-4">
                <div className="card-body">
                  <h5 className="card-title">{task.title}</h5>
                  <p className="card-text">{task.description}</p>
                  <p className="card-text">
                    <strong>Status:</strong> {task.status}
                  </p>
                  <p className="card-text">
                    <strong>Priority:</strong> {task.priority}
                  </p>
                  <p className="card-text">
                    <strong>Due Date:</strong>{" "}
                    {new Date(task.due_date).toLocaleDateString()}
                  </p>
                  <div className="d-flex justify-content-between">
                    <Link to={`/update/${task.id}`} className="btn btn-warning">
                      Update
                    </Link>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(task.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Tasklist;
