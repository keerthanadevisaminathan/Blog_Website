import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs'; 
import {errorHandler} from '../utils/error.js';
import jwt from 'jsonwebtoken';

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



import jwt from 'jsonwebtoken';

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const validUser = await User.findOne({ email });
    if (!validUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    const token = jwt.sign(
      { id: validUser._id, isAdmin: validUser.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: '6h' } 
    );

    const { password: pass, ...rest } = validUser._doc;

    res
      .status(200)
      .cookie('access_token', token, {
        httpOnly: true,
        maxAge: 6 * 60 * 60 * 1000, 
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};
