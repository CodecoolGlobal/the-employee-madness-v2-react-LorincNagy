import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./EmployeeTable.css";

const EmployeeTable = ({ employees, onDelete, onTogglePresent }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage = 10;
  const [brands, setBrands] = useState([]);

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = employees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    fetchBrands(); // Márkák lekérdezése az alkalmazottakhoz
  }, []);

  const fetchBrands = async () => {
    try {
      const response = await fetch("/api/brands");
      const data = await response.json();
      console.log(data);
      setBrands(data);
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  };

  const getBrandName = (brandId) => {
    const brand = brands.find(
      (brand) => brand._id.toString() === brandId.toString()
    );
    console.log(brand);
    return brand && brand.name ? brand.name : "";
  };

  return (
    <div className="EmployeeTable">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Level</th>
            <th>Position</th>
            <th>Favorite Brand</th>
            <th>Present</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentEmployees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.name}</td>
              <td>{employee.level}</td>
              <td>{employee.position}</td>
              <td>
                {getBrandName(employee.favoriteBrand)}
                {console.log(employee.favoriteBrand)}
              </td>
              <td>
                <input
                  type="checkbox"
                  onChange={() => onTogglePresent(employee._id)}
                />
              </td>
              <td>
                <Link to={`/update/${employee._id}`}>
                  <button type="button">Update</button>
                </Link>
                <button type="button" onClick={() => onDelete(employee._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentEmployees.length < employeesPerPage}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default EmployeeTable;
