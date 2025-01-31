import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be atleast 6 chars"]
    },
    role: {
        type: String,
        enum: ['customer', 'admin'],
        default: 'customer'
    }
},  { timestamps: true })

userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    }
    catch(err) {
        console.log("error in userSchema.pre:", err.message);
        next(err);
    }
})

userSchema.methods.comparePasswords = async function(password) {
    return bcrypt.compare(password, this.password);
}


const userModel = mongoose.model("User", userSchema);


export default userModel