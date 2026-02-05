import { Router, type Request, type Response } from "express";
import { logger } from "logger";
import { asyncHandler } from "middlewares/asyncHandler";
import { teacherService } from "services/teacher.service";
import { Agama, Gender } from "types/teacher-type";
import { successResponse } from "utils/apiResponse";
import z, { ZodError } from "zod";

const teacherRoutes: Router = Router();

const teacherSchema = z.object({
  nip: z.number().check((ctx) => {
    if (ctx.value.toString().length !== 6) {
      ctx.issues.push({
        code: "custom",
        maximum: 6,
        origin: "number",
        inclusive: true,
        message: "NIP harus 6 angka",
        input: ctx.value,
      });
    }
  }),
  name: z.string({
    error: "Wajib menggunakan huruf",
  }),
  email: z.email("Email tidak valid"),
  tempat_lahir: z.string(),
  jenis_kelamin: z.enum(Gender),
  agama: z.enum(Agama),
});

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


    const validatedTeacher = teacherSchema.safeParse(req.body);

    if (!validatedTeacher.success) {
      logger.error("Request Create Teacher Failed");
      throw new ZodError(validatedTeacher.error.issues);
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

teacherRoutes.put(
  "/:nip",
  asyncHandler(async (req: Request, res: Response) => {

    const teacherSchema = z.object({
      name: z.string({
        error: "Wajib menggunakan huruf",
      }),
      email: z.email("Email tidak valid"),
      tempat_lahir: z.string(),
      jenis_kelamin: z.enum(Gender),
      agama: z.enum(Agama),
    });
    const nip = Number(req.params.nip);

    const validatedTeacher = teacherSchema.safeParse(req.body);

    if (!validatedTeacher.success) {
      logger.error("Request Update Teacher Failed");
      throw new ZodError(validatedTeacher.error.issues);
    }
    const updatedTeacher = await teacherService.updateTeacher(nip, {nip, ...validatedTeacher.data});

    successResponse({
      res,
      data: updatedTeacher,
      message: "Teacher updated successfully",
      statusCode: 200,
    });
  }),
);

export { teacherRoutes };
