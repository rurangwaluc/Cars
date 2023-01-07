import mongoose from "mongoose";

//for create Table into DB for User
const CategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32,
            unique: true
        }
    }, 
    {
        timestamps: true //for date
    }
);

const Category = mongoose.model("Category", CategorySchema);
export default Category;