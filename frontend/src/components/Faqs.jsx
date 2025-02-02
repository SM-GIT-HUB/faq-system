/* eslint-disable react/prop-types */
import { useState } from "react";
import { useFaq } from "../store/faq-store"
import Faq from "./Faq"

function Faqs({ adminPanel = false, lang = "en" }) {
  let page = 1;
  const { faqs, getFaqs, totalPages} = useFaq();

  function handleLoadmore()
  {
    if (page + 1 > totalPages) {
        return;
    }

    getFaqs(lang, Math.min(page + 1, totalPages));
    page = page + 1;
  }

  return (
    <div className="pt-[50px] flex flex-col items-center justify-center">
      <div>
            {
            faqs.map((f) => (
                <Faq faq={f} key={f._id} adminPanel={adminPanel} />
            ))
            }
      </div>
      <button className="bg-gray-700 p-2 rounded-[4px] text-white cursor-pointer" onClick={handleLoadmore}>
        Load more
      </button>
    </div>
  )
}

export default Faqs;