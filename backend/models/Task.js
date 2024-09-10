const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  description: {
    type: String,
    required: true,
  },
  completedAt: {
    type: Date,
    default: null
  },
  dueDate: {
    type: Date,
    default: null
  },
  priority: {
    type: String, // or Number depending on your preference
    enum: ['low', 'medium', 'high'], // Optional: if you want to restrict the priority values
    default: 'medium'
  },
  status: {
    type: String,
    enum: ['pending', 'In Progress', 'completed'], // Optional: if you want to restrict the status values
    default: 'pending'
  },
  archived: {
    type: Boolean,
    default: false
  }

}, {
  timestamps: true
});

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
