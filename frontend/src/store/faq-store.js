import { create } from "zustand"
import { apios } from "../lib/axios"
import toast from "react-hot-toast"
import { toastObj } from "../lib/toastObj"

export const useFaq = create((set, get) => ({
    faqs: [],
    currentLang: "en",
    setLang: (lang) => set({ currentLang: lang }),
    currentPage: 1,
    totalPages: 1,
    lang: "en",
    loading: false,
    
    getFaqs: async(page = 1, fetchNew = false) => {
        try {
            const response = await apios.get(`/faqs/?lang=${get().currentLang}&page=${page}`);
            const faqs = response.data.faqs;

            set({ totalPages: Math.floor(parseInt(response.data.count) / 5) + 1 });

            if (!fetchNew && get().lang == get().currentLang && page != get().currentPage) {
                set({ faqs: [ ...get().faqs, ...faqs ], currentPage: page });
            }
            else {
                set({ lang: get().currentLang, faqs: faqs, currentPage: page });
            }
        }
        catch(err) {
            toast.error(err.response?.data?.message || err.message, toastObj);
        }
    },

    addFaq: async(form) => {
        set({ loaidng: true });

        try {
            toast.loading("Please wait...", toastObj);

            await apios.post(`/faqs/create`, form);

            toast.success("Faq added", toastObj);
            set({ currentLang: "en", lang: "en", currentPage: 1 });
            get().getFaqs(1, true);
        }
        catch(err) {
            toast.error(err.response?.data?.message || err.message, toastObj);
        }
        finally {
            set({ loading: false });
        }
    },

    editFaq: async(form, id) => {
        set({ loading: true });

        try {
            toast.loading("Please wait...", toastObj);

            const response = await apios.put(`/faqs/${id}`, form);

            toast.success("Faq edited", toastObj);
            set({ currentLang: "en", lang: "en", currentPage: 1 });
            get().getFaqs(1, true);
        }
        catch(err) {
            toast.error(err.response?.data?.message || err.message, toastObj);
        }
        finally {
            set({ loading: false });
        }
    },

    deleteFaq: async(id) => {
        set({ loading: true });

        try {
            toast.loading("Please wait...", toastObj);

            await apios.delete(`/faqs/${id}`);

            toast.success("Faq deleted", toastObj);
            set({ currentLang: "en", lang: "en", currentPage: 1 });
            get().getFaqs(1, true);
        }
        catch(err) {
            toast.error(err.response?.data?.message || err.message, toastObj);
        }
        finally {
            set({ loading: false });
        }
    }
}))