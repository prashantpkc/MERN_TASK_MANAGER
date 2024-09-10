import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Loader from "./utils/Loader";
import Tooltip from "./utils/Tooltip";

const Tasks = () => {
  const authState = useSelector((state) => state.authReducer);
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("latest"); // Default sort option
  const [showArchived, setShowArchived] = useState(false);
  const [fetchData, { loading }] = useFetch();

  const fetchTasks = useCallback(() => {
    const queryParams = new URLSearchParams({
      archived: showArchived,
    }).toString();

    const config = {
      url: `/tasks?${queryParams}`,
      method: "get",
      headers: { Authorization: authState.token },
    };

    fetchData(config, { showSuccessToast: false }).then((data) => {
      console.log("Fetched data:", data); // Debug log
      let tasks = data?.tasks ?? []; // Use optional chaining and nullish coalescing

      // Filter tasks based on search term
      tasks = tasks.filter((task) => {
        const searchLower = searchTerm.toLowerCase();
        return (
          task?.title?.toLowerCase().includes(searchLower) ||
          task?.description?.toLowerCase().includes(searchLower) ||
          task?.priority?.toLowerCase().includes(searchLower) ||
          task?.status?.toLowerCase().includes(searchLower)
        );
      });

      console.log("Filtered tasks:", tasks); // Debug log

      // Sorting tasks based on sortOption
      if (sortOption === "latest") {
        tasks.sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));
      } else if (sortOption === "oldest") {
        tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
      }

      console.log("Sorted tasks:", tasks); // Debug log

      setTasks(tasks);
    });
  }, [authState.token, fetchData, searchTerm, sortOption, showArchived]);

  useEffect(() => {
    if (!authState.isLoggedIn) return;
    fetchTasks();
  }, [authState.isLoggedIn, fetchTasks]);

  const handleDelete = (id) => {
    const config = {
      url: `/tasks/${id}`,
      method: "delete",
      headers: { Authorization: authState.token },
    };
    fetchData(config).then(() => fetchTasks());
  };

  const handleArchiveToggle = (id, isArchived) => {
    const config = {
      url: `/tasks/${id}`,
      method: "patch",
      headers: { Authorization: authState.token },
    };

    const archiveData = { archived: !isArchived };
    fetchData(config, { body: JSON.stringify(archiveData) }).then(() =>
      fetchTasks()
    );
  };

  const getPriorityBadge = (priority) => {
    const colors = {
      high: "bg-red-600 text-white",
      medium: "bg-yellow-500 text-gray-800",
      low: "bg-green-600 text-white",
    };
    return (
      <span
        className={`px-3 py-1 rounded-full text-sm font-semibold ${colors[priority] ?? "bg-gray-400 text-white"}`}
      >
        {priority?.charAt(0).toUpperCase() + priority?.slice(1) ?? "Unknown"}
      </span>
    );
  };

  const getStatusBadge = (status) => {
    const colors = {
      completed: "bg-green-600 text-white",
      "in-progress": "bg-yellow-500 text-gray-800",
      pending: "bg-gray-500 text-white",
    };
    return (
      <span
        className={`px-3 py-1 rounded-full text-sm font-semibold ${colors[status] ?? "bg-gray-400 text-white"}`}
      >
        {status?.charAt(0).toUpperCase() + status?.slice(1) ?? "Unknown"}
      </span>
    );
  };

  const getDueDateInfo = (dueDate) => {
    const daysLeft = Math.floor(
      (new Date(dueDate) - new Date()) / (1000 * 60 * 60 * 24)
    );
    return daysLeft >= 0
      ? `${daysLeft} day(s) left`
      : `Overdue by ${Math.abs(daysLeft)} day(s)`;
  };

  const filteredTasks = tasks.filter((task) =>
    showArchived ? task?.archived : !task?.archived
  );

  console.log("Filtered tasks to display:", filteredTasks); // Debug log

  return (
    <div className="my-8 mx-auto max-w-4xl py-6 px-4 md:px-6 bg-gray-50 rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row md:justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search tasks by name, description, priority, or status..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 mb-2 md:mb-0 md:mr-4 w-full md:w-64"
        />
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className=" rounded-md px-4 py-2 mb-2 md:mb-0 w-full md:w-44"
        >
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
        </select>
        <button
          className="bg-blue-600 text-white hover:bg-blue-700 font-semibold rounded-md px-4 py-2 mt-4 md:mt-0"
          onClick={() => setShowArchived((prev) => !prev)}
        >
          {showArchived ? "Show Active Tasks" : "Show Archived Tasks"}
        </button>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div>
          {filteredTasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8">
              <span className="text-gray-500 text-lg font-semibold">
                No {showArchived ? "archived" : "active"} tasks found
              </span>
              {!showArchived && (
                <Link
                  to="/tasks/add"
                  className="bg-green-600 text-white hover:bg-green-700 font-semibold rounded-md mt-4 px-6 py-2 transition-transform transform hover:scale-105"
                >
                  + Add New Task
                </Link>
              )}
            </div>
          ) : (
            filteredTasks.map((task, index) => (
              <div
                key={task._id}
                className="bg-white my-4 p-5 text-gray-700 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xl font-bold text-gray-800">
                    Task #{index + 1}
                  </span>
                  <div className="flex items-center space-x-3">
                    <Tooltip text={"Edit this task"} position={"top"}>
                      <Link
                        to={`/tasks/${task._id}`}
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        <i className="fa-solid fa-pen"></i>
                      </Link>
                    </Tooltip>
                    <Tooltip
                      text={
                        task?.archived
                          ? "Unarchive this task"
                          : "Archive this task"
                      }
                      position={"top"}
                    >
                      <span
                        className={`text-${
                          task?.archived ? "yellow" : "blue"
                        }-600 hover:text-${
                          task?.archived ? "yellow" : "blue"
                        }-800 cursor-pointer transition-colors`}
                        onClick={() =>
                          handleArchiveToggle(task._id, task?.archived)
                        }
                      >
                        <i
                          className={`fa-solid fa-${
                            task?.archived ? "box-open" : "box-archive"
                          }`}
                        ></i>
                      </span>
                    </Tooltip>
                    <Tooltip text={"Delete this task"} position={"top"}>
                      <span
                        className="text-red-600 hover:text-red-800 cursor-pointer transition-colors"
                        onClick={() => handleDelete(task._id)}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </span>
                    </Tooltip>
                  </div>
                </div>
                <div className="mb-3">
                  <p>
                    <span className="mr-2">
                      {getPriorityBadge(task?.priority)}
                    </span>
                    {getStatusBadge(task?.status)}
                  </p>
                </div>
                <p className="text-gray-600 mb-2">{task?.description}</p>
                <p className="text-gray-500">
                  Due Date:{" "}
                  <span className="font-semibold">
                    {getDueDateInfo(task?.dueDate)}
                  </span>
                </p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Tasks;
