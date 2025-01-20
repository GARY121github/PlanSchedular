import { prisma } from "../db";
import asyncHandler from "../utils/asyncHandler";
import categorySchema from "../schemas/category.schema";
import ApiError from "../utils/ApiError";
import ApiResponse from "../utils/ApiResponse";
import { Request, Response } from "express";

// TODO
class CategoryController {
    // Create a category having name and description
    public createCategory = asyncHandler(async (req: Request, res: Response) => {
        const data = req.body;

        const validateData = categorySchema.safeParse(data);

        if (!validateData.success) {
            throw new ApiError(400, validateData.error.errors.map((error) => error.message).join(", "));
        }

        const { name, description } = validateData.data;

        await prisma.category.create({
            data: {
                name,
                description
            },
        })

        return res.status(201)
            .json(new ApiResponse(201, "Category created successfully"));
    })

    // Get all categories
    public getCategories = asyncHandler(async (req: Request, res: Response) => {
        const categories = await prisma.category.findMany();

        return res.status(200)
            .json(new ApiResponse(200, "Categories fetched successfully", categories));
    })

    // Get a category by id
    public getCategory = asyncHandler(async (req: Request, res: Response) => {
        const { id } = req.params;

        const category = await prisma.category.findUnique({
            where: { id },
        });

        if (!category) {
            throw new ApiError(404, "Category not found");
        }

        return res.status(200)
            .json(new ApiResponse(200, "Category fetched successfully", category));
    })

    // Update a category by id
    public updateCategory = asyncHandler(async (req: Request, res: Response) => {
        const { id } = req.params;
        const data = req.body;

        const validateData = categorySchema.safeParse(data);

        if (!validateData.success) {
            throw new ApiError(400, validateData.error.errors.map((error) => error.message).join(", "));
        }

        const { name, description } = validateData.data;

        const category = await prisma.category.findUnique({
            where: { id },
        });

        if (!category) {
            throw new ApiError(404, "Category not found");
        }

        await prisma.category.update({
            where: { id },
            data: {
                name,
                description
            }
        })

        return res.status(200)
            .json(new ApiResponse(200, "Category updated successfully"));
    })

    // Delete a category by id
    public deleteCategory = asyncHandler(async (req: Request, res: Response) => {
        const { id } = req.params;

        const category = await prisma.category.findUnique({
            where: { id },
        });

        if (!category) {
            throw new ApiError(404, "Category not found");
        }

        await prisma.category.delete({
            where: { id },
        });

        return res.status(200)
            .json(new ApiResponse(200, "Category deleted successfully"));
    })
}

export default new CategoryController();