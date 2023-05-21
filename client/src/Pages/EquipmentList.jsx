import React, { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import EquipmentTable from "../Components/EquipmentTable/EquipmentTable";

const fetchEquipments = async (sortBy, sortOrder, nameFilter, typeFilter) => {
  try {
    let url = "/api/equipments";

    const params = new URLSearchParams();

    if (sortBy && sortOrder) {
      params.append("sortBy", sortBy);
      params.append("sortOrder", sortOrder);
    }

    if (nameFilter) {
      params.append("nameFilter", nameFilter);
    }

    if (typeFilter) {
      params.append("typeFilter", typeFilter);
    }

    if (params.toString()) {
      url += `?${params.toString()}`;
    }

    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching equipments:", error);
    throw error;
  }
};

const deleteEquipment = async (id) => {
  try {
    const response = await fetch(`/api/equipments/${id}`, { method: "DELETE" });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting equipment:", error);
    throw error;
  }
};

const EquipmentList = () => {
  const [loading, setLoading] = useState(true);
  const [equipments, setEquipments] = useState(null);
  const [nameFilter, setNameFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const fetchData = async () => {
    try {
      const data = await fetchEquipments(
        sortBy,
        sortOrder,
        nameFilter,
        typeFilter
      );
      setEquipments(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching equipments:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteEquipment(id);
      setEquipments((prevEquipments) =>
        prevEquipments.filter((equipment) => equipment._id !== id)
      );
    } catch (error) {
      console.error("Error deleting equipment:", error);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    if (name === "name") {
      setNameFilter(value);
    } else if (name === "type") {
      setTypeFilter(value);
    }

    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [sortBy, sortOrder, nameFilter, typeFilter]);

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
        <label htmlFor="nameFilter">Name:</label>
        <input
          type="text"
          name="name"
          id="nameFilter"
          value={nameFilter}
          onChange={handleFilterChange}
        />
      </div>
      <div>
        <label htmlFor="typeFilter">Type:</label>
        <input
          type="text"
          name="type"
          id="typeFilter"
          value={typeFilter}
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
              <button onClick={() => handleSort("type")}>Type</button>
            </th>
            <th>
              <button onClick={() => handleSort("amount")}>Amount</button>
            </th>
          </tr>
        </thead>
      </table>
      <div>
        <EquipmentTable equipments={equipments} onDelete={handleDelete} />
      </div>
    </div>
  );
};

export default EquipmentList;
