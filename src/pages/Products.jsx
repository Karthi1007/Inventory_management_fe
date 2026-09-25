import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { products } from "../data/mockData";

function Products() {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const filteredProducts = products.filter((product) =>
    product.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <>
      <Header
        title="Products"
        subtitle="Manage your inventory products."
      />

      <div className="page-content">
        <div className="page-toolbar">
          <div className="search-box">
            <span>⌕</span>

            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />
          </div>

          <div className="toolbar-actions">
            <select className="filter-select">
              <option>All Categories</option>
              <option>Electronics</option>
              <option>Furniture</option>
              <option>Accessories</option>
            </select>

            <select className="filter-select">
              <option>All Status</option>
              <option>In Stock</option>
              <option>Low Stock</option>
              <option>Out of Stock</option>
            </select>

            <button
              className="primary-button"
              onClick={() => setShowModal(true)}
            >
              + Add Product
            </button>
          </div>
        </div>

        <div className="content-card">
          <div className="table-header-info">
            <div>
              <h3>All Products</h3>
              <p>
                {filteredProducts.length} products
              </p>
            </div>
          </div>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>SKU</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <div className="product-table-name">
                        <div className="product-image-placeholder">
                          {product.name.charAt(0)}
                        </div>

                        <div>
                          <strong>{product.name}</strong>
                          <span>{product.supplier}</span>
                        </div>
                      </div>
                    </td>

                    <td>{product.sku}</td>

                    <td>{product.category}</td>

                    <td>
                      ₹{product.price.toLocaleString()}
                    </td>

                    <td>
                      <strong>{product.stock}</strong>
                    </td>

                    <td>
                      <span
                        className={`stock-status ${
                          product.status ===
                          "In Stock"
                            ? "stock-good"
                            : product.status ===
                              "Low Stock"
                            ? "stock-low"
                            : "stock-out"
                        }`}
                      >
                        {product.status}
                      </span>
                    </td>

                    <td>
                      <div className="action-buttons">
                        <Link
                          to={`/products/${product.id}`}
                          className="table-action"
                        >
                          View
                        </Link>

                        <button className="table-action">
                          Edit
                        </button>

                        <button className="table-action danger">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pagination">
            <span>Showing 1–5 of 248 products</span>

            <div>
              <button>←</button>
              <button className="current-page">1</button>
              <button>2</button>
              <button>3</button>
              <button>→</button>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <div>
                <h2>Add Product</h2>
                <p>Add a new product to inventory.</p>
              </div>

              <button
                className="modal-close"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label>Product Name</label>
                <input placeholder="Wireless Mouse" />
              </div>

              <div className="form-group">
                <label>SKU</label>
                <input placeholder="WM-001" />
              </div>

              <div className="form-group">
                <label>Category</label>

                <select>
                  <option>Select category</option>
                  <option>Electronics</option>
                  <option>Furniture</option>
                  <option>Accessories</option>
                </select>
              </div>

              <div className="form-group">
                <label>Supplier</label>

                <select>
                  <option>Select supplier</option>
                  <option>ABC Electronics</option>
                  <option>Tech World</option>
                  <option>Display Hub</option>
                </select>
              </div>

              <div className="form-group">
                <label>Price</label>
                <input type="number" placeholder="799" />
              </div>

              <div className="form-group">
                <label>Current Stock</label>
                <input type="number" placeholder="20" />
              </div>

              <div className="form-group">
                <label>Minimum Stock</label>
                <input type="number" placeholder="10" />
              </div>

              <div className="form-group">
                <label>Reorder Quantity</label>
                <input type="number" placeholder="20" />
              </div>
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                rows="4"
                placeholder="Product description..."
              />
            </div>

            <div className="modal-footer">
              <button
                className="secondary-button"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>

              <button className="primary-button">
                Save Product
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Products;