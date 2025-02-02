import { useFaq } from '../store/faq-store'

function LangSelect() {
    const { setLang } = useFaq();

  return (
    <div className="w-full flex items-center justify-around mt-2">
        <button className="bg-slate-400 p-2 rounded-[4px]" onClick={() => setLang("en")}>English</button>
        <button className="bg-slate-400 p-2 rounded-[4px]" onClick={() => setLang("hi")}>Hindi</button>
        <button className="bg-slate-400 p-2 rounded-[4px]" onClick={() => setLang("bn")}>Bengali</button>
    </div>
  )
}

export default LangSelect