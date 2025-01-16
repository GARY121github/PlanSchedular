import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import { prisma } from "../db";
import planSchema from "../schemas/plan.schema";
import ApiError from "../utils/ApiError";
import ApiResponse from "../utils/ApiResponse";

class PlanController {

  public createPlan = asyncHandler(async (req: Request, res: Response) => {
    const data = req.body;

    const validateData = planSchema.safeParse(data);

    if (!validateData.success) {
      throw new ApiError(400, validateData.error.errors.map((error) => error.message).join(", "));
    }

    const { name, description, priority } = validateData.data;

    await prisma.plan.create({
      data: {
        name,
        description,
        priority: priority,
      },
    })

    return res.status(201)
      .json(new ApiResponse(201, {}, "Plan created successfully"));
  });

  public getPlans = asyncHandler(async (req: Request, res: Response) => {
    const plans = await prisma.plan.findMany();

    return res.status(200)
      .json(new ApiResponse(200, plans));
  });

  public getPlan = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const plan = await prisma.plan.findUnique({
      where: { 
        id 
      },
    });

    if (!plan) {
      throw new ApiError(404, "Plan not found");
    }

    return res.status(200)
      .json(new ApiResponse(200, plan));
  });

  public updatePlan = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body;

    const validateData = planSchema.safeParse(data);

    if (!validateData.success) {
      throw new ApiError(400, validateData.error.errors.map((error) => error.message).join(", "));
    }

    const { name, description, priority } = validateData.data;

    await prisma.plan.update({
      where: { id },
      data: {
        name,
        description,
        priority: priority,
      },
    });

    return res.status(200)
      .json(new ApiResponse(200, {}, "Plan updated successfully"));
  });

  public deletePlan = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    await prisma.plan.delete({
      where: { id },
    });

    return res.status(200)
      .json(new ApiResponse(200, {}, "Plan deleted successfully"));
  });
  
}

export default new PlanController();