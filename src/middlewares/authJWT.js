import jwt from 'jsonwebtoken'
import User from '../modules/auth/models/User.js'
import Role from '../modules/auth/models/Role.js'

export const verifyToken = async (req, res, next) => {
    try{
        const token = req.headers["x-access-token"]

        console.log(token)
    
        if(!token) 
            return res.status(403).json({message: "Token not provided"})
    
        const decoded = jwt.verify(token, 'auth_crud_secret_key')
        req.userId = decoded.id
    
        const user = await User.findById(req.userId, {password: 0})
        if(!user)
            return res.status(404).json({message: "User not found"})
    
        next()
    }
    catch(error){
        return res.status(401).json({message: "Unauthorized"})
    }
}

export const isModerator = async (req, res, next) => {
    try {
      const user = await User.findById(req.userId);
      const roles = await Role.find({ _id: { $in: user.roles } });
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          next();
          return;
        }
      }
      return res.status(403).json({ message: "Require Moderator Role!" });
    } catch (error) {
      return res.status(500).send({ message: error });
    }
  };
  
  export const isAdmin = async (req, res, next) => {
    try {
      const user = await User.findById(req.userId);
      const roles = await Role.find({ _id: { $in: user.roles } });
  
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }
  
      return res.status(403).json({ message: "Require Admin Role!" });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: error });
    }
  };
