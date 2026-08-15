import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/admin/Login';
import Dashboard from './components/admin/Dashboard';
import AddProduct from './components/admin/AddProduct';
import UpdateProduct from './components/admin/UpdateProduct';
import Brand from './components/admin/Brand';
import LandingPage from './components/customer/LandingPage';
import CustomerLayout from '/src/components/customer/CustomerLayout';
import ProductDetails from './components/customer/landingPage/ProductDetails';
import UserLogin from './components/customer/auth/Login';
import Register from './components/customer/auth/Register';
import Profile from './components/customer/profile/Profile';
import EditProfile from './components/customer/profile/EditProfile';
import ContactUs from './components/customer/landingPage/ContactUs';
import Wishlist from './components/customer/pages/Wishlist';
import Cart from './components/customer/pages/Cart';
import AboutUs from './components/customer/pages/AboutUs';
import Responsibility from './components/customer/pages/Responsibility';
import Team from './components/customer/pages/Team';
import Collaboration from './components/customer/pages/Collaboration';
import Repair from './components/customer/pages/Repair';
import Accessibility from './components/customer/pages/Accessibility';
import Return from './components/customer/pages/Return';
import Shipping from './components/customer/pages/Shipping';
import ReturnPolicy from './components/customer/pages/Return';
import TrackOrder from './components/customer/pages/TrackOrder';
import BuyNow from './components/customer/pages/BuyNow';
import Payment from './components/customer/pages/Payment';
import Orders from './components/customer/pages/Orders';
import Shop from './components/customer/pages/Shop';
import NewArrivals from './components/customer/pages/NewArrivals';
import ShopProducts from './components/customer/pages/ShopProducts';
import Collection from './components/customer/pages/Collection';
import Gift from './components/customer/pages/Gift';
import HelpCenter from './components/customer/pages/HelpCenter';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => sessionStorage.getItem('sdf_admin_auth') === 'true'
  );

  const handleSetLoggedIn = (value) => {
    if (value) {
      sessionStorage.setItem('sdf_admin_auth', 'true');
    } else {
      sessionStorage.removeItem('sdf_admin_auth');
    }
    setIsLoggedIn(value);
  };

  return (
    <Router>
      <Routes>
        {/* Customer Routes */}
        <Route element={<CustomerLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/register" element={<Register />} /> 
          <Route path="/login" element={<UserLogin />} />
        </Route>
        <Route path="/profile" element={<Profile />} />
        <Route path='/editProfile' element={<EditProfile />} />
        <Route path='/contactUs' element={<ContactUs />} />
        <Route path="/Wishlist" element={<Wishlist />} />
        <Route path='/Cart' element={<Cart />} />
        <Route path='/aboutUs' element={<AboutUs />} />
        <Route path='/responsibility' element={<Responsibility />} />
        <Route path='/team' element={<Team />} />
        <Route path='/collaboration' element={<Collaboration />} />
        <Route path="/repair" element={<Repair />} />
        <Route path="/accessibility" element={<Accessibility />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/return" element={<ReturnPolicy />} />
        <Route path="/trackOrder" element={<TrackOrder />} />
        <Route path='/buyNow' element={<BuyNow />} />
        <Route path='/payment' element={<Payment />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/Shop' element={<Shop />} />
        <Route path='/newArrivals' element={<NewArrivals />} />
        <Route path='/shopProducts' element={<ShopProducts />} />
        <Route path='/Collection' element={<Collection />} />
        <Route path='/gift' element={<Gift />} />
        <Route path='/HelpCenter' element={<HelpCenter />} />

        {/* Admin Login */}
        <Route
          path="/admin/login"
          element={isLoggedIn ? <Navigate to="/admin/dashboard" /> : <Login setIsLoggedIn={handleSetLoggedIn} />}
        />

        {/* Admin Protected Routes */}
        <Route path="/addProduct" element={isLoggedIn ? <AddProduct /> : <Navigate to="/admin/login" />} />
        <Route path="/edit-product/:id" element={isLoggedIn ? <UpdateProduct /> : <Navigate to="/admin/login" />} />
        <Route path="/admin/dashboard" element={isLoggedIn ? <Dashboard setIsLoggedIn={handleSetLoggedIn} /> : <Navigate to="/admin/login" />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;