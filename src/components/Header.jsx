function Header({ title, subtitle }) {
  return (
    <header className="top-header">
      <div>
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>

      <div className="header-actions">
        <button className="icon-button">⌕</button>

        <button className="notification-button">
          ♢
          <span />
        </button>

        <div className="header-avatar">K</div>
      </div>
    </header>
  );
}

export default Header;