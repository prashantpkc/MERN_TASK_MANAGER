import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../redux/actions/authActions";
import { clearNotifications , addNotification} from '../redux/actions/notificationActions';
import { Notifications } from "@mui/icons-material";
import {
  IconButton,
  Badge,
  Popover,
  MenuList,
  MenuItem,
  ListItemText,
} from "@mui/material";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

const Navbar = () => {
  const authState = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();

  const notifications = useSelector((state) => state.notificationsReducer.notifications);
  const [anchorEl, setAnchorEl] = useState(null); // For handling notification dropdown visibility
  const [readNotifications, setReadNotifications] = useState(new Set()); // Track read notifications

  // Fetch new notifications from socket and update state
  useEffect(() => {
    socket.on('connect', () => console.log('Connected to socket'));
    socket.on('disconnect', () => console.log('Disconnected from socket'));

    socket.on('newTaskNotification', (notification) => {
      if (!readNotifications.has(notification.id)) {
        dispatch(addNotification(notification));
      }
    });

    return () => {
      socket.off('newTaskNotification');
    };
  }, [dispatch, readNotifications]);

  // Logout handler
  const handleLogoutClick = () => {
    dispatch(logout());
  };

  // Notification button click handler (opens the popover)
  const handleNotificationClick = (event) => {
    setAnchorEl(event.currentTarget); // Set the anchor element for the popover
  };

  // Close the popover
  const handleClose = () => {
    setAnchorEl(null); // Close the notification list
  };

  // Mark notifications as read and clear all from Redux store
  const markAsRead = (id) => {
    setReadNotifications(prev => new Set(prev).add(id)); // Add to read notifications
    dispatch(clearNotifications()); // Clear all notifications from Redux store
    handleClose();
  };

  // Filter notifications to only show unread ones in the popover
  const unreadNotifications = notifications.filter(notification => !readNotifications.has(notification.id));

  return (
    <header className="flex justify-between sticky top-0 h-[11vh] bg-gradient-to-r from-[#1A1A2E] to-[#16213E] shadow-sm items-center px-4 md:px-6 z-10">
      <h2 className="cursor-pointer uppercase font-medium text-white text-2xl md:text-lg">
        <Link to="/">Task Manager</Link>
      </h2>

      <div className="flex items-center space-x-4">
        <ul className="flex gap-4 uppercase font-medium">
          {authState.isLoggedIn ? (
            <>
              <li className="bg-[#9333EA] text-white hover:bg-[#7E3AEF] font-medium rounded-md">
                <Link to="/tasks/add" className="w-full h-full px-4 py-2 flex items-center">
                  <i className="fa-solid fa-plus mr-2"></i> Add Task
                </Link>
              </li>

              {/* Notifications Icon with Badge */}
              <IconButton sx={{ color: "white" }} onClick={handleNotificationClick}>
                <Badge badgeContent={unreadNotifications.length} color="error">
                  <Notifications fontSize="large" />
                </Badge>
              </IconButton>

              {/* Notifications Popover */}
              <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
              >
                <MenuList>
                  {unreadNotifications.length > 0 ? (
                    unreadNotifications.map((notification) => (
                      <MenuItem key={notification.id} onClick={() => markAsRead(notification.id)}>
                        <ListItemText
                          primary={notification.message}
                          secondary={new Date(notification.timestamp).toLocaleString()}
                        />
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem>
                      <ListItemText primary="No new notifications" />
                    </MenuItem>
                  )}
                </MenuList>
              </Popover>

              <li
                className="py-2 px-3 cursor-pointer hover:bg-pink-200 transition rounded-sm text-pink-500 mr-3 flex items-center"
                onClick={handleLogoutClick}
              >
                <i className="fa-solid fa-sign-out-alt mr-2"></i> Logout
              </li>
            </>
          ) : (
            <li className="py-2 px-3 cursor-pointer text-pink-500 hover:bg-pink-200 transition rounded-sm flex items-center text-2xl md:text-lg">
              <Link to="/login">
                <i className="fa-solid fa-sign-in-alt mr-2"></i> Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Navbar;