import { TeacherModel } from "../models/teacherModel";
import type { Teacher } from "../types/teacher-type";

class TeacherService {
  async getAllTeachers(): Promise<Teacher[]> {
    const teachers = await TeacherModel.find();
    return teachers;
  }

  async getTeacherByNip(nip: number): Promise<Teacher | null> {
    const teacher = await TeacherModel.findOne({ nip });
    return teacher;
  }

  async createTeacher(teacher: Teacher): Promise<Teacher> {
    const newTeacher = new TeacherModel({
      ...teacher,
    });
    await newTeacher.save();
    return newTeacher;
  }

  async updateTeacher(nip: number, teacher: Teacher): Promise<Teacher | null> {
    const updatedTeacher = await TeacherModel.findOneAndUpdate(
      { nip },
      teacher,
      {
        new: true,
        upsert: true,
      },
    );
    return updatedTeacher;
  }

  async deleteTeacher(_id: string): Promise<Teacher | null> {
    const deletedTeacher = await TeacherModel.findOneAndDelete({ _id });
    return deletedTeacher;
  }
}

export const teacherService = new TeacherService();
