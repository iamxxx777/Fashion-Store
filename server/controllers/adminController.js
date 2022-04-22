const asyncHandler = require('express-async-handler')
const Product = require('../models/product')
const Order = require("../models/order")


const getDashboardStats = asyncHandler(async (req, res) => {
    const totalProducts = await Product.countDocuments({})
    const orders = await Order.find({}).populate("user", "name email").sort({createdAt: 'desc'})

    // Total amount made on Orders
    const amount = orders.reduce((price, item) => item.totalPrice + price, 0)
    
    const totalOrders = orders.length

    // Get Graph data
    const options = { month: 'short' }

    // Get months 
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
    
    let graphData = []

    // Loop through each month and match it with orders made in the same month
    //  and get the total number
    months.forEach((month) => {
        let value = orders.filter((mon) => new Intl.DateTimeFormat('en-US', options).format(new Date(mon.createdAt)) === month).length
        graphData.push({month: month, value: value})
    })

    res.json({amount, totalOrders, totalProducts, graphData})
})

const getProducts = asyncHandler(async(req, res) => {
    const pageSize = 10
    const pageNumber = Number(req.query.pageNumber) || 1
    const sortKey = req.query.sortKey
    const sortValue = req.query.sortValue.toLowerCase() || 'desc'
    const sort =  sortKey ? { [sortKey]: sortValue } : { updatedAt: 'desc' }
    const keyword = req.query.filterKey.toLowerCase() 
        ? {
            category: {
                $regex: req.query.filterKey,
                $options: "i"
            },
        } : {}
    const count = await Product.countDocuments({ ...keyword })

    const products = await Product.find({...keyword})
        .sort({...sort})
        .skip(pageSize * (pageNumber - 1))
        .limit(pageSize)

    res.json({
        products,
        pageNumber,
        pages: Math.ceil(count / pageSize),
        count
    })
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
    getOrders,
    getProducts
}