import React, { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import EmployeeTable from "../Components/EmployeeTable";

const fetchEmployees = async (sortBy, sortOrder) => {
  try {
    let url = "/api/employees";

    const params = new URLSearchParams();
    let queryString = "";

    if (sortBy && sortOrder) {
      params.append("sortBy", sortBy);
      queryString += `&sortBy=${sortBy}`;
      params.append("sortOrder", sortOrder);
      queryString += `&sortOrder=${sortOrder}`;
    }
    if (params.toString()) {
      url += `?${params.toString()}`;
    }
    console.log(url);
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching employees:", error);
    throw error;
  }
};

const deleteEmployee = async (id) => {
  try {
    const response = await fetch(`/api/employees/${id}`, { method: "DELETE" });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting employee:", error);
    throw error;
  }
};

const EmployeeList = () => {
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState(null);
  const [positionFilter, setPositionFilter] = useState("");
  const [levelFilter, setLevelFilter] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const handleDelete = async (id) => {
    try {
      await deleteEmployee(id);
      setEmployees((prevEmployees) =>
        prevEmployees.filter((employee) => employee._id !== id)
      );
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    if (name === "position") {
      setPositionFilter(value);
    } else if (name === "level") {
      setLevelFilter(value);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchEmployees(sortBy, sortOrder);
        setEmployees(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching employees:", error);
      }
    };

    fetchData();
  }, [sortBy, sortOrder]); //ha ezek változnak lefut ueeffect hook ami meghivja fetchData ami meghivja fetchemployees-t aminek awaittel megvárja a válaszát ha sikeres beállitja válasznak az új employee listet

  const handleSort = (field) => {
    let newSortOrder = sortOrder === "asc" ? "desc" : "asc";

    setSortBy(field);
    setSortOrder(newSortOrder);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <div>
        <label htmlFor="positionFilter">Position:</label>
        <input
          type="text"
          name="position"
          id="positionFilter"
          value={positionFilter}
          onChange={handleFilterChange}
        />
      </div>
      <div>
        <label htmlFor="levelFilter">Level:</label>
        <input
          type="text"
          name="level"
          id="levelFilter"
          value={levelFilter}
          onChange={handleFilterChange}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>
              <button onClick={() => handleSort("name")}>Name</button>
            </th>
            <th>
              <button onClick={() => handleSort("position")}>Position</button>
            </th>
            <th>
              <button onClick={() => handleSort("level")}>Level</button>
            </th>
          </tr>
        </thead>
      </table>
      <div>
        <EmployeeTable employees={employees} onDelete={handleDelete} />
      </div>
    </div>
  );
};

export default EmployeeList;
