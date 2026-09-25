import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";
import { products, stockMovements } from "../data/mockData";

function ProductDetails() {
  const { id } = useParams();
  const [showStockModal, setShowStockModal] =
    useState(false);

  const product =
    products.find(
      (item) => item.id === Number(id)
    ) || products[0];

  return (
    <>
      <Header
        title="Product Details"
        subtitle="View and manage product information."
      />

      <div className="page-content">
        <Link to="/products" className="back-link">
          ← Back to Products
        </Link>

        <div className="product-details-grid">
          <div className="content-card product-overview">
            <div className="product-large-icon">
              {product.name.charAt(0)}
            </div>

            <div className="product-detail-heading">
              <div>
                <span
                  className={`stock-status ${
                    product.status === "In Stock"
                      ? "stock-good"
                      : product.status ===
                        "Low Stock"
                      ? "stock-low"
                      : "stock-out"
                  }`}
                >
                  {product.status}
                </span>

                <h2>{product.name}</h2>

                <p>{product.description}</p>
              </div>

              <div className="detail-actions">
                <button className="secondary-button">
                  Edit
                </button>

                <button className="primary-button">
                  Save Changes
                </button>
              </div>
            </div>

            <div className="product-info-grid">
              <div>
                <span>SKU</span>
                <strong>{product.sku}</strong>
              </div>

              <div>
                <span>Category</span>
                <strong>{product.category}</strong>
              </div>

              <div>
                <span>Supplier</span>
                <strong>{product.supplier}</strong>
              </div>

              <div>
                <span>Price</span>
                <strong>
                  ₹{product.price.toLocaleString()}
                </strong>
              </div>
            </div>
          </div>

          <div className="content-card stock-summary-card">
            <div className="card-header">
              <div>
                <h3>Stock Overview</h3>
                <p>Current inventory status</p>
              </div>
            </div>

            <div className="stock-number">
              <span>Current Stock</span>
              <strong>{product.stock}</strong>
              <small>units</small>
            </div>

            <div className="stock-progress">
              <div
                style={{
                  width: `${Math.min(
                    (product.stock /
                      product.minimumStock) *
                      100,
                    100
                  )}%`,
                }}
              />
            </div>

            <div className="stock-meta">
              <span>
                Minimum:{" "}
                <strong>
                  {product.minimumStock}
                </strong>
              </span>

              <span>
                Reorder:{" "}
                <strong>
                  {product.reorderQuantity}
                </strong>
              </span>
            </div>

            <button
              className="primary-button full-width"
              onClick={() =>
                setShowStockModal(true)
              }
            >
              + Manage Stock
            </button>
          </div>
        </div>

        <div className="details-bottom-grid">
          <div className="content-card">
            <div className="card-header">
              <div>
                <h3>Stock History</h3>
                <p>Recent inventory movements</p>
              </div>
            </div>

            <div className="timeline">
              {stockMovements
                .filter(
                  (movement) =>
                    movement.sku === product.sku
                )
                .map((movement) => (
                  <div
                    className="timeline-item"
                    key={movement.id}
                  >
                    <div
                      className={`timeline-dot ${
                        movement.quantity > 0
                          ? "timeline-green"
                          : "timeline-red"
                      }`}
                    />

                    <div className="timeline-content">
                      <div>
                        <strong>
                          {movement.type}
                        </strong>

                        <span>
                          {movement.date}
                        </span>
                      </div>

                      <p>
                        {movement.reason}
                      </p>

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
                        {movement.quantity} units
                      </strong>
                    </div>
                  </div>
                ))}

              <div className="timeline-item">
                <div className="timeline-dot timeline-green" />

                <div className="timeline-content">
                  <div>
                    <strong>Purchase</strong>
                    <span>18 Sep 2026</span>
                  </div>

                  <p>Supplier delivery</p>

                  <strong className="text-green">
                    +30 units
                  </strong>
                </div>
              </div>
            </div>
          </div>

          <div className="ai-card">
            <div className="ai-card-icon">✦</div>

            <span>AI RECOMMENDATION</span>

            <h3>Reorder suggested</h3>

            <p>
              Current stock is below the minimum
              threshold. Based on recent sales,
              consider ordering{" "}
              <strong>
                {product.reorderQuantity} units
              </strong>
              .
            </p>

            <div className="ai-recommendation">
              <span>Recommended quantity</span>
              <strong>
                {product.reorderQuantity} units
              </strong>
            </div>

            <button className="primary-button full-width">
              Create Purchase Order
            </button>
          </div>
        </div>
      </div>

      {showStockModal && (
        <div className="modal-overlay">
          <div className="modal small-modal">
            <div className="modal-header">
              <div>
                <h2>Manage Stock</h2>
                <p>{product.name}</p>
              </div>

              <button
                className="modal-close"
                onClick={() =>
                  setShowStockModal(false)
                }
              >
                ×
              </button>
            </div>

            <div className="form-group">
              <label>Movement Type</label>

              <select>
                <option>Stock In</option>
                <option>Stock Out</option>
                <option>Adjustment</option>
                <option>Return</option>
                <option>Damaged</option>
              </select>
            </div>

            <div className="form-group">
              <label>Quantity</label>
              <input
                type="number"
                placeholder="Enter quantity"
              />
            </div>

            <div className="form-group">
              <label>Reason</label>
              <select>
                <option>Purchase</option>
                <option>Sale</option>
                <option>Return</option>
                <option>Damaged</option>
                <option>Adjustment</option>
              </select>
            </div>

            <div className="form-group">
              <label>Notes</label>
              <textarea
                rows="3"
                placeholder="Additional notes..."
              />
            </div>

            <div className="modal-footer">
              <button
                className="secondary-button"
                onClick={() =>
                  setShowStockModal(false)
                }
              >
                Cancel
              </button>

              <button className="primary-button">
                Update Stock
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductDetails;