import { Router, type Request, type Response } from "express";
import { logger } from "logger";
import { asyncHandler } from "middlewares/asyncHandler";
import { teacherService } from "services/teacher.service";
import { successResponse } from "utils/apiResponse";

const teacherRoutes: Router = Router();

teacherRoutes.get(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    logger.info("Request Get All Teachers");
    const allTeachers = await teacherService.getAllTeachers();
    logger.info("Response Get All Teachers");
    successResponse({
      res,
      message: "All teachers fetched successfully",
      data: allTeachers,
      statusCode: 200,
    });
  }),
);

teacherRoutes.post(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    logger.info("Request Create Teacher");

    const newTeacher = await teacherService.createTeacher(req.body);

    successResponse({
      res,
      data: newTeacher,
      message: "Teacher created successfully",
      statusCode: 201,
    });
  }),
);

teacherRoutes.put(
  "/:nip",
  asyncHandler(async (req: Request, res: Response) => {
    const nip = Number(req.params.nip);

    const updatedTeacher = await teacherService.updateTeacher(nip, req.body);

    successResponse({
      res,
      data: updatedTeacher,
      message: "Teacher updated successfully",
      statusCode: 200,
    });
  }),
);

teacherRoutes.delete(
  "/:nip",
  asyncHandler(async (req: Request, res: Response) => {
    const nip = Number(req.params.nip);

    const deletedTeacher = await teacherService.deleteTeacher(nip);

    successResponse({
      res,
      data: deletedTeacher,
      message: "Teacher deleted successfully",
      statusCode: 200,
    });
  }),
);

teacherRoutes.get(
  "/:nip",
  asyncHandler(async (req: Request, res: Response) => {
    const nip = Number(req.params.nip);

    const teacher = await teacherService.getTeacherByNip(nip);

    successResponse({
      res,
      data: teacher,
      message: "Teacher retrieved successfully",
      statusCode: 200,
    });
  }),
);

export { teacherRoutes };
