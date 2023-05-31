import "./App.css";
import CoursePage from "./pages/coursePage";
import CourseList from "./component/courseList";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  { path: "/", element: <CourseList /> },
  { path: ":id", element: <CoursePage /> },
]);

function App() {
  return (
    <div style={{ marginTop: "40px" }}>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
