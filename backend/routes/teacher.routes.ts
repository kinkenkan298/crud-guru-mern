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

teacherRoutes.patch<{}>(
  "/:nip",
  asyncHandler(async (req: Request, res: Response) => {
    console.log(req.params.nip);
    res.send("hasi");
  }),
);

export { teacherRoutes };
