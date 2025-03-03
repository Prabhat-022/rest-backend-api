import express from 'express';
import authenticate from '../middleware/auth.js';
import { setProfilePicture, updateUserInformations } from '../controllers/userController.js';
import { upload } from '../middleware/multer.js';


const router = express.Router()

router.route('/upload-profile-img').post(
    upload.single(
      "image"
    ),
    authenticate, setProfilePicture);
router.route('/update-information').post(authenticate, updateUserInformations)

export default router;