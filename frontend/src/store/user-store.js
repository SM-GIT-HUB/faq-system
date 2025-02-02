import { create } from "zustand"
import { apios } from "../lib/axios"
import { toastObj } from "../lib/toastObj"
import toast from "react-hot-toast"

export const useUser = create((set, get) => ({
    user: null,
    loading: false,

    authorize: async() => {
        try {
            const response = await apios.get('/auth/getuser');
            set({ user: response.data.user });
        }
        catch(err) {
            console.log("not authorized");
            set({ user: null });
        }
    },

    signup: async(form) => {
        try {
            toast.loading("Please wait...", toastObj);

            const { name, username, password } = form;

            if (!name || !username || !password) {
                return toast.error("Please fill in all the details", toastObj);
            }

            if (password.length < 6) {
                return toast.error("Password must have atleast 6 chars", toastObj);
            }

            const response = await apios.post('/auth/signup', { ...form });
            set({ user: response.data.user });

            toast.success("Signup successful", toastObj);
        }
        catch(err) {
            toast.error(err.response?.data?.message || err.message, toastObj);
        }
        finally {
            set({ loading: false });
        }
    },
    
    login: async(form) => {
        try {
            toast.loading("Please wait...", toastObj);

            const { username, password } = form;

            if (!username || !password) {
                return toast.error("Please fill in all the details", toastObj);
            }

            const response = await apios.post('/auth/login', { ...form });
            set({ user: response.data.user });

            toast.success("Login successful", toastObj);
        }
        catch(err) {
            toast.error(err.response?.data?.message || err.message, toastObj);
        }
        finally {
            set({ loading: false });
        }
    },

    logout: async() => {
        try {
            await apios.post('/auth/logout');
            set({ user: null });
            toast.success("Logged out", toastObj);
        }
        catch(err) {
            toast.error(err.response?.data?.message || err.message);
        }
    }
}))