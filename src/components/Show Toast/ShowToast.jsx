import { Slide, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function ShowToast({ type, message }) {
  return toast(message, {
    type: type,
    transition: Slide,
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
  });
}
