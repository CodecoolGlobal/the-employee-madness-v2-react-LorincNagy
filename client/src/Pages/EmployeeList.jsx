import React, { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import EmployeeTable from "../Components/EmployeeTable";

const fetchEmployees = async (position, level) => {
  try {
    let url = "/api/employees";

    const params = new URLSearchParams();

    if (position) {
      params.append("position", position);
    }

    if (level) {
      params.append("level", level);
    }

    if (params.toString()) {
      url += `?${params.toString()}`;
    }

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
        const data = await fetchEmployees(positionFilter, levelFilter);
        setEmployees(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching employees:", error);
      }
    };

    fetchData();
  }, [positionFilter, levelFilter]);

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
      <EmployeeTable employees={employees} onDelete={handleDelete} />
    </div>
  );
};

export default EmployeeList;
