import mongoose from "mongoose";
const {
    ObjectId
} = mongoose.Schema;
//for create Table into DB for product
const ProductSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        slug: {type: String, required: true, unique: true},
        category: {type: String, required: true},
        description: {type: String, required: true},
        price: {type: Number, required: true},
        images: { 
            type: Array,
            default: []
        },
        sellerId: {type: String, required: true},
        seller: {type: String, required: true},
        sellerImage: {type: String, required: true},
        isApproved: {type: Boolean, default: false, required: true}
    }, 
    {
        timestamps: true //for date
    }
);

const Product = mongoose.model("Product", ProductSchema);
export default Product;