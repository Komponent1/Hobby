import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react'
import { Input } from '../components';

describe('Input TEST', () => {
  test('present & change event', () => {
    const value = '';
    const onChange = jest.fn();
    const label = 'label'
    
    render(<Input value={value} onChange={onChange} label={label}/>);

    const input = screen.getByLabelText(label);
    fireEvent.change(input, {target: {value: '23'}});
    expect(onChange).toBeCalledTimes(1);
  });
});
