import Faqs from '../components/Faqs'
import { Link } from 'react-router-dom'
import { useUser } from '../store/user-store'
import LangSelect from '../components/LangSelect'

function AdminPage() {
    const { user, logout } = useUser();

    return (
      <div>
        <div className="flex items-center justify-center w-full p-2 gap-2">
            <Link to={'/'} className="bg-green-700 p-2 rounded-4xl text-white">Home</Link>
            {user && <button className="bg-green-700 p-2 rounded-4xl text-white cursor-pointer" onClick={logout}>Logout</button>}
        </div>

        <LangSelect/>

        <div className='flex items-center justify-center'>
        <Link to={'/addfaq'} className='mt-5 bg-green-800 text-white p-2 rounded-2xl'>
            Add faq
        </Link>
        </div>

        <Faqs adminPanel={true}/>
      </div>
    )
}

export default AdminPage