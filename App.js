import React, { useState } from "react";
import Home from "./components/home";
import Products from "./components/products";
import Login from "./components/login";
import Wishlist from "./components/wishlist";
import './app.css';

function App() {
  const [page, setPage] = useState("home");
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [showOrderSuccess, setShowOrderSuccess] = useState(false);

  const [products, setProducts] = useState([
    { id: 1, name: "Style Glass", price: 99.99, tag: "Best Seller", image: "/images/product 1.jpg" },
    { id: 2, name: "Shoes", price: 2900.99, tag: "New Arrival", image: "/images/product 2.jpg" },
    { id: 3, name: "Sunscreen", price: 490.99, tag: "Hot Deal", image: "/images/product 3.jpg" },
    { id: 4, name: "Water Bottle", price: 300.99, tag: "Eco Friendly", image: "/images/product 4.jpg" },
  ]);

  const navigateTo = (target) => {
    setPage(target);
    setShowOrderSuccess(false);
  };

  const login = ({ username, email }) => {
    setUser({ username, email });
    setPage("products");
  };

  const logout = () => {
    setUser(null);
    setCart([]);
    setPage("home");
  };

  const addToCart = (product) => {
    if (!user) {
      alert("Please log in to add items to your wishlist.");
      return;
    }
    setCart([...cart, product]);
    alert(`${product.name} added to wishlist!`);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const buyNow = (item) => {
    const total = item ? item.price : cart.reduce((sum, item) => sum + item.price, 0);
    const userDetails = window.prompt(`Total: ₹${total.toFixed(2)}\n\nEnter your shipping details:`);

    if (userDetails) {
      setCart([]);
      setShowOrderSuccess(true);
      setTimeout(() => setShowOrderSuccess(false), 5000);
    }
  };

  const addProduct = (product) => {
    const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    setProducts([...products, { ...product, id: newId }]);
  };

  const updateProduct = (id, updatedProduct) => {
    setProducts(products.map(p => (p.id === id ? { ...p, ...updatedProduct } : p)));
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#7F00FF] via-[#E100FF] to-[#FF6B6B] text-white">
      <header className="bg-white/10 backdrop-blur-md shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-wide text-white">TENK Store</h1>
          <nav className="space-x-6 text-lg font-medium">
            <button onClick={() => navigateTo("home")} className="hover:text-yellow-300 transition">Home</button>
            <button onClick={() => navigateTo("products")} className="hover:text-yellow-300 transition">Products</button>
            <button onClick={() => navigateTo("wishlist")} className="hover:text-yellow-300 transition">
              Wishlist ({cart.length})
            </button>
            {!user ? (
              <button onClick={() => navigateTo("login")} className="hover:text-yellow-300 transition">Login</button>
            ) : (
              <button onClick={logout} className="hover:text-red-300 transition">Logout</button>
            )}
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-6 py-10 animate-fade-in">
        {page === "home" && <Home />}
        {page === "products" && (
          <Products
            products={products}
            user={user}
            addToCart={addToCart}
            addProduct={addProduct}
            updateProduct={updateProduct}
            deleteProduct={deleteProduct}
          />
        )}
        {page === "wishlist" && (
          <Wishlist cartItems={cart} removeFromCart={removeFromCart} buyNow={buyNow} />
        )}
        {page === "login" && <Login login={login} />}
        {showOrderSuccess && (
          <div className="mt-8 text-center text-lg bg-green-600 py-3 rounded">
            ✅ Order placed successfully!
          </div>
        )}
      </main>

      <footer className="bg-white/10 text-white text-center py-4 mt-8 shadow-inner">
        &copy; 2025 TENK E-Commerce | Designed with ❤️
      </footer>
    </div>
  );
}

export default App;
