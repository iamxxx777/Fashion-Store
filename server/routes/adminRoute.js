require('dotenv').config()
const router = require("express").Router()
const { isAuthenticated, isAdmin } = require("../middleware/auth")


const { 
    getDashboardStats,
    getOrders 
} = require('../controllers/adminController')

router.get("/", isAuthenticated, isAdmin, getDashboardStats)

router.get("/orders", isAuthenticated, isAdmin, getOrders)


module.exports = router