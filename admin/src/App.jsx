import { useState } from 'react'
import './App.css'
import {BrowserRouter, Route, Router, Routes, useLocation} from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ClothingForm from "./pages/ClothingForm.jsx";
import NotFound from "./pages/NotFound.jsx";
import CategoryList from "./components/CategoryList.jsx";
import CategoryForm from "./pages/CategoryForm.jsx";
import SubCategoryList from "./components/SubCategoryList.jsx";
import SubCategoryForm from "./pages/SubCategoryForm.jsx";
import News from "./pages/News.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import PrivateRoute from "./guard/PrivateRoute.jsx";
import VoteList from "./pages/VoteList.jsx";

function App() {
    const location = useLocation();
    const showNavbar = location.pathname !== '/login';

  return (
      <div>
          {showNavbar && <Navbar />}
          <Routes>
              {/* Страница логина */}
              <Route path="/login" element={<LoginPage />} />

              {/* Защищенные маршруты */}
              <Route path="/" element={<PrivateRoute element={Dashboard} />} />
              <Route path="/add" element={<PrivateRoute element={ClothingForm} />} />
              <Route path="/categories" element={<PrivateRoute element={CategoryList} />} />
              <Route path="/votes" element={<PrivateRoute element={VoteList} />} />
              <Route path="/create-category" element={<PrivateRoute element={CategoryForm} />} />
              <Route path="/edit-category/:id" element={<PrivateRoute element={CategoryForm} />} />
              <Route path="/subcategories" element={<PrivateRoute element={SubCategoryList} />} />
              <Route path="/create-subcategory" element={<PrivateRoute element={SubCategoryForm} />} />
              <Route path="/edit-subcategory/:id" element={<PrivateRoute element={SubCategoryForm} />} />
              <Route path="/news" element={<PrivateRoute element={News} />} />

              {/* Страница NotFound для несуществующих маршрутов */}
              <Route path="*" element={<NotFound />} />
          </Routes>
      </div>
  )
}

export default App
