import express, { Router, Request, Response } from "express";
import { postCreateNewProfile, patchUpdateProfile, deleteDeleteProfile, getUserProfile, patchUpdateProfilePreferences, postSendInvitation, patchUpdateNewBillingDate, patchUpdatePaymentMethod, deleteDeleteUserAccount } from '../controller/user';
import authenticateToken from "../middleware/authentificate";
import upload from "../config/multerConfig";

const router : Router = express.Router();

//apply authentication middleware
router.use(authenticateToken)  

router.use(upload.single('profilePicture'));

//Account Deletion 
router.delete('/current', (req: Request, res: Response) => deleteDeleteUserAccount(req, res));

//Profile Creation
router.post('/current/profiles', (req: Request, res: Response) => postCreateNewProfile(req, res));

//Profile Retrival
router.get('/current/profiles/:profileId', (req: Request, res: Response) => getUserProfile(req, res))

//Profile Update
router.patch('/current/profiles/:profileId', (req: Request, res: Response) => patchUpdateProfile(req, res));

//Profile Delete
router.delete('/current/profiles/:profileId', (req: Request, res: Response) => deleteDeleteProfile(req, res));

//Update the profile preferences 
router.patch('/current/profiles/:profileId/preferences', (req: Request, res: Response) => patchUpdateProfilePreferences(req, res));

// Send invitation to a user
router.post('/current/send-invite', (req: Request, res: Response) => postSendInvitation(req, res)); 

// Update the new billing date
router.patch('/current/new-billing-date', (req: Request, res: Response) => patchUpdateNewBillingDate(req, res));

// Update the payment method
router.patch('/current/subscription', (req: Request, res: Response) => patchUpdatePaymentMethod(req, res));


export default router;