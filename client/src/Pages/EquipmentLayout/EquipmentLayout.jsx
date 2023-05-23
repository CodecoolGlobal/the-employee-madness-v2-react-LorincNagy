import { Outlet, Link, useNavigate } from "react-router-dom";
import "./EquipmentLayout.css";

const EquipmentLayout = () => {
  const navigate = useNavigate();

  return (
    <div className="Layout">
      <nav>
        <ul>
          <li className="grow">
            <Link to="/equipments">Equipments</Link>
          </li>
          <li>
            <Link to="/equipments/create">
              <button type="button">Create Equipment</button>
            </Link>
          </li>
          <button onClick={() => navigate("/")}>Employees</button>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
};

export default EquipmentLayout;
