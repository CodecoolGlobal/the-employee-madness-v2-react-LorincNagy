import React, { useEffect, useState } from "react";

const EmployeeForm = ({ onSave, disabled, employee, onCancel }) => {
  const [name, setName] = useState(employee?.name ?? "");
  const [level, setLevel] = useState(employee?.level ?? "");
  const [position, setPosition] = useState(employee?.position ?? "");
  const [equipments, setEquipments] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedEquipment, setSelectedEquipment] = useState("");
  const [selectedBrands, setSelectedBrands] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    if (employee) {
      return onSave({
        ...employee,
        name,
        level,
        position,
        equipment: selectedEquipment,
        favoriteBrand: selectedBrands,
      });
    }

    return onSave({
      name,
      level,
      position,
      equipment: selectedEquipment,
      favoriteBrand: selectedBrands,
    });
  };

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

  const fetchData = async () => {
    try {
      const data = await fetchEquipments();
      const data2 = await fetchBrands();
      setEquipments(data);
      setBrands(data2);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchBrands = async () => {
    try {
      const response = await fetch("/api/brands");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching brands:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <form className="EmployeeForm" onSubmit={onSubmit}>
      <div className="control">
        <label htmlFor="name">Name:</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          name="name"
          id="name"
        />
      </div>

      <div className="control">
        <label htmlFor="level">Level:</label>
        <input
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          name="level"
          id="level"
        />
      </div>

      <div className="control">
        <label htmlFor="position">Position:</label>
        <input
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          name="position"
          id="position"
        />
      </div>

      <div className="control">
        <label htmlFor="equipment">Equipment:</label>
        <select
          id="equipment"
          name="equipment"
          value={selectedEquipment}
          onChange={(e) => setSelectedEquipment(e.target.value)}
        >
          <option value="">Select equipment</option>
          {equipments.map((equipment) => (
            <option key={equipment._id} value={equipment.name}>
              {equipment.name}
            </option>
          ))}
        </select>
      </div>

      <div className="control">
        <label htmlFor="brands">Brands</label>
        <select
          id="brands"
          name="brands"
          value={selectedBrands}
          onChange={(e) => setSelectedBrands(e.target.value)}
        >
          <option value="">Select brands</option>
          {brands.map((brand) => (
            <option key={brand._id} value={brand._id}>
              {brand.name}
            </option>
          ))}
        </select>
      </div>

      <div className="buttons">
        <button type="submit" disabled={disabled}>
          {employee ? "Update Employee" : "Create Employee"}
        </button>

        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
