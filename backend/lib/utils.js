import { translate } from "libretranslate"
import axios from "axios"
import faqModel from "./database/models/faq.model.js"
import { redis } from "./redis.js"
import "dotenv/config"

async function getTranslatedFaqs(pageNumber, lang = "en")
{
    const key = `faq_page_${pageNumber}_lang_${lang}`;
    
    try {
        let faqs = await redis.get(key);

        if (!faqs) {
            return { success: false };
        }

        return { success: true, faqs: JSON.parse(faqs) };
    }
    catch(err) {
        console.log("error in gettranslatedfaqs method:", err);
        return { success: false };
    }
}

async function translateLang(langText, sourceLang, targetLang)
{
    
    if (process.env.NODE_ENV == "dev")
    {
        try {
            const response = await translate({
                query: langText,
                source: sourceLang,
                target: targetLang,
                format: 'text',
                apiurl: 'http://127.0.0.1:5000',
                apikey: ''
            })
        
            return response;
        }
        catch(err) {
            console.log("error in libretranslate-translatelang");
            throw err;
        }
    }
    else
    {
        try {
            const response = await axios.post(`https://translation.googleapis.com/language/translate/v2?key=${process.env.GOOGLE_TRANSLATE_API_KEY}`, {
                q: langText,
                source: sourceLang,
                target: targetLang,
                format: 'text'
            })
    
            return response.data.data.translations[0].translatedText;
        }
        catch(err) {
            console.log("error in google-translatelang");
            throw err;
        }
    }
}

async function createFaqWithTranslation(req, question, answer, htmlContent, cleanTextAnswer)
{
    let [question_trans_hi, answer_trans_hi, question_trans_bn, answer_trans_bn] = await Promise.all([
        translateLang(question, "en", "hi"),
        translateLang(cleanTextAnswer, "en", "hi"),
        translateLang(question, "en", "bn"),
        translateLang(cleanTextAnswer, "en", "bn")
    ])
    
    answer_trans_hi = htmlContent.replace(cleanTextAnswer, answer_trans_hi);
    answer_trans_bn = htmlContent.replace(cleanTextAnswer, answer_trans_bn);
    
    const faq = await faqModel.create({
        user: req.user._id,
        question, answer,
        question_hi: question_trans_hi,
        answer_hi: answer_trans_hi,
        question_bn: question_trans_bn,
        answer_bn: answer_trans_bn
    })

    return { success: true, faq };
}

async function redisClear()
{
    const count = await faqModel.countDocuments();
    const totalPages = Math.floor(count / 5) + 1;

    for (let page = 1; page <= totalPages; page++)
    {
        const key = `faq_page_${page}_lang_`;
        await redis.del(key + "en");
        await redis.del(key + "bn");
        await redis.del(key + "hi");
    }
}


export { getTranslatedFaqs, createFaqWithTranslation, translateLang, redisClear }