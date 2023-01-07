import express from 'express'
import Category from '../models/categoryModel.js';

const CategoryRouter = express.Router();

CategoryRouter.post("/add", async(req, res) => {

    const category = await new Category(req.body);
    category.save((err, data) => {
        if (err) {
          return res.status(400).json({
            err: "Can't Create Category"
          });
        }; 
        res.json({
          data
        });
      });
}); 
CategoryRouter.put("/update", async(req, res) => {

    
  const category = await req.category;
  category.name = req.body.name;
    category.save((err, data) => {
        if (err) {
          return res.status(400).json({
            err: "Can't Update Category"
          });
        }; 
        res.json(data);
      });
}); 

CategoryRouter.delete("/delete", async(req, res) => {
    const category = req.category;
   
    category.remove((err, data) => {
      if (err) {
        return res.status(400).json({
            err: "Can't delete Category"
        });
      }
      res.json({
        message: 'Category deleted'
      });
  
    });
  });
  
//for fetch or get category from db
// CategoryRouter.get("/", async(req, res) => {

//     const category = await Category.find();
//     res.send(category); 
// }); 

CategoryRouter.get("/list", async(req, res) => {
    let limit = await req.query.limit ? parseInt(req.query.limit) : 10;
    Category.find().limit(limit).exec((err, data) => {
      if (err) {
        return res.status(400).json({
            err: "Can't find Category"
        });
      }
      res.json(data);
      // console.log(data);
    }); 
  });

export default CategoryRouter;