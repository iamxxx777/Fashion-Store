require('dotenv').config()
const express = require("express")
const app = express()

const connectDB = require("./config/connectDB")
const usersRoute = require("./routes/userRoute")
const productsRoute = require("./routes/productRoute")
const ordersRoute = require("./routes/orderRoute")

const { errorHandler, notFound } = require("./middleware/errorMiddleware")

connectDB()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.use("/api/users", usersRoute)
app.use("/api/products", productsRoute)
app.use("/api/orders", ordersRoute)

app.get('/api/config/paystack', (req, res) =>
  res.send(process.env.PAYSTACK_PUBLIC)
)


app.use(errorHandler)
app.use(notFound)

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})