import userModel from "../models/userModel.js";

// Add item
const addToCart = async (req, res) => {
    try {
        const { itemId } = req.body;

        let userData = await userModel.findById(req.userId);

        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData || {};

        if (!cartData[itemId]) {
            cartData[itemId] = 1;
        } else {
            cartData[itemId] += 1;
        }

        await userModel.findByIdAndUpdate(req.userId, { cartData });

        res.json({ success: true, message: "Added to Cart" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// Remove item
const removeFromCart = async (req, res) => {
    try {
        const { itemId } = req.body;

        let userData = await userModel.findById(req.userId);

        let cartData = userData.cartData || {};

        if (cartData[itemId] > 0) {
            cartData[itemId] -= 1;
        }

        await userModel.findByIdAndUpdate(req.userId, { cartData });

        res.json({ success: true, message: "Removed from Cart" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// Get cart
const getCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.userId);

        res.json({ success: true, cartData: userData.cartData || {} });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

export { addToCart, removeFromCart, getCart };