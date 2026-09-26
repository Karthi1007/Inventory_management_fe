import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Header from "../components/Header";
import ProductModal from "../pages/ProductModal";
import DeleteProductModal from "../pages/DeleteProductModal";
import productActions from "../redux/product/Actions";

function Products() {
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [showProductModal, setShowProductModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const {
    products = [],
    pagination,
  } = useSelector((state) => state.productReducer);

  // ============================
  // GET ALL PRODUCTS
  // ============================

  useEffect(() => {
    dispatch({
      type: productActions.GET_PRODUCTS,
    });
  }, [dispatch]);

  // ============================
  // MAP API RESPONSE
  // ============================

  const mappedProducts = useMemo(() => {
    return products.map((product) => ({
      id: product?._id || product?.id,
      name: product?.name || "",
      sku: product?.sku || "",
      category: product?.category || "",
      price: Number(product?.price || 0),
      stock: Number(product?.stock || 0),
      status: product?.status || "Out of Stock",
      description: product?.description || "",
    }));
  }, [products]);

  // ============================
  // SEARCH + FILTER
  // ============================

  const filteredProducts = mappedProducts.filter((product) => {
    const matchesSearch =
      product.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      product.sku
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesCategory =
      !categoryFilter ||
      product.category === categoryFilter;

    const matchesStatus =
      !statusFilter ||
      product.status === statusFilter;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesStatus
    );
  });

  // ============================
  // ADD
  // ============================

  const handleAdd = () => {
    setSelectedProduct(null);
    setShowProductModal(true);
  };

  // ============================
  // EDIT
  // ============================

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setShowProductModal(true);
  };

  // ============================
  // DELETE
  // ============================

  const handleDelete = (product) => {
    setSelectedProduct(product);
    setShowDeleteModal(true);
  };

  return (
    <>
      <Header
        title="Products"
        subtitle="Manage your inventory products."
      />

      <div className="page-content">

        {/* ================= TOOLBAR ================= */}

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

            <select
              className="filter-select"
              value={categoryFilter}
              onChange={(e) =>
                setCategoryFilter(e.target.value)
              }
            >
              <option value="">
                All Categories
              </option>

              <option value="Electronics">
                Electronics
              </option>

              <option value="Furniture">
                Furniture
              </option>

              <option value="Accessories">
                Accessories
              </option>
            </select>

            <select
              className="filter-select"
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
            >
              <option value="">
                All Status
              </option>

              <option value="In Stock">
                In Stock
              </option>

              <option value="Low Stock">
                Low Stock
              </option>

              <option value="Out of Stock">
                Out of Stock
              </option>
            </select>

            <button
              className="primary-button"
              onClick={handleAdd}
            >
              + Add Product
            </button>

          </div>
        </div>

        {/* ================= TABLE ================= */}

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

                {filteredProducts.length === 0 ? (

                  <tr>
                    <td
                      colSpan="7"
                      style={{
                        textAlign: "center",
                        padding: "30px",
                      }}
                    >
                      No products found
                    </td>
                  </tr>

                ) : (

                  filteredProducts.map((product) => (

                    <tr key={product.id}>

                      <td>
                        <div className="product-table-name">

                          <div className="product-image-placeholder">
                            {product.name
                              .charAt(0)
                              .toUpperCase()}
                          </div>

                          <div>
                            <strong>
                              {product.name}
                            </strong>
                          </div>

                        </div>
                      </td>

                      <td>
                        {product.sku}
                      </td>

                      <td>
                        {product.category}
                      </td>

                      <td>
                        ₹
                        {product.price.toLocaleString(
                          "en-IN"
                        )}
                      </td>

                      <td>
                        <strong>
                          {product.stock}
                        </strong>
                      </td>

                      <td>
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
                      </td>

                      <td>

                        <div className="action-buttons">

                          <Link
                            to={`/products/${product.id}`}
                            className="table-action"
                          >
                            View
                          </Link>

                          <button
                            className="table-action"
                            onClick={() =>
                              handleEdit(product)
                            }
                          >
                            Edit
                          </button>

                          <button
                            className="table-action danger"
                            onClick={() =>
                              handleDelete(product)
                            }
                          >
                            Delete
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))
                )}

              </tbody>

            </table>

          </div>

          {/* ================= PAGINATION ================= */}

          <div className="pagination">

            <span>
              Showing {filteredProducts.length} of{" "}
              {pagination?.total || products.length}{" "}
              products
            </span>

            <div>
              <button>←</button>
              <button className="current-page">
                {pagination?.page || 1}
              </button>
              <button>→</button>
            </div>

          </div>

        </div>
      </div>

      {/* ================= ADD / EDIT MODAL ================= */}

      {showProductModal && (
        <ProductModal
          product={selectedProduct}
          onClose={() => {
            setShowProductModal(false);
            setSelectedProduct(null);
          }}
        />
      )}

      {/* ================= DELETE MODAL ================= */}

      {showDeleteModal && (
        <DeleteProductModal
          product={selectedProduct}
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedProduct(null);
          }}
        />
      )}
    </>
  );
}

export default Products;