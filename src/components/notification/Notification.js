import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Notification() {
  return (
    <div>
      <ToastContainer position="bottom-right" />
    </div>
  );
}
