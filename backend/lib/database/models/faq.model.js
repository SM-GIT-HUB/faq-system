import mongoose from "mongoose"
import sanitizeHtml from "sanitize-html"

const faqSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, "Please provide a question in english"]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    answer: {
        type: String,
        required: [true, "Please provide the answer in english"]
    },
    question_hi: {
        type: String
    },
    answer_hi: {
        type: String
    },
    question_bn: {
        type: String
    },
    answer_bn: {
        type: String
    }
},  { timestamps: true })

faqSchema.pre("save", function(next) {
    if (this.answer) {
        this.answer = sanitizeHtml(this.answer);
    }

    if (this.answer_hi) {
        this.answer_hi = sanitizeHtml(this.answer_hi);
    }

    if (this.answer_bn) {
        this.answer_bn = sanitizeHtml(this.answer_bn);
    }

    next();
})


const faqModel = mongoose.model("Faq", faqSchema);


export default faqModel