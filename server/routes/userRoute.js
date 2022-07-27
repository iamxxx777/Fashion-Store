const router = require("express").Router()
const { isAuthenticated, isAdmin } = require("../middleware/auth")
const { 
    registerUser,
    loginUser,
    deleteUser,
    getUserProfile,
    getAllUsers,
    getUserById,
    updatePassword,
    updateProfile,
    upgradeUser,
    addAddress,
    getAddress,
    editAddress,
    deleteAddress,
    setAddressToDefault,
    requestPasswordReset,
    handlePasswordReset
} = require("../controllers/usersController")


router.get("/:id", isAuthenticated, isAdmin, getUserById)

router.post("/", registerUser)

router.post("/login", loginUser)

router.get("/profile/", isAuthenticated, isAdmin, getAllUsers)

router.get("/profile/:id", isAuthenticated, getUserProfile)

router.put("/profile/:id", isAuthenticated, updateProfile)

router.put("/profile/password/:id", isAuthenticated, updatePassword)

router.delete("/profile/:id", isAuthenticated, deleteUser)

router.post("/profile/:id/address", isAuthenticated, addAddress)

router.put("/profile/:id/address/default", isAuthenticated, setAddressToDefault)

router.get("/profile/:id/address/:addressId", isAuthenticated, getAddress)

router.put("/profile/:id/address/:addressId", isAuthenticated, editAddress)

router.delete("/profile/:id/address/:addressId", isAuthenticated, deleteAddress)

router.put("/admin/:id", isAuthenticated, isAdmin, upgradeUser)

router.post("/forgot-password", requestPasswordReset)

router.post('/reset-password', handlePasswordReset)


module.exports = router