import { logger } from "logger";
import { TeacherModel } from "../models/teacherModel";
import type { Teacher } from "../types/teacher-type";

class TeacherService {
  async getAllTeachers(): Promise<Teacher[]> {
    logger.info("Get All Tearchers");
    try {
      const teachers = await TeacherModel.find();
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

  async createTeacher(teacher: Teacher): Promise<Teacher> {
    logger.info("Create Teacher");
    try {
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

  async updateTeacher(nip: number, teacher: Teacher): Promise<Teacher | null> {
    logger.info("Update Teacher");
    try {
      const updatedTeacher = await TeacherModel.findOneAndUpdate(
        { nip },
        teacher,
        {
          new: true,
          upsert: true,
        },
      );
      logger.info("Update Teacher Success");
      return updatedTeacher;
    } catch (error) {
      logger.error("Update Teacher Failed");
      throw error;
    }
  }

  async deleteTeacher(_id: string): Promise<Teacher | null> {
    logger.info("Delete Teacher");
    try {
      const deletedTeacher = await TeacherModel.findOneAndDelete({ _id });
      logger.info("Delete Teacher Success");
      return deletedTeacher;
    } catch (error) {
      logger.error("Delete Teacher Failed");
      throw error;
    }
  }
}

export const teacherService = new TeacherService();
