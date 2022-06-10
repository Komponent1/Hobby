import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { FormBox } from '../components';

describe('FormBox TEST', () => {
  test('Presenter & work TEST', () => {
    const label = 'FORM BOX';
    const submit = jest.fn();
    const width = 1, height = 1;

    render(
      <FormBox
        width={width} height={height}
        label={label} submit={submit}>
        <h1>TEST</h1>
      </FormBox>
    );

    expect(screen.getByText('TEST')).toBeInTheDocument();
    const [ title, button ] = screen.getAllByText(label);
    expect(title).toBeInTheDocument();
    fireEvent.click(button);
    expect(submit).toBeCalledTimes(1);

    const style = window.getComputedStyle(title.parentNode);
    expect(style.getPropertyValue('width')).toBe('1rem');
    expect(style.getPropertyValue('height')).toBe('1rem');
  });
});
