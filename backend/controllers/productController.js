import {v2 as cloudinary} from 'cloudinary'
import productModel from "../models/productModel.js"


//fucntion for add products
const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, bestSeller } = req.body;

        const image1 = req.file;


        const images = [];
        if (image1) images.push(image1);

        const imagesUrl = await Promise.all(
            images.map(async (item) => {
                if (!item?.path) throw new Error("Image path is missing.");
                const result = await cloudinary.uploader.upload(item.path, {
                    resource_type: 'image'
                });
                return result.secure_url;
            })
        );

        console.log(name, description, price, category, subCategory, bestSeller);
        console.log(imagesUrl);
       

        const productData = {
            name,
            description,
            category,
            price:Number(price),
            subCategory,
            bestSeller: bestSeller === "true"? true : false,
            image: imagesUrl,
            date: Date.now()
        }

        console.log(productData)
        
        const product = new productModel(productData);
        await product.save()

        res.json({success:true,message:"Product added"})

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


//fucntion for list products
const listProducts = async (req,res)=>{
    try {
        const products = await productModel.find({});
        res.json({success:true,products})
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
        
    }
}

//fucntion for remove products
const removeProduct = async (req,res)=>{
    try {
        await productModel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"product deleted"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

//fucntion for single product info
const singleProduct = async (req,res)=>{
    try {
        const {productId} = req.body
        const product = await productModel.findById(productId)
        res.json({success:true,product})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

export {listProducts, addProduct, removeProduct, singleProduct} 