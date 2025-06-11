import Login from './login/Login'
import Register from './login/Register'
import Cart from './cart/Cart'
import {Route, Routes} from "react-router-dom"
import ProductAPI from '../../api/ProductAPI'
import DetailProduct from "../mainpages/utils/DetailProducts/DetailProduct"
import CreateProduct from '../admin-features/CreateProduct'
import EditProduct from '../admin-features/EditProduct'
import DeleteProduct from '../admin-features/DeleteProduct'
import Categories from "../admin-features/Categories"


const Page = () => {
  return (
   <Routes>
    <Route path="*" element={<ProductAPI />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/cart" element={<Cart />} />
    <Route>path="/detail/:id" element={DetailProduct }</Route>
    {/* <Route path="/detail/:id" element={<DetailProduct /> }></Route> */}
    <Route path='/create_product' element={<CreateProduct />}></Route>
    <Route path='/edit/:id' element={<EditProduct />}></Route>
    <Route path='/delete/:id' element={<DeleteProduct />}></Route>
    <Route path='/categories' element={<Categories />}></Route>
   </Routes>
  )
}

export default Page
