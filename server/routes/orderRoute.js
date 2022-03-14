require('dotenv').config()
const router = require("express").Router()
const { isAuthenticated, isAdmin } = require("../middleware/auth")

const { 
    newOrder,
    getMyOrders,
    getAllOrders,
    getOrder,
    confirmOrderItems,
    updateOrderToDelivered
} = require("../controllers/ordersController")

router.get("/", isAuthenticated, isAdmin, getAllOrders)

router.post("/", isAuthenticated, newOrder)

router.post('/confirm', isAuthenticated, confirmOrderItems)

router.get("/:id", isAuthenticated, getOrder)

router.get("/myorders/:id", isAuthenticated, getMyOrders)

router.put("/:id/deliver", isAuthenticated, isAdmin, updateOrderToDelivered)




module.exports = router