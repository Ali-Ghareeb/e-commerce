import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './Pages/Website/HomePage/HomePage';
import Login from './Pages/Auth/AuthOperations/Login';
import Register from './Pages/Auth/AuthOperations/Register';
import Users from './Pages/Dashboard/Users/Users';
import GoogleCallBack from './Pages/Auth/AuthOperations/GoogleCallBack';
import Dashboard from './Pages/Dashboard/Dashboard';
import RequireAuth from './Pages/Auth/Protacting/RequireAuth';
import Logout from './Pages/Auth/AuthOperations/Logout';
import User from './Pages/Dashboard/Users/User';
import AddUser from './Pages/Dashboard/Users/AddUser';
import Writer from './Pages/Dashboard/Writer';
import Error404 from './Pages/Auth/Errors/404';
import RequireBack from './Pages/Auth/Protacting/RequireBack';
import AddCategory from './Pages/Dashboard/Category/AddCategory';
import Categories from './Pages/Dashboard/Category/Categoies';
import Category from './Pages/Dashboard/Category/Category';
import Products from './Pages/Dashboard/Product/Products';
import AddProduct from './Pages/Dashboard/Product/AddProduct';
import Prodcut from './Pages/Dashboard/Product/Prodcut';
import WebSiteCategories from './Pages/Website/Categories/Categoris';
import Website from './Pages/Website/Website';
import SingalProdcut from './Pages/Website/SingalProduct/SingalProdcut'

export default function App() {
  return (
    <div className="App">
      <Routes>
        {/* Public Routes */}
        <Route element={<Website />}>
          <Route path='/' element={<HomePage />} />
          <Route path='/categories' element={<WebSiteCategories />} />
          <Route path='/prodcut/:id' element={<SingalProdcut />} />
          <Route path='/categories/:id' element={<Category />} />
        </Route>
        <Route element={<RequireBack />}>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Route>
        <Route path='/logout' element={<Logout />} />
        <Route path='/*' element={<Error404 />} />
        <Route path='/auth/google/callback' element={<GoogleCallBack />} />
        {/* Protected Routes*/}
        <Route element={<RequireAuth allowedRole={["1995", "1996", "1999"]} />}>
          <Route path='/dashboard' element={<Dashboard />}>
            <Route element={<RequireAuth allowedRole={["1995"]} />}>
              {/* Users */}
              <Route path='users' element={<Users />} />
              <Route path='users/:id' element={<User />} />
              <Route path='user/add' element={<AddUser />} />
            </Route>
            <Route element={<RequireAuth allowedRole={["1995", "1999"]} />}>
              {/* Categories */}
              <Route path='categories' element={<Categories />} />
              <Route path='categories/:id' element={<Category />} />
              <Route path='category/add' element={<AddCategory />} />
            </Route>
            <Route element={<RequireAuth allowedRole={["1995", "1999"]} />}>
              {/* Products */}
              <Route path='products' element={<Products />} />
              <Route path='products/:id' element={<Prodcut />} />
              <Route path='product/add' element={<AddProduct />} />
            </Route>
            <Route element={<RequireAuth allowedRole={["1995", "1996"]} />}>
              <Route path='writer' element={<Writer />} />
            </Route>
          </Route>
        </Route>
      </Routes>

    </div>
  );
}
