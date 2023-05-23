import { Outlet, Link, useNavigate } from "react-router-dom";
import "./Layout.css";

const Layout = () => {
  const navigate = useNavigate();

  return (
    <div className="Layout">
      <nav>
        <ul>
          <li className="grow">
            <Link to="/">Employees</Link>
          </li>
          <li>
            <Link to="/create">
              <button type="button">Create Employee</button>
            </Link>
          </li>
          <button onClick={() => navigate("/equipments")}>Equipments</button>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
};

export default Layout;
