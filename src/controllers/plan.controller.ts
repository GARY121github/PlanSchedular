import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import { prisma } from "../db";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import planSchema, { statusEnum } from "../schemas/plan.schema";
import ApiError from "../utils/ApiError";
import ApiResponse from "../utils/ApiResponse";

class PlanController {

  // Create a plan having name, description, priority and status (optional with default value "TODO")
  public createPlan = asyncHandler(async (req: Request, res: Response) => {
    const data = req.body;

    const validateData = planSchema.safeParse(data);

    if (!validateData.success) {
      throw new ApiError(400, validateData.error.errors.map((error) => error.message).join(", "));
    }

    const { name, description, priority, status } = validateData.data;

    await prisma.plan.create({
      data: {
        name,
        description,
        priority: priority,
        status: status || "TODO"
      },
    })

    return res.status(201)
      .json(new ApiResponse(201, "Plan created successfully"));
  });

  // Get all plans
  public getPlans = asyncHandler(async (req: Request, res: Response) => {
    const plans = await prisma.plan.findMany();

    return res.status(200)
      .json(new ApiResponse(200, "Plans fetched successfully", plans));
  });

  // Get a plan by id
  public getPlan = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const plan = await prisma.plan.findUnique({
      where: { id },
    });

    if (!plan) {
      throw new ApiError(404, "Plan not found");
    }

    return res.status(200)
      .json(new ApiResponse(200, "Plan fetched successfully", plan));
  });

  // Update a plan by id
  public updatePlan = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body;

    const validateData = planSchema.safeParse(data);

    if (!validateData.success) {
      throw new ApiError(400, validateData.error.errors.map((error) => error.message).join(", "));
    }

    const { name, description, priority, status } = validateData.data;

    await prisma.plan.update({
      where: { id },
      data: {
        name,
        description,
        priority: priority,
        status
      },
    });

    return res.status(200)
      .json(new ApiResponse(200, "Plan updated successfully"));
  });

  // Update status of a plan by id
  public updatePlanStatu = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;

    const validateData = statusEnum.safeParse(status);

    if (!validateData.success) {
      throw new ApiError(400, validateData.error.errors.map((error) => error.message).join(", "));
    }

    try {
      // Update the plan's status
      const updatedPlan = await prisma.plan.update({
        where: { id },
        data: { status },
      });

      return res
        .status(200)
        .json(
          new ApiResponse(200, "Plan status updated successfully", updatedPlan)
        );
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === "P2025") {
        // Handle case when the `id` does not exist
        return res
          .status(404)
          .json(new ApiResponse(404, "Plan with the given id does not exist"));
      }
      throw error; // Rethrow other errors
    }
  })

  // Delete a plan by id
  public deletePlan = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      await prisma.plan.delete({
        where: { id },
      });

      return res
        .status(200)
        .json(new ApiResponse(200, "Plan deleted successfully"));
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === "P2025") {
        // P2025: "An operation failed because it depends on one or more records that were required but not found."
        return res
          .status(404)
          .json(new ApiResponse(404, "Plan with the given id does not exist"));
      }
      throw error; // Let express handle the error
    }
  });
}

export default new PlanController();