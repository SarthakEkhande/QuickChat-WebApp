
import { BrowserRouter,Routes, Route } from "react-router-dom"
import HomePage from './pages/Home'
import LoginPage from './pages/login'
import SignupPage from './pages/signup'


function App() {

  return (
   <div>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage/>}></Route>
            <Route path="/login" element={<LoginPage/>}></Route>

      <Route path="/signup" element={<SignupPage/>}></Route>

    </Routes>
    </BrowserRouter>
   </div>
  )
}

export default App
