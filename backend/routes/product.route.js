import express from "express";
import { getAllProduct,
         getFeaturedProducts,
         createProduct,
         deleteProduct,
         getRecommendedProducts, 
          getProductsByCategory,
         togglefeaturedProduct,
     } 
from "../controllers/product.controller.js";
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";
const router = express.Router() ;


router.get("/",protectRoute, adminRoute, getAllProduct);
router.get("/featured",getFeaturedProducts);
router.get("/category/:category",getProductsByCategory);
router.get("/recommendation",getRecommendedProducts);
router.post("/",protectRoute, adminRoute, createProduct);
router.patch("/:id",protectRoute, adminRoute, togglefeaturedProduct);
router.delete("/:id",protectRoute, adminRoute, deleteProduct);


export default router;