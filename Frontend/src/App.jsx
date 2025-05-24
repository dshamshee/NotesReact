import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MainLayout } from "./pages/Layout";
import { SimpleLayout } from "./pages/Layout";
import { Dashboard } from "./pages/Dashboard";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { CreateNote } from "./pages/CreateNote";
import { useMedia } from 'react-use';
import { ToastContainer } from 'react-toastify';
import { ProtectedRoute } from "./components/ProtectedRoute";
import { UpdateNote } from "./pages/UpdateNote";
import { getNote } from "./utils/api";

function App() {
 
  // Get system theme and set the application theme accordingly using react-use library
  const isDark = useMedia('(prefers-color-scheme: dark)', false);

  const router = createBrowserRouter([
    // Protected routes with Header and Footer
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <MainLayout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <Dashboard />,
        },
        {
          path: "/createNote",
          element: <CreateNote />,
        },
        {
          path: "/updateNote/:id",
          element: <UpdateNote />,
          loader: getNote,
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
    <div data-theme={isDark ? 'dark' : 'light'}>
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
}

export default App;
