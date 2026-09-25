import Header from "../components/Header";
import { stockMovements } from "../data/mockData";

function StockManagement() {
  return (
    <>
      <Header
        title="Stock Management"
        subtitle="Track every inventory movement."
      />

      <div className="page-content">
        <div className="page-toolbar">
          <div className="search-box">
            <span>⌕</span>
            <input placeholder="Search product..." />
          </div>

          <div className="toolbar-actions">
            <select className="filter-select">
              <option>All Movement Types</option>
              <option>Purchase</option>
              <option>Sale</option>
              <option>Return</option>
              <option>Damaged</option>
              <option>Adjustment</option>
            </select>

            <input
              type="date"
              className="date-input"
            />

            <button className="primary-button">
              + New Movement
            </button>
          </div>
        </div>

        <div className="content-card">
          <div className="stock-summary-row">
            <div>
              <span>Total Movements</span>
              <strong>1,284</strong>
            </div>

            <div>
              <span>Stock In</span>
              <strong className="text-green">
                +8,420
              </strong>
            </div>

            <div>
              <span>Stock Out</span>
              <strong className="text-red">
                -6,210
              </strong>
            </div>

            <div>
              <span>Net Movement</span>
              <strong>+2,210</strong>
            </div>
          </div>
        </div>

        <div className="content-card">
          <div className="card-header">
            <div>
              <h3>Movement History</h3>
              <p>All recent stock transactions</p>
            </div>
          </div>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Product</th>
                  <th>Type</th>
                  <th>Quantity</th>
                  <th>Previous Stock</th>
                  <th>New Stock</th>
                  <th>Reason</th>
                </tr>
              </thead>

              <tbody>
                {stockMovements.map((movement) => (
                  <tr key={movement.id}>
                    <td>{movement.date}</td>

                    <td>
                      <strong>
                        {movement.product}
                      </strong>
                      <span className="table-secondary">
                        {movement.sku}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`badge ${
                          movement.quantity > 0
                            ? "badge-green"
                            : "badge-red"
                        }`}
                      >
                        {movement.type}
                      </span>
                    </td>

                    <td>
                      <strong
                        className={
                          movement.quantity > 0
                            ? "text-green"
                            : "text-red"
                        }
                      >
                        {movement.quantity > 0
                          ? "+"
                          : ""}
                        {movement.quantity}
                      </strong>
                    </td>

                    <td>
                      {movement.previousStock}
                    </td>

                    <td>
                      <strong>
                        {movement.newStock}
                      </strong>
                    </td>

                    <td>{movement.reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pagination">
            <span>
              Showing 1–5 of 1,284 movements
            </span>

            <div>
              <button>←</button>
              <button className="current-page">
                1
              </button>
              <button>2</button>
              <button>3</button>
              <button>→</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default StockManagement;