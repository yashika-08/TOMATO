import foodModel from "../models/foodModel.js";
import fs from 'fs'


//Add Food Item
const addFood = async (req,res) => {

    console.log("HEADERS:", req.headers['content-type']);
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    if(!req.file){
        return res.json({success:false,message:"File not uploaded"});
    }

    let image_filename = req.file.filename;

    const food = new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:Number(req.body.price),
        category:req.body.category,
        image:image_filename
    });

    try{
        await food.save();
        res.json({success:true,message:"Food Added"});
    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error"});
    }
};


//All Food List
const listFood = async (req,res) => {
    try{
        const foods = await foodModel.find({});
        res.json({success:true,data:foods})
    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

//Remove Food Item
const removeFood = async (req, res) => {
    try {
        console.log("Request Body:", req.body);

        const food = await foodModel.findById(req.body.id);

        // Check if food exists
        if (!food) {
            return res.json({
                success: false,
                message: "Food not found"
            });
        }

        // Delete image file safely
        fs.unlink(`uploads/${food.image}`, (err) => {
            if (err) {
                console.log("Image delete error:", err);
            }
        });

        // Delete from database
        await foodModel.findByIdAndDelete(req.body.id);

        res.json({
            success: true,
            message: "Food Item Removed"
        });

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error removing food"
        });
    }
};


export {addFood,listFood,removeFood};