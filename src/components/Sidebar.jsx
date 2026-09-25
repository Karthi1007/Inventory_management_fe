import { NavLink } from "react-router-dom";

function Sidebar() {
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
    {
      label: "Stock Management",
      path: "/stock",
      icon: "↕",
    },
    {
      label: "Analytics & AI",
      path: "/analytics",
      icon: "◒",
    },
  ];

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-logo">IA</div>

        <div>
          <h2>InventoryAI</h2>
          <span>Smart Inventory</span>
        </div>
      </div>

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

      <div className="sidebar-bottom">
        <NavLink to="/settings" className="nav-item">
          <span className="nav-icon">⚙</span>
          <span>Settings</span>
        </NavLink>

        <div className="sidebar-user">
          <div className="avatar">K</div>

          <div>
            <strong>Karthi</strong>
            <span>Administrator</span>
          </div>

          <span className="user-more">•••</span>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;