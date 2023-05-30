import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../Components/Loading";
import EmployeeTable from "../Components/EmployeeTable";
import Missing from "./Missing";

const fetchEmployees = async (
  sortBy,
  sortOrder,
  positionFilter,
  levelFilter,
  search
) => {
  try {
    let url = "/api/employees/";

    const params = new URLSearchParams();

    if (sortBy && sortOrder) {
      params.append("sortBy", sortBy);
      params.append("sortOrder", sortOrder);
    }

    if (positionFilter) {
      params.append("positionFilter", positionFilter);
    }

    if (levelFilter) {
      params.append("levelFilter", levelFilter);
    }

    if (search) {
      params.append("search", search);
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
  const [employees, setEmployees] = useState([]);
  const [positionFilter, setPositionFilter] = useState("");
  const [levelFilter, setLevelFilter] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const { search } = useParams();
  const [present, setPresent] = useState([]);
  const [missingEmployees, setMissingEmployees] = useState([]);

  const fetchData = async () => {
    try {
      const data = await fetchEmployees(
        sortBy,
        sortOrder,
        positionFilter,
        levelFilter,
        search
      );
      setEmployees(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching employees:", error);
    }
  };

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

    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [sortBy, sortOrder, positionFilter, levelFilter, search]);

  const handleSort = (field) => {
    let newSortOrder = sortOrder === "asc" ? "desc" : "asc";

    setSortBy(field);
    setSortOrder(newSortOrder);
  };

  const handleTogglePresent = async (employeeId) => {
    if (present.includes(employeeId)) {
      setPresent((prevPresent) =>
        prevPresent.filter((id) => id !== employeeId)
      );
    } else {
      setPresent((prevPresent) => [...prevPresent, employeeId]);
    }

    try {
      const data = await fetchEmployees(
        sortBy,
        sortOrder,
        positionFilter,
        levelFilter,
        search
      );
      setEmployees(data);

      const updatedMissingEmployees = data.filter(
        (employee) => !present.includes(employee._id)
      );
      setMissingEmployees(updatedMissingEmployees);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const toggleSortOrder = () => {
    let newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);
    setSortBy("name");
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
        <EmployeeTable
          employees={employees}
          onDelete={handleDelete}
          onTogglePresent={handleTogglePresent}
          toggleSortOrder={toggleSortOrder}
        />
        <Missing missingEmployees={missingEmployees} />
      </div>
    </div>
  );
};

export default EmployeeList;
