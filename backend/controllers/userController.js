// @desc    Auth User/Set token
// Route    POST /api/users/auth
// @access  Public
const authUser = (req, res) => {
    res.status(200).json({message: 'Auth User'})
}


export { authUser};