import { Routes, Route } from 'react-router-dom';
import { LogIn } from 'lucide-react'
import React, { useEffect } from 'react'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage';
import Navbar from './components/Navbar'
import { Toaster } from 'react-hot-toast';
import { useUserStore } from './stores/useUserStore';
import LoadingSpinner from './components/LoadingSpinner';
import { Navigate } from "react-router-dom";
import AdminPage from './pages/AdminPage';
import CategoryPage from './pages/CategoryPage';
import CartPage from "./pages/CartPage";
import PurchaseSuccessPage from './pages/PurchaseSuccessPage';


//*//
import { useCartStore } from "./stores/useCartStore";
//import {LoadingSpinner} from './components/LoadingSpinner'

function App() {
  const { user, checkAuth, checkingAuth } = useUserStore();
  //*///****/
  //avant la grance changement ajoute débagger
 const { getCartItems, cart } = useCartStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Debug: Ajouter des logs pour comprendre le comportement
  useEffect(() => {
    console.log("🔍 User state changed:", user);
    if (user) {
      console.log("👤 User is logged in, fetching cart items...");
      getCartItems();
    } else {
      console.log("❌ No user, skipping cart fetch");
    }
  }, [user]);

  // Debug: Observer les changements du panier
  useEffect(() => {
    console.log("🛒 Cart state changed:", cart);
  }, [cart]);

  if (checkingAuth) {
    console.log("⏳ Checking authentication...");
    return <LoadingSpinner />;
  }

  return (
  
    <div className='min-h-screen bg-gray-900 text-white relative overflow-hidden'>

        <div className='absolute inset-0 overflow-hidden'>
          <div className='absolute inset-0'>
            <div className='absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.3)_0%,rgba(10,80,60,0.2)_45%,rgba(0,0,0,0.1)_100%)]' />
          </div>
        </div>

        <div className='relative z-50 pt-20'>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Signup" element={!user ? <SignUpPage /> : <Navigate to='/' /> } />
          <Route path="/login" element={ !user ? <LoginPage /> : <Navigate to='/' /> } />
          <Route path="/secret-dashboard" element={ user?.role === "admin" ? <AdminPage /> : <Navigate to='/login' /> } />
         	<Route path='/category/:category' element={<CategoryPage />} />
          	<Route path='/cart' element={user ? <CartPage /> : <Navigate to='/login' />} />
            <Route path='/purchase-success' element={user ? <PurchaseSuccessPage /> : <Navigate to='/login' />}
					/>
        </Routes>
      </div>
     <Toaster/>
    </div >
  
  )
}

export default App
//rce