import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import LoginForm from '../LoginForm'; 
import * as validations from '../../validations/index';

jest.mock('../../validations/index', () => ({
  validateManyFields: jest.fn(),
}));

describe('LoginForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders LoginForm and handles form submission', async () => {
    // Arrange
    validations.validateManyFields.mockReturnValue([]); // Mock successful validation

    render(
      <Router>
        <LoginForm />
      </Router>
    );

    // Act
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

  });

  test('displays error messages for invalid input', async () => {
    validations.validateManyFields.mockReturnValue([
      { field: 'email', err: 'Invalid email' },
      { field: 'password', err: 'Password required' }
    ]);

    render(
      <Router>
        <LoginForm />
      </Router>
    );

    // Act
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: '' } });
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    // Assert
    expect(screen.getByText('Invalid email')).toBeInTheDocument();
    expect(screen.getByText('Password required')).toBeInTheDocument();
  });

  test('toggles password visibility', () => {
    // Arrange
    render(
      <Router>
        <LoginForm />
      </Router>
    );

    // Act
    const passwordField = screen.getByLabelText(/password/i);
    const toggleButton = screen.getByRole('button', { name: /toggle visibility/i });
    
    fireEvent.click(toggleButton);

    // Assert
    expect(passwordField.type).toBe('text'); // Check if password is visible
    fireEvent.click(toggleButton);
    expect(passwordField.type).toBe('password'); // Check if password is hidden again
  });
});
