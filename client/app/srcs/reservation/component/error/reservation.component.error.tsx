/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { ErrorType, useErrorStore } from '../../store/reservation.store.error';

const ErrorModal: React.FC<{ message: string }> = ({ message }) => {
  const setErrorType = useErrorStore((state) => state.setErrorType);

  return (
    <button
      type="button"
      className="absolute top-0 left-0 w-screen h-screen z-50"
      onClick={() => setErrorType(ErrorType.None)}
    >
      <div onClick={(e) => e.stopPropagation()}>
        <h2>Error</h2>
        <p>{message}</p>
        <button type="button" onClick={() => setErrorType(ErrorType.None)}>
          Reload Page
        </button>
      </div>
    </button>
  );
};

export default ErrorModal;
