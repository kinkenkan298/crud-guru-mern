import { Router, type Request, type Response } from "express";
import { logger } from "logger";
import { asyncHandler } from "middlewares/asyncHandler";
import { teacherService } from "services/teacher.service";
import { Agama, Gender } from "types/teacher-type";
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
      jenis_kelamin: z.enum(Gender),
      agama: z.enum(Agama),
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

    const teacher = await teacherService.getTeacherByNip(
      validatedTeacher.data.nip,
    );

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

    const newTeacher = await teacherService.createTeacher(
      validatedTeacher.data,
    );

    successResponse({
      res,
      data: newTeacher,
      message: "Teacher created successfully",
      statusCode: 201,
    });
  }),
);

teacherRoutes.patch(
  "/:nip",
  asyncHandler(async (req: Request, res: Response) => {
    console.log(req.query.nip);
  }),
);

export { teacherRoutes };
