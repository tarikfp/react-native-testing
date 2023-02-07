import {fireEvent, render, screen} from '@testing-library/react-native';
import React from 'react';
import ErrorScreen from '../error';

const resetErrorMock = jest.fn();
const component = <ErrorScreen resetError={resetErrorMock} />;

describe('Product list screen', () => {
  it('should display loading indicator on mount', async () => {
    render(component);

    expect(screen.getByText(`An error occurred...`)).toBeTruthy();
  });

  it('should display Go home button', async () => {
    render(component);

    expect(screen.getByText(`Go home`)).toBeTruthy();
  });

  it('go home button should be pressable ', async () => {
    render(component);

    fireEvent.press(screen.getByText(`Go home`));

    expect(resetErrorMock).toHaveBeenCalled();
  });
});
