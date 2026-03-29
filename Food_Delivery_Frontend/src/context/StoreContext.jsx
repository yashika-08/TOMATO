import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {


const url = "http://localhost:4000";

const [food_list, setFood_list] = useState([]);
const [cartItems, setCartItems] = useState({});
const [token, setToken] = useState("");

// ------------------ ADD TO CART ------------------
const addToCart = async (itemId) => {
    try {
        if (token) {
            await axios.post(
                url + "/api/cart/add",
                { itemId },
                { headers: { token } }
            );
        }

        setCartItems((prev) => ({
            ...prev,
            [itemId]: prev[itemId] ? prev[itemId] + 1 : 1
        }));

    } catch (error) {
        console.log("Add to cart error:", error);
    }
};

// ------------------ REMOVE FROM CART ------------------
const removeFromCart = async (itemId) => {
    try {
        if (token) {
            await axios.post(
                url + "/api/cart/remove",
                { itemId },
                { headers: { token } }
            );
        }

        setCartItems((prev) => ({
            ...prev,
            [itemId]: prev[itemId] > 1 ? prev[itemId] - 1 : 0
        }));

    } catch (error) {
        console.log("Remove from cart error:", error);
    }
};

// ------------------ GET TOTAL ------------------
const getTotalCartAmount = () => {
    let total = 0;

    for (const item in cartItems) {
        if (cartItems[item] > 0) {
            const itemInfo = food_list.find((p) => p._id === item);

            if (itemInfo) {
                total += itemInfo.price * cartItems[item];
            }
        }
    }

    return total;
};

// ------------------ FETCH FOOD ------------------
const fetchFoodList = async () => {
    try {
        const response = await axios.get(url + "/api/food/list");
        setFood_list(response.data.data);
    } catch (error) {
        console.log("Food fetch error:", error);
    }
};

// ------------------ LOAD CART FROM BACKEND ------------------
const loadCartData = async (token) => {
    try {
        const response = await axios.post(
            url + "/api/cart/get",
            {},
            { headers: { token } }
        );

        setCartItems(response.data.cartData || {});
    } catch (error) {
        console.log("Cart load error:", error);
    }
};

// ------------------ INITIAL LOAD ------------------
useEffect(() => {
    const loadData = async () => {
        await fetchFoodList();

        const savedToken = localStorage.getItem("token");
        if (savedToken) {
            setToken(savedToken);
            await loadCartData(savedToken);
        }
    };

    loadData();
}, []);

// ------------------ CONTEXT VALUE ------------------
const contextValue = {
    food_list,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken
};

return (
    <StoreContext.Provider value={contextValue}>
        {children}
    </StoreContext.Provider>
);


};

export default StoreContextProvider;
