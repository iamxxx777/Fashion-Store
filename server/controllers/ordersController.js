const asyncHandler = require("express-async-handler")
const Order = require("../models/order")
const Product = require("../models/product")
const sendMessage = require("../utils/nodemailer")


const newOrder = asyncHandler(async (req, res) => {
    const { 
        shippingAddress,
        orderItems,
        itemsPrice,
        shippingFee,
        taxFee,
        totalPrice,
        user,
        landmark,
        paymentStatus
    } = req.body

    const newOrder = new Order({
        shippingAddress,
        orderItems,
        itemsPrice,
        shippingFee,
        taxFee,
        totalPrice,
        user,
        landmark,
        paymentStatus,
        paymentDate: Date.now(),
        status: "pending"
    })

    const order = await newOrder.save()

    for(var a = 0; a < orderItems.length; a++) {
        const product = await Product.findById(orderItems[a].product)
        const sizes = product.sizes
        const size = sizes.find((size) => size.name === orderItems[a].size)
        const newSizeQty = size.count - orderItems[a].qty
        const newTotal = product.countInStock - orderItems[a].qty

        await Product.updateOne(
            { _id: orderItems[a].product, "sizes.name": orderItems[a].size },
            {
                $set: {
                    "countInStock": newTotal,
                    "sizes.$.count": newSizeQty
                }
            }
        )
    }

    const populatedOrder = await Order.findById(order._id).populate("user", "name email")

    // const data = {
    //     name: populatedOrder.user.name,
    //     email: populatedOrder.user.email,
    //     ref: populatedOrder.paymentStatus.id
    // }

    // await sendMessage(data)
    
    res.json(populatedOrder)
})

const confirmOrderItems = asyncHandler(async (req, res) => {
    var items = req.body
    var newItems = []

    if(!items) {
        throw new Error('No items provided')
    }


    for(var a = 0; a < items.length; a++) {
        const product = await Product.findById(items[a].product)
        const sizes = product.sizes
        const size = sizes.find((size) => size.name === items[a].size)

        if(size.count < items[a].qty) {
            items[a].previousCount = items[a].qty
            items[a].qty = size.count
            items[a].countInStock = size.count
            newItems.push(items[a])
        } else {
            newItems.push(items[a])
        }
    }

    res.json(newItems)
})

const getMyOrders = asyncHandler(async (req, res) => {
    const id = req.params.id

    const orders = await Order.find({user: id}).sort({createdAt: 'desc'})

    res.json(orders)
})

const getOrder = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate("user", "name email")
    
    if(order) {
        res.json(order)
    } else {
        res.status(404)
        throw new Error("Order not found")
    }
})


const getAllOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate("user", "name email")

    res.json(orders)
})


const updateOrderToDelivered = asyncHandler(async (req, res) => {
    const { deliveryDate } = req.body
    const order = await Order.findById(req.params.id)

    if(order) {
        order.deliveryDate = deliveryDate
        order.isDelivered = true

        await order.save()
        const updatedOrder = await Order.findById(req.params.id).populate("user", "name email")
        res.json(updatedOrder)
    } else {
        res.status(404)
        throw new Error("Order not found")
    }
})




module.exports = {
    newOrder,
    getMyOrders,
    getOrder,
    getAllOrders,
    confirmOrderItems,
    updateOrderToDelivered,
}