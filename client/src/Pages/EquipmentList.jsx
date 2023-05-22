import React, { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import EquipmentTable from "../Components/EquipmentTable/EquipmentTable";

const fetchEquipments = async () => {
  try {
    const response = await fetch("/api/equipments");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching equipments:", error);
    throw error;
  }
};

const EquipmentList = () => {
  const [loading, setLoading] = useState(true);
  const [equipments, setEquipments] = useState([]);
  const [name, setEquipmentName] = useState("");
  const [type, setEquipmentType] = useState("");

  const fetchData = async () => {
    try {
      const data = await fetchEquipments();
      setEquipments(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching equipments:", error);
      setLoading(false);
    }
  };

  const deleteEquipment = async (id) => {
    try {
      await fetch(`/api/equipments/${id}`, { method: "DELETE" });
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
      setEquipmentName(value);
    } else if (name === "type") {
      setEquipmentType(value);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={handleFilterChange}
        />
      </div>
      <div>
        <label htmlFor="type">Type:</label>
        <input
          type="text"
          name="type"
          id="type"
          value={type}
          onChange={handleFilterChange}
        />
      </div>
      <EquipmentTable equipments={equipments} onDelete={deleteEquipment} />
    </div>
  );
};

export default EquipmentList;
