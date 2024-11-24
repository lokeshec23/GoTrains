import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import CSS for Toastify

// Function to show a toast notification
const showToast = (message, type, options = {}) => {
    toast(message, {
    type: type,
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
    ...options, // Allow overriding options
  });
};

export { ToastContainer, showToast };
