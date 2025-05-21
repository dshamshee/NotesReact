import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MainLayout } from "./pages/Layout";
import { SimpleLayout } from "./pages/Layout";
import { Dashboard } from "./pages/Dashboard";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { CreateNote } from "./pages/CreateNote";
function App() {
  const router = createBrowserRouter([
    // Protected routes with Header and Footer
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "/",
          element: <Dashboard />,
        },
        {
          path: "/createNote",
          element: <CreateNote />,
        }
        
      ],
    },

    // Public routes without Header and Footer
    {
      path: "/",
      element: <SimpleLayout />,
      children: [
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/signup",
          element: <Signup />,
        },
      ],
    },
  ]);

  return (
    <div data-theme="dark">
      <RouterProvider router={router} />
      {/* <Toaster /> */}
    </div>
  );
}

export default App;
