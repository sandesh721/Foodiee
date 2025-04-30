import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './home';
import Login from './auth/login';
import Register from './auth/register';
import "./css/global.css";
import UserDashboard from './pages/user/userDashboard';
import RestaurantDashboard from './pages/restaurant/restaurantDashboard';
import AdminDashboard from './pages/admin/adminDashboard';
import ProtectedRoute from './auth/ProtectedRoute';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ✅ import other components here
import UserOrders from './pages/user/userOrders';
import UserRestaurants from './pages/user/userRestaurants';
import UserCategories from './pages/user/userCategories';
import UserProfile from './pages/user/userProfile';

import RestaurantCategories from './pages/restaurant/restaurantCategories';
import RestaurantItems from './pages/restaurant/restaurantItems';
import RestaurantDelivery from './pages/restaurant/restaurantDelivery';
import RestaurantProfile from './pages/restaurant/restaurantProfile';

import AdminRestaurants from './pages/admin/adminRestaurants';
import AdminUsers from './pages/admin/adminUsers';
import AdminProfile from './pages/admin/adminProfile';

function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/user/login" element={<Login role="user" />} />
        <Route path="/restaurant/login" element={<Login role="restaurant" />} />
        <Route path="/admin/login" element={<Login role="admin" />} />
        <Route path="/user/register" element={<Register role="user" />} />
        <Route path="/restaurant/register" element={<Register role="restaurant" />} />
        <Route path="/admin/register" element={<Register role="admin" />} />

        {/* 🔐 USER PROTECTED ROUTES */}
        <Route path="/user/dashboard" element={
          <ProtectedRoute allowedRole="user"><UserDashboard /></ProtectedRoute>} />
        <Route path="/user/orders" element={
          <ProtectedRoute allowedRole="user"><UserOrders /></ProtectedRoute>} />
        <Route path="/user/restaurants" element={
          <ProtectedRoute allowedRole="user"><UserRestaurants /></ProtectedRoute>} />
        <Route path="/user/categories" element={
          <ProtectedRoute allowedRole="user"><UserCategories /></ProtectedRoute>} />
        <Route path="/user/profile" element={
          <ProtectedRoute allowedRole="user"><UserProfile /></ProtectedRoute>} />

        {/* 🔐 RESTAURANT PROTECTED ROUTES */}
        <Route path="/restaurant/dashboard" element={
          <ProtectedRoute allowedRole="restaurant"><RestaurantDashboard /></ProtectedRoute>} />
        <Route path="/restaurant/categories" element={
          <ProtectedRoute allowedRole="restaurant"><RestaurantCategories /></ProtectedRoute>} />
        <Route path="/restaurant/items" element={
          <ProtectedRoute allowedRole="restaurant"><RestaurantItems /></ProtectedRoute>} />
        <Route path="/restaurant/delivery" element={
          <ProtectedRoute allowedRole="restaurant"><RestaurantDelivery /></ProtectedRoute>} />
        <Route path="/restaurant/profile" element={
          <ProtectedRoute allowedRole="restaurant"><RestaurantProfile /></ProtectedRoute>} />

        {/* 🔐 ADMIN PROTECTED ROUTES */}
        <Route path="/admin/dashboard" element={
          <ProtectedRoute allowedRole="admin"><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/restaurants" element={
          <ProtectedRoute allowedRole="admin"><AdminRestaurants /></ProtectedRoute>} />
        <Route path="/admin/users" element={
          <ProtectedRoute allowedRole="admin"><AdminUsers /></ProtectedRoute>} />
        <Route path="/admin/profile" element={
          <ProtectedRoute allowedRole="admin"><AdminProfile /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
