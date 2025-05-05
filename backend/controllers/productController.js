import { v2 as cloudinary } from 'cloudinary';
import productModel from "../models/productModel.js";

// Function to add products
const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, bestSeller } = req.body;

        // Get uploaded file from req.files (not req.file when using upload.fields)
        const image1 = req.files?.image1?.[0];

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

        const productData = {
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestSeller: bestSeller === "true",
            image: imagesUrl,
            date: Date.now()
        };

        const product = new productModel(productData);
        await product.save();

        res.json({ success: true, message: "Product added" });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Function to list products
const listProducts = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.json({ success: true, products });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Function to remove a product
const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Product deleted" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Function to get a single product's info
const singleProduct = async (req, res) => {
    try {
        const { productId } = req.body;
        const product = await productModel.findById(productId);
        res.json({ success: true, product });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export { listProducts, addProduct, removeProduct, singleProduct };
