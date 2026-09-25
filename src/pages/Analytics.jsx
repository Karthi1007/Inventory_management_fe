import Header from "../components/Header";
import StatCard from "../components/StatCard";

function Analytics() {
  const categoryData = [
    {
      name: "Electronics",
      percentage: 58,
      value: "₹2.8L",
    },
    {
      name: "Furniture",
      percentage: 25,
      value: "₹1.2L",
    },
    {
      name: "Accessories",
      percentage: 17,
      value: "₹82K",
    },
  ];

  const topProducts = [
    {
      name: "Wireless Mouse",
      sales: 182,
      percentage: 88,
    },
    {
      name: "Mechanical Keyboard",
      sales: 142,
      percentage: 72,
    },
    {
      name: "USB-C Hub",
      sales: 118,
      percentage: 60,
    },
    {
      name: "27-inch Monitor",
      sales: 96,
      percentage: 48,
    },
  ];

  return (
    <>
      <Header
        title="Analytics & AI Insights"
        subtitle="Understand your inventory performance."
      />

      <div className="page-content">
        <div className="stats-grid">
          <StatCard
            title="Inventory Turnover"
            value="4.8x"
            subtitle="+12.4% vs last month"
            icon="↻"
            type="blue"
          />

          <StatCard
            title="Stock Value"
            value="₹4.82L"
            subtitle="+8.4% this month"
            icon="₹"
            type="green"
          />

          <StatCard
            title="Low Stock Rate"
            value="4.8%"
            subtitle="-2.1% improvement"
            icon="!"
            type="orange"
          />

          <StatCard
            title="Dead Stock"
            value="₹24.5K"
            subtitle="12 products"
            icon="×"
            type="red"
          />
        </div>

        <div className="analytics-grid">
          <div className="content-card">
            <div className="card-header">
              <div>
                <h3>Sales Performance</h3>
                <p>Monthly inventory movement</p>
              </div>

              <select>
                <option>Last 6 months</option>
              </select>
            </div>

            <div className="analytics-chart">
              {[55, 72, 60, 82, 68, 92].map(
                (height, index) => (
                  <div
                    className="analytics-bar-wrapper"
                    key={index}
                  >
                    <div
                      className="analytics-bar"
                      style={{ height: `${height}%` }}
                    />

                    <span>
                      {
                        [
                          "Apr",
                          "May",
                          "Jun",
                          "Jul",
                          "Aug",
                          "Sep",
                        ][index]
                      }
                    </span>
                  </div>
                )
              )}
            </div>
          </div>

          <div className="content-card">
            <div className="card-header">
              <div>
                <h3>Inventory by Category</h3>
                <p>Current stock value</p>
              </div>
            </div>

            <div className="category-list">
              {categoryData.map((category) => (
                <div
                  className="category-item"
                  key={category.name}
                >
                  <div className="category-row">
                    <span>{category.name}</span>
                    <strong>{category.value}</strong>
                  </div>

                  <div className="category-progress">
                    <div
                      style={{
                        width: `${category.percentage}%`,
                      }}
                    />
                  </div>

                  <small>
                    {category.percentage}% of total
                  </small>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="content-card">
          <div className="card-header">
            <div>
              <h3>Top Selling Products</h3>
              <p>Products with the highest movement</p>
            </div>
          </div>

          <div className="top-products">
            {topProducts.map((product, index) => (
              <div
                className="top-product"
                key={product.name}
              >
                <div className="rank">
                  0{index + 1}
                </div>

                <div className="top-product-info">
                  <strong>{product.name}</strong>

                  <div className="mini-progress">
                    <div
                      style={{
                        width: `${product.percentage}%`,
                      }}
                    />
                  </div>
                </div>

                <strong>{product.sales} units</strong>
              </div>
            ))}
          </div>
        </div>

        <div className="ai-insights-section">
          <div className="ai-section-header">
            <div className="ai-icon large-ai-icon">
              ✦
            </div>

            <div>
              <span>AI POWERED</span>
              <h2>Inventory Intelligence</h2>

              <p>
                Smart recommendations based on your
                inventory patterns.
              </p>
            </div>

            <button className="primary-button">
              Generate New Insights
            </button>
          </div>

          <div className="ai-insight-grid">
            <div className="ai-insight-card warning">
              <div className="insight-icon">!</div>

              <div>
                <span>REORDER ALERT</span>

                <h3>
                  Wireless Mouse may run out soon
                </h3>

                <p>
                  Current stock is 8 units. Based on
                  recent sales, expected stock-out is
                  within approximately 4 days.
                </p>

                <button className="text-button">
                  View Product →
                </button>
              </div>
            </div>

            <div className="ai-insight-card success">
              <div className="insight-icon">↗</div>

              <div>
                <span>SALES TREND</span>

                <h3>
                  Keyboard sales increased 18%
                </h3>

                <p>
                  Demand has increased consistently
                  over the last three weeks.
                </p>

                <button className="text-button">
                  View Analysis →
                </button>
              </div>
            </div>

            <div className="ai-insight-card blue">
              <div className="insight-icon">✦</div>

              <div>
                <span>OPTIMIZATION</span>

                <h3>Optimize reorder quantities</h3>

                <p>
                  AI identified 6 products where
                  reorder quantities can be optimized.
                </p>

                <button className="text-button">
                  Review Suggestions →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Analytics;