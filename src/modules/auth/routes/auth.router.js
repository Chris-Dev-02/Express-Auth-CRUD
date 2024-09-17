import { Router } from "express";
import { controller } from '../controllers/auth.controller.js'
import { verifysignup } from "../../../middlewares/index.js";

export const router = Router()

router.get('/signup', [verifysignup.checkExistingUser, verifysignup.checkExistingRoles], controller.signup)

router.get('/login', controller.login)

router.get('/logout', controller.logout)