import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import productActions from "../redux/product/Actions";

function DeleteProductModal({ product, onClose }) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch({
      type: productActions.DELETE_PRODUCT,
      payload: product.id,
    });

    onClose();
  };

  return (
    <Modal
      show={true}
      onHide={onClose}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>
          Delete Product
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>
          Are you sure you want to delete{" "}
          <strong>{product?.name}</strong>?
        </p>

        <p>
          SKU: {product?.sku}
        </p>
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
          type="button"
          className="primary-button"
          style={{ background: "#dc3545" }}
          onClick={handleDelete}
        >
          Delete Product
        </button>

      </Modal.Footer>
    </Modal>
  );
}

export default DeleteProductModal;