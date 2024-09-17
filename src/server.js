import express from 'express'
import morgan from 'morgan'
import { createRoles } from './libs/rolesInitialSetup.js'

//Routes
import { router as authRouter } from './modules/auth/routes/auth.router.js'
import { router as postRouter } from './modules/posts/routes/posts.router.js'

//initialization
export const app = express()
createRoles()

//middlewares
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(morgan('dev'))

//routes
app.use('/api/auth', authRouter)
app.use('/api/post', postRouter)
