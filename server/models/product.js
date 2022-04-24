const mongoose = require("mongoose")
const Schema = mongoose.Schema

const productSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Please enter a name"]
    },
    brand: {
        type: String,
        required: [true, "please specify the brand"]
    },
    category: {
        type: String,
        required: [true, "please specify what category"]
    },
    description: {
        type: String,
        required: [true, "Please provide a description about the product"]
    },
    details: [String],
    gender: {
        type: String,
        default: 'Unisex'
    },
    images: [
        {   
            url: {
                type: String,
                required: [true, "A product must have a default image"]
            },
            cloudId: {
                type: String,
            }
            
        }
    ],
    price: {
        type: Number,
        required: true
    },
    reviews: [
        {
            user: {
                type: Schema.Types.ObjectId,
                required: true,
                ref: 'User'
            },
            comment: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            date: {
                type: Date,
                required: true
            }
        }
    ],
    ratings: {
        type: Number,
        default: 3.0
    },
    countInStock: {
        type: Number,
        default: 0
    },
    sizes: [
        {
            name: { type: String, required: [true, "Please specify the sizes"] },
            count: { type: Number, default: 0 }
        }
    ],
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {timestamps: true})



module.exports = mongoose.models.Product || mongoose.model('Product', productSchema)