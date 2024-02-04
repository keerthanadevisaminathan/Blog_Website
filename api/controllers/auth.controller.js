import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs'; 

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;

    try {
        if (!username || !email || !password || username === '' || email === '' || password === '') {
            throw new Error('All fields are required');
        }

        const hashedPassword = bcryptjs.hashSync(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });
        await newUser.save();
        return res.json({ message: 'Signup successful' });
    } catch (error) {
        next(error);
    }
};
