import userModel from "../models/userModel.js"

// add products to user cart
const addToCart = async (req, res) => {
    try {
        const { userId, itemId, quantity } = req.body
        const userData = await userModel.findById(userId)
        let cartData = userData.cartData;

        if (cartData[itemId]) {
            cartData[itemId] += quantity;
        } else {
            cartData[itemId] = quantity;
        }

        await userModel.findByIdAndUpdate(userId, { cartData })

        res.json({ success: true, message: "Added To Cart" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// update user cart
const updateToCart = async (req, res) => {
    try {
        const { userId, itemId, quantity } = req.body

        const userData = await userModel.findById(userId)
        let cartData = userData.cartData;

        cartData[itemId] = quantity

        await userModel.findByIdAndUpdate(userId, { cartData })
        res.json({ success: true, message: "Cart Updated" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// get user cart data
const getUserCart = async (req, res) => {
    try {
        const { userId } = req.body

        const userData = await userModel.findById(userId)
        let cartData = userData.cartData;

        res.json({ success: true, cartData })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

export { addToCart, updateToCart, getUserCart }
