import { useState } from "react"
import { useUser } from "../store/user-store"
import { Link } from "react-router-dom"

function LoginPage() {
    const [inputState, setInputState] = useState({
        username: "",
        password: ""
    })
    
    const { login } = useUser();

    function handleLogin()
    {
        login(inputState);
    }

    const inputCls = "w-full outline-none border border-y-zinc-700 rounded-xl px-2 py-2";

  return (
    <div className="h-screen flex items-center justify-center">
        <div className="border-[2px] border-blue-500 p-2 rounded-[4px] w-[300px] flex flex-col gap-4">
            Login
            <div className="flex flex-col gap-4">
                <div>
                    <input type="text" name="username" id="username" placeholder="Enter username" className={inputCls} value={inputState.username} onChange={(e) => setInputState({ ...inputState, username: e.target.value })} />
                </div>
                <div>
                    <input type="password" name="password" id="password" placeholder="Enter password" className={inputCls} value={inputState.password} onChange={(e) => setInputState({ ...inputState, password: e.target.value })} />
                </div>
            </div>

            <button className="bg-blue-800 text-white rounded-full py-2 cursor-pointer hover:bg-blue-900" onClick={handleLogin}>
                Submit
            </button>

            <h1 className="text-center">or</h1>

            <Link to={'/signup'} className="text-center bg-blue-800 text-white rounded-full py-2 cursor-pointer hover:bg-blue-900">
                Signup
            </Link>
        </div>
    </div>
  )
}

export default LoginPage