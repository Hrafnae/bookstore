import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

test('Renders App component', () => {
  render(<App />);
  const head = screen.getByText('My Todolist');
  expect(head).toBeInTheDocument();
});

test('Add and clear todo',() => {
  render(<App/>);
  const desc = screen.getByPlaceholderText('Description');
  fireEvent.change(desc, { target: { value: 'Do something' } });
  const date = screen.getByPlaceholderText('Date');
  fireEvent.change(date, { target: { value: '1.1.2023' } });
  const status = screen.getByPlaceholderText('Status');
  fireEvent.change(status, { target: { value: 'Open' } });
  const button = screen.getByText('Add');
  fireEvent.click(button);

  const table = screen.getByRole('table');
  expect(table).toHaveTextContent(/do something/i);

  const clearButton = screen.getByText('Clear');
  fireEvent.click(clearButton);
  expect(table).not.toHaveTextContent(/do something/i);
})