import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs'; 

export const signup = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password || username === '' || email === '' || password === '') {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
       
        const hashedPassword = bcryptjs.hashSync(password, 10);

       
        const newUser = new User({
            username,
            email,
            password: hashedPassword, 
        });

    
        await newUser.save();

        return res.json({ message: 'Signup successful' });
    } catch (error) {
        console.error('Error signing up user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
