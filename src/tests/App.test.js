import { render, screen } from '@testing-library/react';
import React from 'react';

import App from '../App';

// Mock child components
jest.mock('../components/layout/Header', () => () => <div data-testid="header">Header Component</div>);
jest.mock('../pages/Todo', () => () => <div data-testid="todo">Todo Component</div>);

describe('App Component', () => {
  test('renders Header and Todo components', () => {
    // Render the App component
    render(<App />);

    // Assert that the Header component is rendered
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByText('Header Component')).toBeInTheDocument();

    // Assert that the Todo component is rendered
    expect(screen.getByTestId('todo')).toBeInTheDocument();
    expect(screen.getByText('Todo Component')).toBeInTheDocument();
  });
});
