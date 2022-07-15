import React from 'react';
import { useGetUsersDataQuery } from '../../redux/usersDataApi';
import './DataField.css';

const DataField = () => {
  const { data } = useGetUsersDataQuery();

  return (
    <div className="data-field">
      {data &&
        data.length !== 0 &&
        data.map((item) => {
          return (
            <p key={item.id}>
              {item.firstName} {item.secondName} - {item.age} years old
            </p>
          );
        })}
    </div>
  );
};

export default DataField;
