import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import  {store } from "../src/redux/Store";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import StockManagement from "./pages/StockManagement";
import Analytics from "./pages/Analytics";
import ToastAlert from "./components/common/ToastAlert";
import Register from "./pages/Register";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        {/* Global Notifications/Alerts */}
        <ToastAlert />

        <Routes>
          {/* Public Route */}
          <Route path="/login" element={<Login />} />
          <Route path="/register"  element={<Register />} />
          
          {/* Protected Routes */}
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/stock" element={<StockManagement />} />
            <Route path="/analytics" element={<Analytics />} />
          </Route>

          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;