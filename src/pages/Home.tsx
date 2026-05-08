import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Star, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  stock: number;
  category?: {
    name: string;
  };
}
const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();
  const { user } = useAuth();
  useEffect(() => {
    fetchProducts();
  }, []);
  const fetchProducts = async () => {
    try {
      const response = await fetch('https://nyooms-frozen-food-8pes.vercel.app/api/products');
      const data = await response.json();
      setProducts(data.slice(0, 6));
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };
  const handleAddToCart = (product: Product) => {
    if (!user) {
      alert('Please login to add items to cart');
      return;
    }
    addToCart(product);
  };
  const handleAddToWishlist = (product: Product) => {
    if (!user) {
      alert('Please login to add items to wishlist');
      return;
    }
    addToWishlist(product);
  };
  return (
    <div className="min-h-screen">
      {}
      <section className="bg-gradient-to-r from-orange-600 via-red-600 to-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Solusi Makanan Beku Lezat & <br />
                <span className="text-yellow-300">Praktis untuk Semua Kebutuhan!</span>
              </h1>
              <p className="text-xl mb-8 text-red-100">
                Temukan berbagai pilihan makanan beku berkualitas dengan harga ramah di kantong. Mulai dari kebab, nugget, hingga patty burger, semuanya siap masak dan praktis dinikmati kapan saja!
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/products"
                  className="bg-white text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
                >
                  Belanja Sekarang
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                src="/assets/images/Banner Frozen Food Nyooms.png"
                alt="Delicious kebab"
                className="rounded-lg shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>
      {}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Daftar Produk
            </h2>
            <p className="text-xl text-gray-600">
              Temukan produk yang paling populer
            </p>
          </div>
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                    {product.category && (
                      <span className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 text-xs rounded">
                        {product.category.name}
                      </span>
                    )}
                    <button
                      onClick={() => handleAddToWishlist(product)}
                      className={`absolute top-2 right-2 p-2 rounded-full transition-colors ${
                        isInWishlist(product.id)
                          ? 'bg-red-500 text-white'
                          : 'bg-white text-gray-600 hover:bg-red-500 hover:text-white'
                      }`}
                    >
                      <Heart className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 mb-4 text-sm">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-red-600">
                        Rp {product.price.toLocaleString()}
                      </span>
                      <div className="flex space-x-2">
                        <Link
                          to={`/products/${product.id}`}
                          className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                        >
                          Lihat Detail
                        </Link>
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition-colors"
                        >
                          <ShoppingCart className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="text-center mt-12">
            <Link
              to="/products"
              className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors inline-flex items-center"
            >
              Lihat Semua Produk
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Mengapa Pilih Nyooms?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Pengiriman Cepat
              </h3>
              <p className="text-gray-600">
                Dapatkan makanan favorit Anda yang dikirim dalam keadaan segar dan cepat
              </p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Kualitas Premium
              </h3>
              <p className="text-gray-600">
                Menggunakan bahan-bahan terbaik dan standar kualitas tertinggi
              </p>
            </div>
            <div className="text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Peduli Customer
              </h3>
              <p className="text-gray-600">
                24/7 dukungan pelanggan untuk memastikan kepuasan pelanggan
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Home;