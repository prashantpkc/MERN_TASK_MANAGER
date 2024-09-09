
// actions.js
import { ADD_NOTIFICATION, REMOVE_NOTIFICATION, CLEAR_NOTIFICATIONS } from './actionTypes';

export const addNotification = (notification) => ({
  type: ADD_NOTIFICATION,
  payload: notification,
});

export const removeNotification = (id) => ({
  type: REMOVE_NOTIFICATION,
  payload: id,
});

export const clearNotifications = () => ({
  type: CLEAR_NOTIFICATIONS,
});