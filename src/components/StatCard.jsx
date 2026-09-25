function StatCard({
  title,
  value,
  subtitle,
  icon,
  type = "blue",
}) {
  return (
    <div className="stat-card">
      <div className={`stat-icon ${type}`}>
        {icon}
      </div>

      <div className="stat-content">
        <p>{title}</p>
        <h3>{value}</h3>

        {subtitle && (
          <span className="stat-subtitle">
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );
}

export default StatCard;