import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { LoadingProvider } from './context/LoadingContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Profile from './pages/Profile';
import Orders from './pages/Orders';
import AdminDashboard from './pages/admin/Dashboard';
import AdminProducts from './pages/admin/Products';
import AdminCategories from './pages/admin/Categories';
import AdminOrders from './pages/admin/Orders';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <LoadingProvider>
              <div className="min-h-screen bg-gray-50">
                <Navbar />
                <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/produk" element={<Products />} />
                <Route path="/produk/:id" element={<ProductDetail />} />
                <Route path="/keranjang" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
                <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
                <Route path="/profil" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path="/pesanan" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
                <Route path="/admin/dashboard" element={<ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>} />
                <Route path="/admin/produk" element={<ProtectedRoute adminOnly><AdminProducts /></ProtectedRoute>} />
                <Route path="/admin/kategori" element={<ProtectedRoute adminOnly><AdminCategories /></ProtectedRoute>} />
                <Route path="/admin/pesanan" element={<ProtectedRoute adminOnly><AdminOrders /></ProtectedRoute>} />
                </Routes>
              </div>
            </LoadingProvider>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
      <ScrollToTop />
    </Router>
  );
}
export default App;
