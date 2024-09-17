import { Router } from "express";
import { controller} from '../controllers/posts.controller.js'
import { verifysignup, authJwt } from "../../../middlewares/index.js";

export const router = Router()

router.get('/list', controller.postsList)

router.get('/:id', controller.getPost)

router.post('/', [authJwt.verifyToken, authJwt.isModerator], controller.addPost)

router.put('/:id', [authJwt.verifyToken,authJwt.isModerator], controller.updatePost)

router.delete('/:id', [authJwt.verifyToken, authJwt.isAdmin], controller.deletePost)