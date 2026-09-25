import Header from "../components/Header";
import StatCard from "../components/StatCard";
import {
  products,
  recentCases,
  monthlyStockData,
} from "../data/mockData";

function Dashboard() {
  const lowStock = products.filter(
    (product) =>
      product.stock <= product.minimumStock &&
      product.stock > 0
  );

  const outOfStock = products.filter(
    (product) => product.stock === 0
  );

  return (
    <>
      <Header
        title="Dashboard"
        subtitle="Here's what's happening with your inventory today."
      />

      <div className="page-content">
        <div className="stats-grid">
          <StatCard
            title="Total Products"
            value="248"
            subtitle="+12 this month"
            icon="▤"
            type="blue"
          />

          <StatCard
            title="Low Stock"
            value={lowStock.length + 10}
            subtitle="Requires attention"
            icon="!"
            type="orange"
          />

          <StatCard
            title="Out of Stock"
            value={outOfStock.length + 2}
            subtitle="Needs replenishment"
            icon="×"
            type="red"
          />

          <StatCard
            title="Stock Value"
            value="₹4.82L"
            subtitle="+8.4% this month"
            icon="₹"
            type="green"
          />
        </div>

        <div className="dashboard-grid">
          <div className="content-card chart-card">
            <div className="card-header">
              <div>
                <h3>Stock Overview</h3>
                <p>Inventory movement over the last 6 months</p>
              </div>

              <select>
                <option>Last 6 months</option>
                <option>Last 12 months</option>
              </select>
            </div>

            <div className="bar-chart">
              {monthlyStockData.map((item) => (
                <div className="bar-column" key={item.month}>
                  <div
                    className="bar"
                    style={{
                      height: `${item.value / 2}px`,
                    }}
                  />

                  <span>{item.month}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="content-card">
            <div className="card-header">
              <div>
                <h3>Low Stock Alert</h3>
                <p>Products that need attention</p>
              </div>

              <span className="alert-count">
                {lowStock.length}
              </span>
            </div>

            <div className="alert-list">
              {lowStock.slice(0, 4).map((product) => (
                <div
                  className="alert-item"
                  key={product.id}
                >
                  <div className="product-mini-icon">
                    {product.name.charAt(0)}
                  </div>

                  <div className="alert-product">
                    <strong>{product.name}</strong>
                    <span>
                      Only {product.stock} units left
                    </span>
                  </div>

                  <span className="warning-dot">!</span>
                </div>
              ))}

              {outOfStock.map((product) => (
                <div
                  className="alert-item"
                  key={product.id}
                >
                  <div className="product-mini-icon">
                    {product.name.charAt(0)}
                  </div>

                  <div className="alert-product">
                    <strong>{product.name}</strong>
                    <span>Out of stock</span>
                  </div>

                  <span className="danger-dot">×</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="content-card">
          <div className="card-header">
            <div>
              <h3>Recent Stock Movements</h3>
              <p>Latest inventory activity</p>
            </div>

            <button className="text-button">
              View all →
            </button>
          </div>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Reference</th>
                  <th>Product</th>
                  <th>Type</th>
                  <th>Quantity</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {recentCases.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <strong>{item.id}</strong>
                    </td>

                    <td>{item.product}</td>

                    <td>
                      <span
                        className={`badge ${
                          item.type === "Purchase"
                            ? "badge-green"
                            : "badge-blue"
                        }`}
                      >
                        {item.type}
                      </span>
                    </td>

                    <td>
                      {item.type === "Purchase"
                        ? "+"
                        : "-"}
                      {item.quantity}
                    </td>

                    <td>
                      <span className="status-success">
                        ● {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="ai-preview">
          <div className="ai-icon">✦</div>

          <div>
            <span>AI INVENTORY INSIGHT</span>
            <h3>
              3 products may need replenishment soon.
            </h3>

            <p>
              Based on current stock levels and recent
              movement patterns, consider reviewing your
              reorder quantities.
            </p>
          </div>

          <button className="secondary-button">
            View Insights →
          </button>
        </div>
      </div>
    </>
  );
}

export default Dashboard;