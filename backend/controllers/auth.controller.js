import userModel from "../lib/database/models/user.model.js"
import jwt from "jsonwebtoken"

function setCookie(userId, res)
{
    const token = jwt.sign({ userId }, process.env.TOKEN_SECRET, {
        expiresIn: "15d"
    })

    res.cookie("jwt-token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV != "dev",
        sameSite: "strict",
        maxAge: 15 * 24 * 3600 * 1000
    })
}

async function signup(req, res)
{
    try {
        const { name, username, password } = req.body;

        if (!name || !username || !password) {
            return res.status(400).json({ message: "Please provide all the details" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must have 6 chars" });
        }

        let user = await userModel.findOne({ username }).select("username");

        if (user) {
            return res.status(400).json({ message: "Username already exists" });
        }

        user = await userModel.create({ name, username, password });
        setCookie(user._id, res);

        res.status(201).json({ user: { _id: user._id, name: user.name, username: user.username, role: user.role } });
    }
    catch(err) {
        console.log("error in signup controller:", err);
        res.status(500).json({ message: "Something went wrong" });
    }
}

async function login(req, res)
{
    try {
        const { username, password } = req.body;

        const user = await userModel.findOne({ username }).select("_id username password name role");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (!(await user.comparePasswords(password))) {
            return res.status(401).json({ message: "Wrong password" });
        }

        setCookie(user._id, res);
        user.password = null;

        res.status(200).json({ user });
    }
    catch(err) {
        console.log("error in login controller:", err);
        res.status(500).json({ message: "Something went wrong" });
    }
}

async function logout(req, res)
{
    try {
        res.clearCookie("jwt-token", {
            httpOnly: true,
            secure: process.env.NODE_ENV != "dev",
            sameSite: "strict"
        })
        res.status(200).json({ message: "Logged out" });
    }
    catch(err) {
        console.log("error in logout:", err);
        res.status(500).json({ message: "Something went wrong" });
    }
}

async function getUser(req, res)
{
    const user = req.user;
    res.status(200).json({ user: { _id: user._id, name: user.name, username: user.username, role: user.role } });
}


export { signup, login, logout, getUser }