// import React, { useState, useEffect } from "react";
import EmployeeTable from "../Components/EmployeeTable";

const Missing = () => {
//   const [employees, setEmployees] = useState([]);
//   const [presentEmployees, setPresentEmployees] = useState([]);

//   // Betöltjük az alkalmazottakat az adatforrásból
//   useEffect(() => {
//     fetchEmployees();
//   }, []);

//   // Alkalmazottak betöltése az adatforrásból
//   const fetchEmployees = async () => {
//     try {
//       const response = await fetch("/api/employees");
//       const data = await response.json();
//       setEmployees(data);
//     } catch (error) {
//       console.error("Error fetching employees:", error);
//     }
//   };

  // Megjelölt alkalmazottak frissítése
  const handleTogglePresent = (employeeId) => {
    // if (presentEmployees.includes(employeeId)) {
    //   // Ha már benne van a presentEmployees tömbben, akkor eltávolítjuk
    //   setPresentEmployees(presentEmployees.filter((id) => id !== employeeId));
    // } else {
    //   // Ha nincs benne, hozzáadjuk
    //   setPresentEmployees([...presentEmployees, employeeId]);
    // }
    console.log(employeeId);
  };

  // Szűrjük az alkalmazottakat, hogy csak a hiányzó alkalmazottakat jelenítsük meg
  //   const missingEmployees = employees.filter(
  //     (employee) => !presentEmployees.includes(employee._id)
  //   );

  return (
    <div>
      <h1>Missing Employees</h1>
      <EmployeeTable
        // employees={missingEmployees}
        onTogglePresent={handleTogglePresent}
      />
    </div>
  );
};

export default Missing;
