import React from 'react';
import { FormErrors } from 'types';
const ErrorsList = ({ errors }: { errors: FormErrors }) => {
  return (
    <ul className="error-messages">
      {Object.keys(errors).map((key) => {
        return (
          <li key={key}>
            {key} {errors[key]}
          </li>
        );
      })}
    </ul>
  );
};

export { ErrorsList };
