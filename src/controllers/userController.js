import { User } from "../model/User.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

//get user details 
export const setProfilePicture = async (req, res) => {
    try {

        //take userid by token data 
        const profileImagePath = req.file.path;
        console.log('profile path', profileImagePath)


        if (!profileImagePath) {
            return res.status(401).json({
                message: "ooho not found profileImagePath",
                success: false
            })
        }

        const ProfileImgUrl = await uploadOnCloudinary(profileImagePath)

        if (!ProfileImgUrl) {
            return res.status(401).json({
                message: "Not found ProfileImgUrl",
                success: false
            })
        }

        const user = await User.findById(req.user.userId)
        if (user) {
            user.image = ProfileImgUrl.url;


            await user.save()
        }

        if (!user) {
            res.status(400).json({
                message: "oho, Not found the user ",
                success: true,
            })
        }



        res.status(200).json({
            message: "Ok, update user profile successful",
            success: true,
            user
        })
    } catch (error) {

        console.log('fetching user details error', error)
        res.status(400).json({
            message: "Ooho, not update user profile data",
            success: true,
        })
    }


}

export const updateUserInformations = async (req, res) => {
    try {
        const { name, email, phone, address } = req.body;

        const user = await User.findById(req.user.userId)

        if (user) {
            user.name = name;
            user.email = email;
            user.phone = phone;
            user.address = address;
            await user.save()
        }

        if (!user) {
            res.status(400).json({
                message: "oho, User Data not found",
                success: true,
            })
        }
        res.status(200).json({
            message: "Ok, update user information successful",
            success: true,
            user
        })

    } catch (error) {
        console.log("This is the bad user Information can't update it", error)

        res.status(400).json({
            message: "User Information not updated",
            success: false
        })
    }
}
