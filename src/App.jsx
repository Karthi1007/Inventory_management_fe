import {BrowserRouter, Navigate, Route,Routes,} from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import StockManagement from "./pages/StockManagement";
import Analytics from "./pages/Analytics";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/login" element={<Login />} />

        {/* Protected layout - authentication will come later */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<Products />}/>
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/stock" element={<StockManagement />}/>
          <Route path="/analytics" element={<Analytics />} />
        </Route>

        <Route path="*" element={ <Navigate  to="/login" replace /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;