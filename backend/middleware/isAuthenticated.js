import userModule from '../modules/userModule.js'
import jwt from 'jsonwebtoken'


export const isAuthenticated = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    //agr token nahi milta hai tab login karne bolenge
    if (!token) {
      return res.status(401).json({ message: "Deko login pahele karna hoga" })
    }
    //ager token mil jata hai tab verify karna hai using jwt.verify mthd se
    const decoded = await jwt.verify(token, process.env.SECRETE_JWT);
    //useke baad userModule mai save kar dena hai aur isko router file mai middleware ke roop mai use karna hai
    req.user = await userModule.findById(decoded._id);
    next()

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}
export default isAuthenticated