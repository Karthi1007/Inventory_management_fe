import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import commonActions from "../../redux/common/Actions";

const ToastAlert = () => {
  const dispatch = useDispatch();

  // CommonReducer அல்லது toastAlert undefined-ஆக இருந்தால் crash ஆகாமல் தடுக்க ?. மற்றும் || {} பயன்படுத்தப்பட்டுள்ளது
  const toastAlert = useSelector((state) => state?.CommonReducer?.toastAlert) || {};

  const {
    alert = false,
    message = "",
    type = "info",
    timeOut = 4000,
  } = toastAlert;

  useEffect(() => {
    if (!alert) {
      return;
    }

    const timer = setTimeout(() => {
      dispatch({
        type: commonActions.SET_TOASTER_ALERT,
        payload: {
          alert: false,
          message: "",
          type: "",
          timeOut: 0,
        },
      });
    }, timeOut || 4000);

    return () => clearTimeout(timer);
  }, [alert, timeOut, dispatch]);

  const handleClose = () => {
    dispatch({
      type: commonActions.SET_TOASTER_ALERT,
      payload: {
        alert: false,
        message: "",
        type: "",
        timeOut: 0,
      },
    });
  };

  if (!alert || !message) {
    return null;
  }

  return (
    <div className="toast-alert-container">
      <div className={`toast-alert toast-alert-${type}`}>
        <div className="toast-alert-content">
          <div className="toast-alert-icon">
            {type === "success" && "✓"}
            {type === "error" && "!"}
            {type === "warning" && "⚠"}
            {type === "info" && "i"}
          </div>

          <div className="toast-alert-message">{message}</div>
        </div>

        <button
          type="button"
          className="toast-alert-close"
          onClick={handleClose}
          aria-label="Close notification"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default ToastAlert;