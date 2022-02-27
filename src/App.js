import User from "./components/AddUser";
import AllUsers from "./components/AllUsers";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
toast.configure();

function App() {
  return (
    <div className="mt-5">
      <User />
      <AllUsers />
    </div>
  );
}

export default App;
