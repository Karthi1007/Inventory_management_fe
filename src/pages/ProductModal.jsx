import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import Modal from "react-bootstrap/Modal";
import productActions from "../redux/product/Actions";

function ProductModal({ product, onClose }) {
  const dispatch = useDispatch();

  const isEdit = Boolean(product);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (product) {
      reset({
        name: product.name,
        sku: product.sku,
        category: product.category,
        price: product.price,
        stock: product.stock,
        description: product.description,
      });
    } else {
      reset({
        name: "",
        sku: "",
        category: "",
        price: "",
        stock: "",
        description: "",
      });
    }
  }, [product, reset]);

  const onSubmit = (data) => {
    const payload = {
      name: data.name,
      sku: data.sku,
      category: data.category,
      price: Number(data.price),
      stock: Number(data.stock),
      description: data.description,
    };

    if (isEdit) {
      dispatch({
        type: productActions.UPDATE_PRODUCT,
        payload: {
          id: product.id,
          data: payload,
        },
      });
    } else {
      dispatch({
        type: productActions.ADD_PRODUCT,
        payload,
      });
    }

    onClose();
  };

  return (
    <Modal
      show={true}
      onHide={onClose}
      centered
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {isEdit ? "Edit Product" : "Add Product"}
        </Modal.Title>
      </Modal.Header>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>

          <div className="form-grid">

            {/* Product Name */}
            <div className="form-group">
              <label>Product Name</label>

              <input
                placeholder="Wireless Mouse"
                {...register("name", {
                  required: "Product name is required",
                })}
              />

              {errors.name && (
                <span className="error">
                  {errors.name.message}
                </span>
              )}
            </div>

            {/* SKU */}
            <div className="form-group">
              <label>SKU</label>

              <input
                placeholder="WM-001"
                {...register("sku", {
                  required: "SKU is required",
                })}
              />

              {errors.sku && (
                <span className="error">
                  {errors.sku.message}
                </span>
              )}
            </div>

            {/* Category */}
            <div className="form-group">
              <label>Category</label>

              <select
                {...register("category", {
                  required: "Category is required",
                })}
              >
                <option value="">
                  Select category
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

              {errors.category && (
                <span className="error">
                  {errors.category.message}
                </span>
              )}
            </div>

            {/* Price */}
            <div className="form-group">
              <label>Price</label>

              <input
                type="number"
                placeholder="799"
                {...register("price", {
                  required: "Price is required",
                })}
              />

              {errors.price && (
                <span className="error">
                  {errors.price.message}
                </span>
              )}
            </div>

            {/* Stock */}
            <div className="form-group">
              <label>Current Stock</label>

              <input
                type="number"
                placeholder="20"
                {...register("stock", {
                  required: "Stock is required",
                })}
              />

              {errors.stock && (
                <span className="error">
                  {errors.stock.message}
                </span>
              )}
            </div>
          {/* Description */}
          <div className="form-group">
            <label>Description</label>

            <textarea
              rows="4"
              placeholder="Product description..."
              {...register("description")}
            />
          </div>
          </div>

        </Modal.Body>
        <Modal.Footer>

          <button
            type="button"
            className="secondary-button"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="primary-button"
          >
            {isEdit
              ? "Update Product"
              : "Save Product"}
          </button>

        </Modal.Footer>
      </form>
    </Modal>
  );
}

export default ProductModal;