import { User } from "../model/User.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'

export const Login = async (req, res) => {

    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({
                message: "Please Enter valid email, password",
                success: false
            })
        }

        const user = await User.findOne({ email });

        // if user is not find in the database 
        if (!user) {
            res.status(400).json({
                message: "email and password is Invalid",
                success: false
            })
        }

        //check the password match or not 
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(401).json({
                message: "Invalid email or password",
                success: false
            })
        }
        const options = {
            httpOnly: true,
            secure: true
        }


        const token = jwt.sign(
            {
                userId: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1d'
            }
        )
        //set the data on the cookies ok 

        // if user find on the database the send successful respons to users 
        res.status(200).cookie("token", token, {
            maxAge: 1 * 24 * 60 * 1000,
            httpOnly: true,
            sameSite: 'strict'
        }, options).json({
            message: "wow, User login successful",
            success: true,
            token,
            user,
        })

    }
    catch (error) {
        //check on the terminal 
        console.log('user not login')

        //send error to user, to check where is missing something 
        res.status(400).json({
            message: "user not login",
            success: false
        })

    }


}
export const Register = async (req, res) => {

    console.log('body data:', req.body)

    try {

        const { name, email, password, phone, address, image, role } = req.body || {};

        // if (!name || !email || !password || !phone || !address || !image) {
        //     res.status(400).json({
        //         message: "Please Enter valid data",
        //         success: false
        //     })
        // }

        const user = await User.findOne({ email })
        console.log('user', user);

        // if user is not find in the database 
        if (user) {
            res.status(400).json({
                message: "Email is already registered",
                success: false
            })
        }
        // plain password is easy accesible to read and used after hack than use hash password 
        //convert the password in hash to takes a lot time to convert in plain text password 

        const hashPassword = await bcrypt.hash(password, 10)
        const newUser = User.create({
            name,
            email,
            phone,
            password: hashPassword,
            image
        })

        res.status(200).json({
            message: "New user created successfully",
            success: true,
            newUser
        })


    } catch (error) {
        //check on the terminal 
        console.log('Oh no, user not Register')

        //send error to user, to check where is missing something 
        res.status(400).json({
            message: "Sorry user not Register",
            success: false
        })
    }
}