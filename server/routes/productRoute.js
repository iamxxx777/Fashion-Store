const router = require("express").Router()
const upload = require("../config/multer")
const { isAuthenticated, isAdmin } = require("../middleware/auth")
const {
    getProducts,
    getCategoryProducts,
    getProduct,
    getTopProducts,
    addProductReview,
    editProduct,
    createProduct,
    deleteProduct
} = require("../controllers/productsController")

router.get('/category', getCategoryProducts)

router.get("/top", getTopProducts)

router.get("/", getProducts)

router.post("/", isAuthenticated, isAdmin, upload.array("image"), createProduct)

router.get("/:id", getProduct)

router.post("/:id/reviews", isAuthenticated, addProductReview)

router.put("/:id", isAuthenticated, isAdmin, editProduct)

router.delete("/:id", isAuthenticated, isAdmin, deleteProduct)





module.exports = router