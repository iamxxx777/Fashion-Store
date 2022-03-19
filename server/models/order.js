const mongoose = require("mongoose")
const Schema = mongoose.Schema

const orderSchema = new Schema({
    shippingAddress: {
        firstName: {
            type: String,
            required: [true, "Please enter firstName"] 
        },
        lastName: {
            type: String,
            required: [true, "Please enter lastName"] 
        },
        address: {
            type: String,
            required: [true, "Please enter address"] 
        },
        state: {
            type: String,
            required: [true, 'Please select a state']
        },
        city: {
            type: String,
            required: [true, 'Please select a city']
        },
        phone: {
            type: String,
            required: [true, 'Please, enter your phone number']
        },
        phone2: {
            type: String
        },
        landmark: {
            type: String
        },
    },
    orderItems: [
        {
            name: {
                type: String,
                required: true
            },
            qty: {
                type: Number,
                required: true
            },
            size: {
                type: String,
                required: true
            },
            images: [
                {
                    url: {
                        type: String,
                        required: true
                    },
                }
            ],
            price: {
                type: Number,
                required: true
            },
            product: {
                type: Schema.Types.ObjectId,
                required: true,
                ref: 'Product'
            }
        }
    ],
    itemsPrice: {
        type: Number,
        required: true
    },
    shippingFee: {
        type: Number,
        required: true
    },
    taxFee: {
        type: Number,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    paymentStatus: {
        id: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true
        }
    },
    paymentDate: {
        type: Date,
    },
    status: {
        type: 'String',
        default: 'pending'
    },
    deliveryDate: {
        type: Date
    }
}, {timestamps: true})



module.exports = mongoose.models.Order || mongoose.model("Order", orderSchema)