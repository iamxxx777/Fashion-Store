const asyncHandler = require("express-async-handler")
const bcrypt = require("bcrypt")
const User = require("../models/user")
const generateToken = require("../utils/generateToken")


const registerUser = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password } = req.body

    const userExist = await User.findOne({ email })

    if(userExist) {
        res.status(400)
        throw new Error("Email is already in use")
    } else {
        const salt = await bcrypt.genSalt(10)
        const newPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: newPassword,
        })

        await newUser.save()

        if(newUser) {
            res.json({
                _id: newUser._id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
                isAdmin: newUser.isAdmin,
                token: generateToken(newUser._id)
            })
        } else {
            res.status(400)
            throw new Error('Invalid user data')
        }

    }

})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    const match = await bcrypt.compare(password, user.password)

    if(user && match) {
        const { _doc } = user
        const { password, addresses, phone, gender, ...others } = _doc
        res.json({
            ...others,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user email or password')
    }

})

const updatePassword = asyncHandler(async (req, res) => {
    const { currentPassword, newPassword } = req.body
    console.log(req.body)
    const user = await User.findById(req.params.id)

    const match = await bcrypt.compare(currentPassword, user.password)
    
    if(match) {
        const salt = await bcrypt.genSalt(10)
        let hashedPassword = await bcrypt.hash(newPassword, salt)

        await User.updateOne(
            { _id: req.params.id },
            {
                $set: {"password": hashedPassword}
            }
        )

        res.json({message: "Password update successful"})
    } else {
        res.status(401)
        throw new Error("incorrect password")
    }
})

const upgradeUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if (user) {
        user.isAdmin = req.body.isAdmin
        const upgradedUser = await user.save()

        res.json({
            id: upgradedUser._id,
            name: upgradedUser.name,
            email: upgradedUser.email,
            phone: upgradedUser.phone || null,
            isAdmin: upgradedUser.isAdmin,
            token: generateToken(upgradedUser._id)
        })
    } else {
        res.status(404)
        throw new Error("User does not exist")
    }
})

const updateProfile = asyncHandler(async (req, res) => {
    const data = req.body
    const user = await User.findById(req.params.id)

    if(!user) {
        res.status(404)
        throw new Error("User does not exist")
    }

    await User.updateOne(
        { _id: req.params.id },
        {
            $set: {
                "firstName": data.firstName,
                "lastName": data.lastName,
                "phone": data.phone,
                "gender": data.gender,
            }
        }
    )

    res.json({success: true})
})

const getUserProfile = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id).select("-password")

    if(user) {
        res.json(user)
    } else {
        res.status(404)
        throw new Error("User does not exist")
    }
})


const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find({}).select("-password")

    res.json(users)
})


const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select("-password")

    if(user) {
        res.json(user)
    } else {
        res.status(404)
        throw new Error("User does not exist")
    }
})


const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if(user) {
        await User.deleteOne({id: req.params.id})
        res.json({message: "User deleted"})
    } else {
        res.status(404)
        throw new Error("User does not exist")
    }

})


const addAddress = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    let address = req.body

    if(!user) {
        res.status(404)
        throw new Error("User does not exist")
    }

    if(user.addresses.length === 0) {
        address.main = true
    }

    let newAddresses;

    if(address.main) {
        const addresses = user.addresses.map((address) => {
            address._doc.main = false
            return address
        })
        newAddresses = [...addresses, address]
    } else {
        newAddresses = [...user.addresses, address]
    }



    User.findByIdAndUpdate(req.params.id, {$set: {addresses: newAddresses}}, {new: true}, (err, doc) => {
        if(err) {
            res.status(500)
            throw new Error('Server Error')
        } else {
            res.json({success: "Address Added"})
        }
    })

})

const getAddress = asyncHandler(async (req, res) => {
    const address = await User.findById((req.user._id), {addresses: {$elemMatch: {_id: req.params.addressId}}})

    if(!address.addresses[0]) {
        res.status(404)
        throw new Error('Address Not found')
    }

    res.json(address.addresses[0])
})

const editAddress = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    const editedAddress = req.body

    if(!user) {
        res.status(404)
        throw new Error("User does not exist")
    }

    const address = await User.findById((req.params.id), {addresses: {$elemMatch: {_id: req.params.addressId}}})

    if(!address.addresses[0]) {
        res.status(404)
        throw new Error('Address Not found')
    }

    if(editedAddress.main) {
        const addresses = user.addresses
        const editedAddresses = addresses.map((address) => {
            address._doc.main = false
            return address
        })

        await User.updateOne(
            { _id: req.params.id, "addresses._id": req.params.addressId },
            {
                $set: {"addresses.$": editedAddresses}
            }
        )

        res.json({success: true})
    } else {
        await User.updateOne(
            { _id: req.params.id, "addresses._id": req.params.addressId },
            {
                $set: {"addresses.$": editedAddress}
            }
        )

        res.json({success: true})
    }

})

const setAddressToDefault = asyncHandler(async (req, res) => {
    const { id } = req.params
    const addressId = req.body

    const user = await User.findById(id)

    if(!user) {
        res.status(404)
        throw new Error('User Not found')
    }

    const addresses = user.addresses
    const editedAddresses = addresses.map((address) => {
        address.main = false
    })

    user.addresses = editedAddresses
    user.save()

    await User.updateOne(
        { _id: id, "addresses._id": addressId },
        {
            $set: {
                "addresses.$.main": true
            }
        }
    )

    res.json({success: true})
})


const deleteAddress = asyncHandler(async (req, res) => {
    const { id, addressId } = req.params
    const user = await User.findById(id)

    if(!user) {
        res.status(404)
        throw new Error('User Not found')
    }

    await User.updateOne(
        { '_id': id }, 
        { $pull: { addresses: { _id: addressId } } },
        { upsert: false }
    )

    res.json({ success: true })
})



module.exports = {
    registerUser,
    loginUser,
    updatePassword,
    upgradeUser,
    updateProfile,
    getUserProfile,
    getAllUsers,
    getUserById,
    deleteUser,
    addAddress,
    getAddress,
    editAddress,
    setAddressToDefault,
    deleteAddress
}