import React from "react";

const Missing = ({ missingEmployees }) => {
  if (!missingEmployees || missingEmployees.length === 0) {
    return <div>No missing employees</div>;
  }

  return (
    <div>
      <h2>Missing Employees</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Level</th>
            <th>Position</th>
          </tr>
        </thead>
        <tbody>
          {missingEmployees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.name}</td>
              <td>{employee.level}</td>
              <td>{employee.position}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Missing;
