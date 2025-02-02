import { Routes, Route, Navigate } from "react-router-dom"
import SignupPage from "./pages/SignupPage"
import LoginPage from "./pages/LoginPage"
import { useUser } from "./store/user-store"
import { useEffect } from "react"
import HomePage from "./pages/HomePage"
import { useFaq } from "./store/faq-store"
import AdminPage from "./pages/AdminPage"
import AddFaq from "./pages/AddFaq"

function App() {
  const { user, authorize } = useUser();
  
  const { getFaqs, currentLang } = useFaq();

  useEffect(() => {
    getFaqs();
  }, [getFaqs, currentLang])

  useEffect(() => {
    authorize();
  }, [authorize])

  return (
    <div className="">
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/admin" element={user && user?.role == "admin"? <AdminPage/> : <Navigate to='/' />} />
        <Route path="/addfaq" element={user && user?.role == "admin"? <AddFaq/> : <Navigate to='/' />} />
        <Route path="/signup" element={!user? <SignupPage/> : <Navigate to='/' />} />
        <Route path="/login" element={!user? <LoginPage/> : <Navigate to='/' />} />
        <Route path="/addfaq" element={!user? <LoginPage/> : <Navigate to='/' />} />
      </Routes>
    </div>
  )
}

export default App
