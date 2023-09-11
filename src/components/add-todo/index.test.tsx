import React, { ReactElement } from 'react';
import { render, screen } from '@testing-library/react';

import { AddTodo } from './index';
import userEvent from '@testing-library/user-event';
import { collection, addDoc } from 'firebase/firestore';

const setup = (jsx: ReactElement) => {
  return {
    user: userEvent,
    ...render(jsx),
  };
};

jest.mock('firebase/firestore');

describe('<AddTodo />', () => {
  (addDoc as jest.Mock).mockImplementation(jest.fn());
  it('should render', () => {
    render(<AddTodo />);
    const inputElement = screen.getByLabelText('Criar nova tarefa');
    expect(inputElement).toBeInTheDocument();
  });

  it('should trigger addDoc on enter keypress', async () => {
    const { user } = setup(<AddTodo />);
    const inputElement = screen.getByLabelText('Criar nova tarefa');
    await user.type(inputElement, 'hello{Enter}');
    expect(addDoc).toHaveBeenCalledWith(undefined, {
      title: 'hello',
      isCompleted: false,
      userId: undefined,
      userName: undefined,
    });
  });
});
