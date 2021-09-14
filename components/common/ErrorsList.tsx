import React from 'react';
import { Errors } from 'types';
const ErrorsList = ({ errors }: { errors: Errors }) => {
  return (
    <ul className="error-messages">
      {Object?.keys(errors)?.map((key) => {
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
