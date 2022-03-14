const mongoose = require("mongoose")
const Schema = mongoose.Schema


const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
    },
    gender: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    addresses: [
        {
            firstName : {
                type: String,
                required: [true, "Please provide firstname"] 
            },
            lastName: {
                type: String,
                required: [true, "Please provide lastname"] 
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
            main: {
                type: Boolean,
                default: false
            }
        }
    ]
})


module.exports = mongoose.models.User || mongoose.model('User', userSchema)