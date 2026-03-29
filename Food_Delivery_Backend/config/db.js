import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://yashikagarg1508_db_user:Yashika_1508@fooddel.nkzuyj8.mongodb.net/Food_Delivery').then(() => console.log("DB Connected"))
}