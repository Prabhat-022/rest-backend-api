import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config();

export const connectDB = async () => {
    try {
        const res = await mongoose.connect(process.env.MONGO_URI)
        console.log('Be Happy, DB connected!!')
    } catch (error) {
        console.log('Ooo DB is not connected??')
    }
}

