import { model, Schema } from "mongoose";
import { Agama, Gender, type Teacher } from "../types/teacher-type";

const TeacherSchema = new Schema<Teacher>({
  name: {
    type: String,
    required: true,
  },
  nip: {
    type: Number,
    required: true,
    unique: true,
  },
  tempat_lahir: {
    type: String,
    required: true,
  },
  jenis_kelamin: {
    type: String,
    enum: Gender,
    required: true,
  },
  agama: {
    type: String,
    enum: Agama,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

const TeacherModel = model<Teacher>("Teacher", TeacherSchema);

export { TeacherModel };
