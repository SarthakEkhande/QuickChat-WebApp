
import { BrowserRouter,Routes, Route } from "react-router-dom"
import HomePage from './pages/Home'
import LoginPage from './pages/login'
import SignupPage from './pages/signup'
import { Toaster } from "react-hot-toast"
import { ProtectedRoute } from "./components/ProtectedRoute.jsx"
import { Provider, useSelector } from "react-redux"
import store from "./redux/store.js"
import Loader from "./components/loader.jsx"

function App() {
     const {loader}= useSelector(state=>state.loaderReducer)
  return (
   <div>
    <Toaster
  position="top-center"
  reverseOrder={false}
/>
 {loader && <Loader/>}
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<ProtectedRoute><HomePage/></ProtectedRoute>}></Route>
      <Route path="/login" element={<LoginPage/>}></Route>

      <Route path="/signup" element={<SignupPage/>}></Route>

    </Routes>
    </BrowserRouter>
   </div>
  )
}

export default App
