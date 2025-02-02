import faqModel from "../lib/database/models/faq.model.js"
import { redis } from "../lib/redis.js"
import sanitizeHTml from "sanitize-html"
import { createFaqWithTranslation, getTranslatedFaqs, redisClear, translateLang } from "../lib/utils.js"

const langs = { "en" : 1, "hi" : 1 , "bn" : 1};

async function getFaqs(req, res)
{
    const lang = langs[req.query.lang]? req.query.lang : "en";
    let pageNumber = Number(req.query.page) || 1;
    pageNumber = (pageNumber < 1)? 1 : pageNumber;

    try {
        const redisCache = await getTranslatedFaqs(pageNumber, lang);

        const count = await faqModel.countDocuments();

        if (redisCache.success) {
            return res.status(200).json({ faqs: redisCache.faqs, count });
        }

        if (Math.floor(count / 5) + 1 < pageNumber) {
            pageNumber = Math.floor(count / 5) + 1;
        }

        let selectString = "question answer user";

        if (lang != "en") {
            selectString += ` question_${lang} answer_${lang}`;
        }

        const faqs = await faqModel.find().skip((pageNumber - 1) * 5).limit(5).select(selectString);

        if (faqs.length > 0)
        {
            const key = `faq_page_${pageNumber}_lang_${lang}`;
            await redis.setex(key, 3600, JSON.stringify(faqs));
        }

        res.status(200).json({ faqs, count });
    }
    catch(err) {
        console.log("error in getfaqs controller:", err);
        res.status(500).json({ message: "Something went wrong" });
    }
}

async function createFaq(req, res)
{
    try {
        const { question, answer } = req.body;

        if (!question || !answer) {
            return res.status(400).json({ message: "Please provide both question and answer" });
        }

        const htmlContent = answer;
        const cleanTextAnswer = sanitizeHTml(htmlContent, {
            allowedTags: [],
            allowedAttributes: {}
        })

        const response = await createFaqWithTranslation(req, question, answer, htmlContent, cleanTextAnswer);

        if (response.success == false) {
            throw new Error(response.err);
        }

        const faq = response.faq;

        const totalFaqs = await faqModel.countDocuments();
        const lastPage = Math.floor(totalFaqs / 5) + 1;

        const key = `faq_page_${lastPage}_lang_`;
        await redis.del(key + "en");
        await redis.del(key + "bn");
        await redis.del(key + "hi");

        res.status(201).json({ success: true, message: "Faq created", faq: { user: faq.user, question: faq.question, answer: faq.answer } });
    }
    catch(err) {
        console.log("error in createfaq controller:", err);
        res.status(500).json({ message: "Something went wrong" });
    }
}

async function editFaq(req, res)
{
    try {
        const id = req.params.id;
        const { question, answer } = req.body;

        const faq = await faqModel.findById(id);

        if (!faq) {
            return res.status(404).json({ success: false, message: "Faq not found" });
        }

        if (req.user._id.toString() != faq.user.toString()) {
            return res.status(401).json({ success: false, message: "Please ask the owner to edit this faq" });
        }

        let newQuestion = faq.question;
        let newQuestion_hi = faq.question_hi;
        let newQuestion_bn = faq.question_bn;

        let newAnswer = faq.answer;
        let newAnswer_hi = faq.answer_hi;
        let newAnswer_bn = faq.answer_bn;

        if (question != faq.question)
        {
            newQuestion = question;
            newQuestion_hi = await translateLang(question, "en", "hi");
            newQuestion_bn = await translateLang(question, "en", "bn");
        }

        if (answer != faq.answer)
        {
            const htmlContent = answer;
            const cleanTextAnswer = sanitizeHTml(htmlContent, {
                allowedTags: [],
                allowedAttributes: {}
            })

            newAnswer = answer;
            newAnswer_hi = await translateLang(newAnswer, "en", "hi");
            newAnswer_bn = await translateLang(newAnswer, "en", "bn");

            newAnswer_hi = htmlContent.replace(cleanTextAnswer, newAnswer_hi);
            newAnswer_bn = htmlContent.replace(cleanTextAnswer, newAnswer_bn);
        }

        faq.question = newQuestion;
        faq.question_hi = newQuestion_hi;
        faq.question_bn = newQuestion_bn;

        faq.answer = newAnswer;
        faq.answer_hi = newAnswer_hi;
        faq.answer_bn = newAnswer_bn;
        
        await faq.save();
        await redisClear();

        res.status(200).json({ success: true, message: "Faq edited", faq: { _id: faq._id, user: faq.user, question: faq.question, answer: faq.answer } });
    }
    catch(err) {
        console.log("error in editfaq controller:", err.message);
        res.status(500).json({ success: false, message: "Something went wrong" });
    }
}

async function deleteFaq(req, res)
{
    try {
        const id = req.params.id;

        const faq = await faqModel.findById(id);

        if (!faq) {
            return res.status(404).json({ success: false, message: "Faq not found" });
        }

        if (req.user._id.toString() != faq.user.toString()) {
            return res.status(401).json({ success: false, message: "Please ask the owner to delete this faq" });
        }

        await faqModel.findByIdAndDelete(id);
        await redisClear();

        res.status(200).json({ success: true, message: "Faq deleted" });
    }
    catch(err) {
        console.log("error in deletefaq controller:", err.message);
        res.status(500).json({ success: false, message: "Something went wrong" });
    }
}


export { getFaqs, createFaq, editFaq, deleteFaq }