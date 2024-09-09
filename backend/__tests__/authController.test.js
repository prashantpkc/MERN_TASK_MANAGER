const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const { signup, login } = require('../controllers/authControllers');
const User = require('../models/User');
const app = express();
app.use(express.json());
app.post('/api/auth/signup', signup);
app.post('/api/auth/login', login);

const MONGODB_URL = 'mongodb://localhost:27017/test_db';

beforeAll(async () => {
  await mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.disconnect();
}, 10000); // Increased timeout

describe('Auth Controller', () => {
  describe('Signup', () => {
    it('should sign up a user with valid data', async () => {
      const reqBody = {
        name: 'Test User',
        email: 'testuser@example.com',
        password: 'testpassword@123',
      };

      const response = await request(app).post('/api/auth/signup').send(reqBody);

      expect(response.status).toBe(201);
      expect(response.body).toMatchObject({
        status: true,
        msg: "Congratulations!! Account has been created for you..",
      });
    });

    it('should return an error if email is already registered', async () => {
      const reqBody = {
        name: 'Test User',
        email: 'testuser@example.com',
        password: 'testpassword@123',
      };

      await request(app).post('/api/auth/signup').send(reqBody); // Create user first

      const response = await request(app).post('/api/auth/signup').send(reqBody);

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ msg: "This email is already registered" });
    });
  });

  describe('Login', () => {
    it('should login a user with valid credentials', async () => {
      const reqBody = {
        email: 'testuser@example.com',
        password: 'testpassword@123',
      };

      const response = await request(app).post('/api/auth/login').send(reqBody);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
      expect(response.body.user).toHaveProperty('_id');
    });

    it('should return an error for invalid credentials', async () => {
      const reqBody = {
        email: 'testuser@example.com',
        password: 'wrongpassword',
      };

      const response = await request(app).post('/api/auth/login').send(reqBody);

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ status: false, msg: "Password incorrect!!" });
    });
  });
});
