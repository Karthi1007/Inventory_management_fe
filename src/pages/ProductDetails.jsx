import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Header from "../components/Header";
import productActions from "../redux/product/Actions";

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { product, loading } = useSelector(
    (state) => state.productReducer
  );

  useEffect(() => {
    if (id) {
      dispatch({
        type: productActions.GET_PRODUCT_BY_ID,
        payload: id,
      });
    }
  }, [id, dispatch]);

  if (loading) {
    return (
      <>
        <Header
          title="Product Details"
          subtitle="View product information."
        />

        <div className="page-content">
          <p>Loading product...</p>
        </div>
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Header
          title="Product Details"
          subtitle="View product information."
        />

        <div className="page-content">
          <p>Product not found.</p>

          <Link to="/products" className="back-link">
            ← Back to Products
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Header
        title="Product Details"
        subtitle="View product information."
      />

      <div className="page-content">
        <Link to="/products" className="back-link">
          ← Back to Products
        </Link>

        <div className="product-details-grid">
          {/* Product Information */}
          <div className="content-card product-overview">
            <div className="product-large-icon">
              {product.name?.charAt(0)?.toUpperCase()}
            </div>

            <div className="product-detail-heading">
              <div>
                <span
                  className={`stock-status ${
                    product.status === "In Stock"
                      ? "stock-good"
                      : product.status === "Low Stock"
                      ? "stock-low"
                      : "stock-out"
                  }`}
                >
                  {product.status}
                </span>

                <h2>{product.name}</h2>

                <p>
                  {product.description ||
                    "No description available."}
                </p>
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
                <strong>
                  {product.supplier || "-"}
                </strong>
              </div>

              <div>
                <span>Price</span>
                <strong>
                  ₹
                  {Number(
                    product.price || 0
                  ).toLocaleString()}
                </strong>
              </div>

              <div>
                <span>Current Stock</span>
                <strong>
                  {product.stock}
                </strong>
              </div>

              <div>
                <span>Minimum Stock</span>
                <strong>
                  {product.reorderLevel || 0}
                </strong>
              </div>
            </div>
          </div>

          {/* Stock Summary */}
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
                    product.reorderLevel > 0
                      ? (product.stock /
                          product.reorderLevel) *
                          100
                      : 100,
                    100
                  )}%`,
                }}
              />
            </div>

            <div className="stock-meta">
              <span>
                Minimum:{" "}
                <strong>
                  {product.reorderLevel || 0}
                </strong>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;