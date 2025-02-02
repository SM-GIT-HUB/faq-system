import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useFaq } from "../store/faq-store";

function AddFaq() {
  const [form, setForm] = useState({
    question: "",
    answer: "",
  })

  const { addFaq } = useFaq();

  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    await addFaq(form);
    navigate('/admin');
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-[400px]">
        <h2 className="text-xl font-bold mb-4">Add New FAQ</h2>

        <label className="block text-sm font-medium">Question</label>
        <input
          type="text"
          className="w-full border rounded-md p-2 mb-3"
          value={form.question}
          onChange={(e) => setForm({ ...form, question: e.target.value })}
          required
        />

        <label className="block text-sm font-medium">Answer</label>
        <textarea
          className="w-full border rounded-md p-2 mb-4"
          value={form.answer}
          onChange={(e) => setForm({ ...form, answer: e.target.value })}
          required
        />

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md w-full">
          Add FAQ
        </button>
      </form>
    </div>
  );
}

export default AddFaq;
