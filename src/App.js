import { Outlet } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notify } from "../src/components/toast";

function App() {
  return (
    <div>
      <ToastContainer />

      <Outlet />
    </div>
  );
}

export default App;
