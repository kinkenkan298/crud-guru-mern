import { Router, type Request, type Response } from "express";
import { logger } from "logger";
import { asyncHandler } from "middlewares/asyncHandler";
import { TeacherModel } from "models/teacherModel";
import { teacherService } from "services/teacher.service";
import { errorResponse, successResponse } from "utils/apiResponse";
import z from "zod";

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

    const teacherSchema = z.object({
      nip: z.number("NIP Tidak valid").min(6, "NIP Minimal 6 angka"),
      name: z.string({
        error: "Wajib menggunakan huruf",
      }),
      email: z.email("Email tidak valid"),
      tempat_lahir: z.string(),
      jenis_kelamin: z.enum(["MALE", "FEMALE"]),
      agama: z.enum(["ISLAM", "KRISTEN", "HINDU", "KATOLIK", "BUDDHA"]),
    });

    const validatedTeacher = teacherSchema.safeParse(req.body);

    if (!validatedTeacher.success) {
      logger.error("Request Create Teacher Failed");
      const errors = validatedTeacher.error.issues.map((err) => err.message);

      errorResponse({
        res,
        data: null,
        errors,
        statusCode: 400,
      });

      return;
    }

    const teacher = await TeacherModel.findOne({
      nip: validatedTeacher.data.nip,
    });

    if (teacher) {
      logger.warn("Teacher already exists");
      errorResponse({
        res,
        data: null,
        errors: ["NIP sudah terdaftar"],
        statusCode: 400,
      });
      return;
    }

    const newTeacher = new TeacherModel({
      ...validatedTeacher.data,
    });

    await newTeacher.save();

    successResponse({
      res,
      data: newTeacher,
      message: "Teacher created successfully",
      statusCode: 201,
    });
  }),
);

export { teacherRoutes };
