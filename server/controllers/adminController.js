const asyncHandler = require('express-async-handler')
const Product = require('../models/product')
const Order = require("../models/order")

// const { getAllOrders } = require('./ordersController')


const getDashboardStats = asyncHandler(async (req, res) => {
    const totalProducts = await Product.countDocuments({})
    const orders = await Order.find({}).populate("user", "name email").sort({createdAt: 'desc'})

    const amount = orders.reduce((price, item) => item.totalPrice + price, 0)
    const totalOrders = orders.length

    res.json({amount, totalOrders, totalProducts})
})


const getOrders = asyncHandler(async (req, res) => {
    const pageSize = 10
    const pageNumber = Number(req.query.pageNumber) || 1
    const keyword = req.query.keyword.toLowerCase() 
        ? {
            status: {
                $regex: req.query.keyword,
                $options: "i"
            },
        } : {}
    const count = await Order.countDocuments({ ...keyword })

    const orders = await Order.find({...keyword}).populate('user', "name email")
        .sort({createdAt: 'desc'})
        .skip(pageSize * (pageNumber - 1))
        .limit(pageSize)

    res.json({
        orders,
        pageNumber,
        pages: Math.ceil(count / pageSize),
        count
    })
})



module.exports = {
    getDashboardStats,
    getOrders
}