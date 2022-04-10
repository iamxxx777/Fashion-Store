require('dotenv').config()
const router = require("express").Router()
const { isAuthenticated, isAdmin } = require("../middleware/auth")

const { 
    newOrder,
    getMyOrders,
    getAllOrders,
    getOrder,
    confirmOrderItems,
    updateOrderStatus

} = require("../controllers/ordersController")

router.get("/", isAuthenticated, isAdmin, getAllOrders)

router.post("/", isAuthenticated, newOrder)

router.post('/confirm', isAuthenticated, confirmOrderItems)

router.get("/:id", isAuthenticated, getOrder)

router.put("/:id", isAuthenticated, isAdmin, updateOrderStatus)

router.get("/myorders/:id", isAuthenticated, getMyOrders)





module.exports = router