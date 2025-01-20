import { Router } from "express";
import CategoryController from "../controllers/category.controller";

const router = Router();

// TODO

router.route("/")
    .get(CategoryController.getCategories)
    .post(CategoryController.createCategory);

router.route("/:id")
    .get(CategoryController.getCategory)
    .put(CategoryController.updateCategory);

export default router;