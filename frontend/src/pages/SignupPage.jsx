import { useState } from "react"
import { useUser } from "../store/user-store"
import { Link } from "react-router-dom"

function SignupPage() {
  const [inputState, setInputState] = useState({
    name: "",
    username: "",
    password: ""
  })

  const { signup } = useUser();

  function handleSignup()
  {
    signup(inputState);
  }

  const inputCls = "w-full outline-none border border-y-zinc-700 rounded-xl px-2 py-2";

  return (
    <div className="h-screen flex items-center justify-center">
        <div className="border-[2px] border-blue-500 p-2 rounded-[4px] w-[300px] flex flex-col gap-4">
            Signup
            <div className="flex flex-col gap-2">
                <div className="">
                    <input type="text" name="name" id="name" placeholder="Enter your name" className={inputCls} value={inputState.name} onChange={(e) => setInputState({ ...inputState, name: e.target.value })} />
                </div>
                <div>
                    <input type="text" name="username" id="username" placeholder="Enter username" className={inputCls} value={inputState.username} onChange={(e) => setInputState({ ...inputState, username: e.target.value })} />
                </div>
                <div>
                    <input type="password" name="password" id="password" placeholder="Enter password" className={inputCls} value={inputState.password} onChange={(e) => setInputState({ ...inputState, password: e.target.value })} />
                </div>
            </div>

            <button className="bg-blue-800 text-white rounded-full py-2 cursor-pointer hover:bg-blue-900" onClick={handleSignup}>
                Submit
            </button>

            <h1 className="text-center">or</h1>

            <Link to={'/login'} className="text-center bg-blue-800 text-white rounded-full py-2 cursor-pointer hover:bg-blue-900">
              Login
            </Link>
        </div>
    </div>
  )
}

export default SignupPage