import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Workflow from "./pages/Workflow";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/workflow/:workflowId",
    element: <Workflow />,
  },
]);

export default router;
