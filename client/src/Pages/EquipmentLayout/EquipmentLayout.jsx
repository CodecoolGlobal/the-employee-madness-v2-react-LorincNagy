import { Outlet, Link } from "react-router-dom";

import "./EquipmentLayout.css";

const EquipmentLayout = () => (
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
      </ul>
    </nav>
    <Outlet />
  </div>
);

export default EquipmentLayout;
