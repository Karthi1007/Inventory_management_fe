import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IoMdLogOut } from "react-icons/io";

import actions from "../redux/auth/Actions";

function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.authReducer);

  const menuItems = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: "▦",
    },
    {
      label: "Products",
      path: "/products",
      icon: "▤",
    },
    // {
    //   label: "Stock Management",
    //   path: "/stock",
    //   icon: "↕",
    // },
    // {
    //   label: "Analytics & AI",
    //   path: "/analytics",
    //   icon: "◒",
    // },
  ];

  const handleLogout = () => {
    dispatch({
      type: actions.USER_LOGOUT,
    });

    navigate("/login");
  };

  return (
    <aside className="sidebar">
      {/* BRAND */}
      <div className="brand">
        <div className="brand-logo">IA</div>

        <div>
          <h2>InventoryAI</h2>
          <span>Smart Inventory</span>
        </div>
      </div>

      {/* MENU */}
      <nav className="sidebar-nav">
        <p className="nav-section-title">MAIN MENU</p>

        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `nav-item ${isActive ? "active" : ""}`
            }
          >
            <span className="nav-icon">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* USER */}
      <div className="sidebar-bottom">
        <div className="sidebar-user">
          <div className="avatar">
            {user?.name?.charAt(0)?.toUpperCase() || "K"}
          </div>

          <div>
            <strong>{user?.name || "Karthi"}</strong>
            <span>
              {user?.role
                ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
                : "Administrator"}
            </span>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="user-more"
            title="Logout"
          >
            <IoMdLogOut size={24} />
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;