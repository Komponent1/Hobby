import React from 'react';
import { SimpleButton } from '../components';
import { render, fireEvent } from '@testing-library/react';

describe('SimpleButton TEST', () => {
  test('working TEST', () => {
    const click = jest.fn();

    const { getByText } = render(
      <SimpleButton
        label={'TEST BUTTON'}
        onClick={click}
      />
    )

    const button = getByText('TEST BUTTON');
    expect(button).toBeInTheDocument();
    fireEvent.click(button)

    expect(click).toBeCalledTimes(1);
  });

  test('design source TEST', () => {
    const click = jest.fn();

    const { getByText } = render(
      <SimpleButton
        label={'TEST BUTTON'}
        onClick={click}
        sx={{
          fontSize: '50px'
        }}
      />
    )

    const button = getByText('TEST BUTTON');
    const style = window.getComputedStyle(button);
    expect(style.getPropertyValue('font-size')).toBe('50px');
  })
});
