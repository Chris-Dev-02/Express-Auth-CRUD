import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import Role from '../models/Role.js'

export const controller = {}

controller.signup = async(req, res) => {
    try{
        const {username, email, password, roles} = req.body

        const newUser = new User({
            username, 
            email, 
            password: await User.encryptPassword(password)
        })
    
        if(roles){
            const foundRoles = await Role.find({name: {$in: roles}})
            newUser.roles = foundRoles.map((role) => role._id)
        }
        else{
            const role = await Role.findOne({name: "user"})
            newUser.roles = [role._id]
        }
    
        console.log(newUser)
    
        const savedUser = await newUser.save()
    
        const token = jwt.sign({id: savedUser._id}, 'auth_crud_secret_key', {
            expiresIn: 3600 //1 hour
        })
    
        return res.status(200).json({token})
    }
    catch(error){
        console.log(error)
        return res.status(500).json(error.message)
    }
}

controller.login = async(req, res) => {
    try{
        const userFound = await User.findOne({ email: req.body.email }).populate(
            "roles"
        )

        if(!userFound) return res.status(400).json({message: "User not found"})

        const matchPassword = await User.comparePassword(
            req.body.password,
            userFound.password
        )

        if(!matchPassword){
            return res.status(401).json({
                token: null,
                message: "Invalid password"
            })
        }

        const token = jwt.sign({ id:userFound._id}, 'auth_crud_secret_key', {
            expiresIn: 3600 ///1 hour
        })

        res.status(200).json({token})
    }
    catch(error){
        console.log(error)
    }
}

controller.logout = async(req, res) => {
    
}
