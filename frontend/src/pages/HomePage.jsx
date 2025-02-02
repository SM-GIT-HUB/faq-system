import { Link } from "react-router-dom"
import Faqs from "../components/Faqs"
import { useUser } from "../store/user-store"
import { useFaq } from "../store/faq-store"
import LangSelect from "../components/LangSelect"

function HomePage() {
    const { user, logout } = useUser();
    const { currentLang } = useFaq();

  return (
    <div>
        {
            <div className="flex items-center justify-center w-full p-2 gap-2">
                {user && user.role == "admin" && <Link to={'/admin'} className="bg-green-700 p-2 rounded-4xl text-white">Admin Panel</Link>}
                {user && <button className="bg-green-700 p-2 rounded-4xl text-white cursor-pointer" onClick={logout}>Logout</button>}
                {!user && <Link to={'/login'} className="bg-green-700 p-2 rounded-4xl text-white">Login</Link>}
            </div>
        }

        <LangSelect/>

        <Faqs lang={currentLang}/>
    </div>
  )
}

export default HomePage