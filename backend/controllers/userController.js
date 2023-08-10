import generateToken from "../utils/generateToken.js";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

// @desc    Auth User/Set token
// Route    POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
 const {email, password} = req.body;

 const user = await User.findOne({email});

 if(user && (await user.matchPassword(password))) {
    generateToken(res, user._id )
    res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email
    })
} else{
    res.status(401)
    throw new Error('Invalid Email or Password!')
}
})

// @desc    Register a new User
// Route    POST /api/users/
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({email})

    if(userExists){
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({
        name, email, password
    })

    if(user) {
        generateToken(res, user._id )
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        })
    } else{
        res.status(400)
        throw new Error('Invalid User Data')
    }

}) 


// @desc   Logout User
// Route    POST /api/users/logout
// @access  Public
const logoutUser = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Logout User' })
})


// @desc    Get User profile
// Route    GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'User Profile' })
})

// @desc    Update User Profile
// Route    PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Update User Profile' })
})
export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
};