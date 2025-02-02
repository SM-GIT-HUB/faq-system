import { useState } from 'react'
import { ChevronDown, ChevronUp, Trash, Edit } from "lucide-react"
import { useFaq } from '../store/faq-store'
import EditModal from './EditModal';

function Faq({ faq, adminPanel = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { currentLang, deleteFaq } = useFaq();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  }

  function handleDelete()
  {
    deleteFaq(faq._id);
  }

  const qField = currentLang == "en"? "question" : `question_${currentLang}`;
  const ansField = currentLang == "en"? "answer" : `answer_${currentLang}`;

  return (
    <div className="bg-gray-200 p-4 my-2 rounded-md shadow-md w-[400px]">
      <div className="font-bold text-xl text-gray-800" >
        <div className='flex justify-between'>
            <h1 onClick={toggleDropdown} className='cursor-pointer'>
                {faq[qField]}
            </h1>
            <div className='flex gap-2'>
                {isOpen && <ChevronUp onClick={() => setIsOpen(false)} className='cursor-pointer' />}
                {!isOpen && <ChevronDown onClick={() => setIsOpen(true)} className='cursor-pointer' />}
                {adminPanel && <Edit className='cursor-pointer' onClick={() => setIsModalOpen(true)} />}
                {adminPanel && <Trash className='cursor-pointer' onClick={handleDelete} />}
            </div>
        </div>
      </div>

      {
        isOpen && (
            <div className="text-lg text-gray-700 mt-4" dangerouslySetInnerHTML={{ __html: faq[ansField] }} />
        )
      }

      {
        isModalOpen && <EditModal faq={faq} setIsModalOpen={setIsModalOpen} />
      }
    </div>
  )
}

export default Faq