import { logger } from "logger";
import { HttpException } from "utils/httpException";
import { TeacherModel } from "../models/teacherModel";
import { type Teacher } from "../types/teacher-type";
import { Agama, Gender } from "types/teacher-type";
import z, { ZodError } from "zod";

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
  email: z.email({
    error: "Email tidak valid",
  }),
  tempat_lahir: z.string({
    error: "Wajib menggunakan huruf",
  }),
  jenis_kelamin: z.enum(Gender, {
    error: "Wajib menggunakan pilihan jenis kelamin",
  }),
  agama: z.enum(Agama, {
    error: "Wajib menggunakan pilihan agama",
  }),
});

type TeacherSchema = z.infer<typeof teacherSchema>;

class TeacherService {
  async getAllTeachers(): Promise<Teacher[]> {
    logger.info("Get All Tearchers");
    try {
      const teachers = await TeacherModel.find().sort({ createdAt: -1 });
      logger.info("Get All Tearchers Success");
      return teachers;
    } catch (error) {
      logger.error("Get All Tearchers Failed");
      throw error;
    }
  }

  async getTeacherByNip(nip: number): Promise<Teacher | null> {
    logger.info("Get Teacher By Nip");
    try {
      const teacher = await TeacherModel.findOne({ nip });
      logger.info("Get Teacher By Nip Success");
      return teacher;
    } catch (error) {
      logger.error("Get Teacher By Nip Failed");
      throw error;
    }
  }

  async createTeacher(teacher: TeacherSchema): Promise<Teacher> {
    logger.info("Create Teacher");
    try {
      const validatedTeacher = teacherSchema.safeParse(teacher);

      if (!validatedTeacher.success) {
        logger.error("Validation teacher failed");
        throw new ZodError(validatedTeacher.error.issues);
      }

      const existsTeacher = await TeacherModel.findOne({ nip: teacher.nip });
      if (existsTeacher) {
        logger.warn("Teacher already exists");
        throw new HttpException(400, "NIP Guru sudah ada!");
      }

      const newTeacher = new TeacherModel({
        ...teacher,
      });

      await newTeacher.save();
      logger.info("Create Teacher Success");
      return newTeacher;
    } catch (error) {
      logger.error("Create Teacher Failed");
      throw error;
    }
  }

  async updateTeacher(
    nip: number,
    teacher: Partial<TeacherSchema>,
  ): Promise<Teacher | null> {
    logger.info("Update Teacher");
    try {
      const validatedTeacher = teacherSchema.partial().safeParse(teacher);

      if (!validatedTeacher.success) {
        logger.error("Validation teacher failed");
        throw new ZodError(validatedTeacher.error.issues);
      }

      const updatedTeacher = await TeacherModel.findOneAndUpdate(
        { nip },
        validatedTeacher.data,
        {
          new: true,
          runValidators: true,
        },
      );
      logger.info("Update Teacher Success");
      return updatedTeacher;
    } catch (error) {
      logger.error("Update Teacher Failed");
      throw error;
    }
  }

  async deleteTeacher(nip: number): Promise<Teacher | null> {
    logger.info("Delete Teacher");
    try {
      const existsTeacher = await TeacherModel.findOne({ nip });

      if (!existsTeacher) {
        logger.warn("Data guru tidak ditemukan");
        throw new HttpException(404, "Data guru tidak ditemukan");
      }

      const deletedTeacher = await TeacherModel.findOneAndDelete({ nip });

      logger.info("Delete Teacher Success");
      return deletedTeacher;
    } catch (error) {
      logger.error("Delete Teacher Failed");
      throw error;
    }
  }
}

export const teacherService = new TeacherService();
