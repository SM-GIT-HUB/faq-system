import React, { useState } from 'react'
import { useFaq } from '../store/faq-store'

function EditModal({ faq, setIsModalOpen }) {
    const { editFaq } = useFaq();
    const [form, setForm] = useState({
        question: faq?.question,
        answer: faq?.answer
    })

    async function handleSubmit()
    {
        await editFaq(form, faq?._id);
        setIsModalOpen(false);
    }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#000000c4] bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
            <h2 className="text-xl font-bold mb-4">Edit FAQ</h2>

            <label className="block text-sm font-medium">Question</label>
            <input
            type="text"
            className="w-full border rounded-md p-2 mb-3"
            value={form.question}
            onChange={(e) => setForm({ ...form, question: e.target.value})}
            />

            <label className="block text-sm font-medium">Answer</label>
            <textarea
            className="w-full border rounded-md p-2 mb-4"
            value={form.answer}
            onChange={(e) => setForm({ ...form, answer: e.target.value})}
            />

            <div className="flex justify-end gap-2">
                <button className="bg-gray-300 px-4 py-2 rounded-md cursor-pointer" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer" onClick={handleSubmit}>Save</button>
            </div>
        </div>
    </div>
  )
}

export default EditModal