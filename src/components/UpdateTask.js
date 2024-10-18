import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Import useParams to get the task ID
import { getOneTasks, updateTask } from "../services/api"; // Import API functions

const UpdateTask = () => {
  const { id } = useParams(); // Get the task ID from the URL
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    assigned_to: "",
    status: "",
    priority: "",
    due_date: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await getOneTasks(id); // Fetch the task data by ID
        setTaskData(response.data);
      } catch (err) {
        setError("Error fetching task data. Please try again.");
      }
    };
    fetchTask();
  }, [id]);

  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateTask(id, taskData); // Call the update task API
      navigate("/tasks"); // Redirect to task list after successful update
    } catch (err) {
      setError("Error updating task. Please try again.");
    }
  };

  return (
    <div className="container">
      <h2>Update Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Task Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={taskData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={taskData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="assigned_to" className="form-label">
            Assigned To
          </label>
          <input
            type="text"
            className="form-control"
            id="assigned_to"
            name="assigned_to"
            value={taskData.assigned_to}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="status" className="form-label">
            Status
          </label>
          <select
            className="form-select"
            id="status"
            name="status"
            value={taskData.status}
            onChange={handleChange}
          >
            <option value="pending">Pending</option>
            <option value="in progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="priority" className="form-label">
            Priority
          </label>
          <select
            className="form-select"
            id="priority"
            name="priority"
            value={taskData.priority}
            onChange={handleChange}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="due_date" className="form-label">
            Due Date
          </label>
          <input
            type="date"
            className="form-control"
            id="due_date"
            name="due_date"
            value={taskData.due_date}
            onChange={handleChange}
            required
          />
        </div>
        {error && <div className="text-danger">{error}</div>}
        <button type="submit" className="btn btn-primary">
          Update Task
        </button>
      </form>
    </div>
  );
};

export default UpdateTask;
