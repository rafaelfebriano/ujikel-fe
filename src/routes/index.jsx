import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import LoginComp from "../components/LoginComp";

import ProtectedRoute from "../middleware/ProtectedRoute";
import AdminRoute from "../middleware/AdminRoute";

// admin
import DashboardAdminPage from "../pages/admin/DashboardAdminPage";
import StaffPage from "../pages/admin/StaffPage";
import CreateStaffPage from "../pages/admin/CreateStaffPage";
import EditStaffPage from "../pages/admin/EditStaffPage";

// staff
import StaffOrderPage from "../pages/staff/StaffOrderPage";
import CreateOrderPage from "../pages/staff/CreateOrderPage";
import EditOrderPage from "../pages/staff/EditOrderPage";
// HAPUS BARIS INI -> import PrintNotaPage from "../pages/staff/PrintNotaPage";

export const router = createBrowserRouter([
  // landing
  {
    path: "/",
    element: <App />,
  },

  // login
  {
    path: "/login",
    element: <LoginComp />,
  },

  // dashboard admin
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <AdminRoute>
          <DashboardAdminPage />
        </AdminRoute>
      </ProtectedRoute>
    ),
  },

  // data staff
  {
    path: "/staff",
    element: (
      <ProtectedRoute>
        <AdminRoute>
          <StaffPage />
        </AdminRoute>
      </ProtectedRoute>
    ),
  },

  // tambah staff
  {
    path: "/staff/create",
    element: (
      <ProtectedRoute>
        <AdminRoute>
          <CreateStaffPage />
        </AdminRoute>
      </ProtectedRoute>
    ),
  },

  // edit staff
  {
    path: "/staff/edit/:id",
    element: (
      <ProtectedRoute>
        <AdminRoute>
          <EditStaffPage />
        </AdminRoute>
      </ProtectedRoute>
    ),
  },

  //dashboard staff (daftar order)
  {
    path: "/staff/orders",
    element: (
      <ProtectedRoute>
        <StaffOrderPage />
      </ProtectedRoute>
    ),
  },

  // tambah order
  {
    path: "/staff/orders/create",
    element: (
      <ProtectedRoute>
        <CreateOrderPage />
      </ProtectedRoute>
    ),
  },

  // edit order
  {
    path: "/staff/orders/edit/:id",
    element: (
      <ProtectedRoute>
        <EditOrderPage />
      </ProtectedRoute>
    ),
  },
]);
