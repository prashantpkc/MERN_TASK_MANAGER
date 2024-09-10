import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Input, { Textarea } from '../components/utils/Input';
import Loader from '../components/utils/Loader';
import useFetch from '../hooks/useFetch';
import MainLayout from '../layouts/MainLayout';
import validateManyFields from '../validations';
import { Select, MenuItem } from '@mui/material';

const Task = () => {
  const authState = useSelector(state => state.authReducer);
  const navigate = useNavigate();
  const [fetchData, { loading }] = useFetch();
  const { taskId } = useParams();

  const mode = taskId === undefined ? "add" : "update";
  const [task, setTask] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "medium",
    status: "pending"
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    document.title = mode === "add" ? "Add Task" : "Update Task";
  }, [mode]);

  useEffect(() => {
    if (mode === "update") {
      const config = { url: `/tasks/${taskId}`, method: "get", headers: { Authorization: authState.token } };
      fetchData(config, { showSuccessToast: false }).then((data) => {
        setTask(data.task);
        setFormData({
          title: data.task.title,
          description: data.task.description,
          dueDate: data.task.dueDate,
          priority: data.task.priority,
          status: data.task.status
        });
      });
    }
  }, [mode, authState, taskId, fetchData]);

  const handleChange = e => {
    setFormData({
      ...formData, [e.target.name]: e.target.value
    });
  };

  const handleReset = e => {
    e.preventDefault();
    setFormData({
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      priority: task.priority,
      status: task.status
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const errors = validateManyFields("task", formData);
    setFormErrors(errors.reduce((total, ob) => ({ ...total, [ob.field]: ob.err }), {}));

    if (errors.length > 0) {
      return;
    }

    const config = {
      url: mode === "add" ? "/tasks" : `/tasks/${taskId}`,
      method: mode === "add" ? "post" : "put",
      data: formData,
      headers: { Authorization: authState.token }
    };

    fetchData(config).then(() => {
      navigate("/");
    });
  };

  const fieldError = (field) => (
    <p className={`mt-1 text-pink-600 text-sm ${formErrors[field] ? "block" : "hidden"}`}>
      <i className='mr-2 fa-solid fa-circle-exclamation'></i>
      {formErrors[field]}
    </p>
  );

  return (
    <MainLayout>
      <form className='m-auto my-16 max-w-[1000px] bg-white p-8 border-2 shadow-md rounded-md'>
        {loading ? (
          <Loader />
        ) : (
          <>
            <h2 className='text-center mb-4'>{mode === "add" ? "Add New Task" : "Edit Task"}</h2>
            
            <div className="mb-4">
              <label htmlFor="title">Title</label>
              <Input
                type="text"
                name="title"
                id="title"
                value={formData.title}
                placeholder="Task title"
                onChange={handleChange}
              />
              {fieldError("title")}
            </div>

            <div className="mb-4">
              <label htmlFor="description">Description</label>
              <Textarea
                name="description"
                id="description"
                value={formData.description}
                placeholder="Write here.."
                onChange={handleChange}
              />
              {fieldError("description")}
            </div>

            <div className="mb-4">
              <label htmlFor="dueDate">Due Date</label>
              <Input
                type="date"
                name="dueDate"
                id="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
              />
              {fieldError("dueDate")}
            </div>

            <div className="mb-4">
              <label htmlFor="priority">Priority</label>
              <Select
                name="priority"
                id="priority"
                value={formData.priority}
                onChange={handleChange}
                className="border rounded p-2 w-full"
              >
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
              </Select>
              {fieldError("priority")}
            </div>

            <div className="mb-4">
              <label htmlFor="status">Status</label>
              <Select
                name="status"
                id="status"
                value={formData.status}
                onChange={handleChange}
                className="border rounded p-2 w-full"
              >
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="In Progress">In Progress</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
              </Select>
              {fieldError("status")}
            </div>

            <button
              className='bg-primary text-white px-4 py-2 font-medium hover:bg-primary-dark'
              onClick={handleSubmit}
            >
              {mode === "add" ? "Add Task" : "Update Task"}
            </button>
            <button
              className='ml-4 bg-red-500 text-white px-4 py-2 font-medium'
              onClick={() => navigate("/")}
            >
              Cancel
            </button>
            {mode === "update" && (
              <button
                className='ml-4 bg-blue-500 text-white px-4 py-2 font-medium hover:bg-blue-600'
                onClick={handleReset}
              >
                Reset
              </button>
            )}
          </>
        )}
      </form>
    </MainLayout>
  );
};

export default Task;
