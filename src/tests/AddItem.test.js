import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import AddItem from '../components/todo/AddItem';

describe('AddItem Component', () => {
  let mockOnAdd;

  beforeEach(() => {
    mockOnAdd = jest.fn(); // Mock the onAdd function
  });

  test('renders input field and button', () => {
    render(<AddItem onAdd={mockOnAdd} />);

    // Check if TextField is rendered
    const inputField = screen.getByLabelText('Todo Text');
    expect(inputField).toBeInTheDocument();

    // Check if Button is rendered
    const addButton = screen.getByRole('button', { name: 'Add' });
    expect(addButton).toBeInTheDocument();
  });

  test('allows user to type in the input field', () => {
    render(<AddItem onAdd={mockOnAdd} />);

    const inputField = screen.getByLabelText('Todo Text');

    // Simulate typing into the input field
    fireEvent.change(inputField, { target: { value: 'Learn React' } });
    expect(inputField.value).toBe('Learn React');
  });

  test('calls onAdd with input value when Add button is clicked', () => {
    render(<AddItem onAdd={mockOnAdd} />);

    const inputField = screen.getByLabelText('Todo Text');
    const addButton = screen.getByRole('button', { name: 'Add' });

    // Simulate typing into the input field
    fireEvent.change(inputField, { target: { value: 'Write tests' } });

    // Click the Add button
    fireEvent.click(addButton);

    // Assert that onAdd was called with the correct argument
    expect(mockOnAdd).toHaveBeenCalledWith({ title: 'Write tests' });

    // Assert that the input field is cleared after adding
    expect(inputField.value).toBe('');
  });

  test('does not call onAdd when input field is empty', () => {
    render(<AddItem onAdd={mockOnAdd} />);

    const addButton = screen.getByRole('button', { name: 'Add' });

    // Click the Add button with an empty input
    fireEvent.click(addButton);

    // Assert that onAdd was not called
    expect(mockOnAdd).not.toHaveBeenCalled();
  });
});
