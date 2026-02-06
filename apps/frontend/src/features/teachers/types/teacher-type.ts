import { z } from "zod";

export interface Teacher {
  nip: number;
  name: string;
  email: string;

  tempat_lahir: string;
  jenis_kelamin: Gender;
  agama: Agama;
}
export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
}
export enum Agama {
  ISLAM = "ISLAM",
  KRISTEN = "KRISTEN",
  HINDU = "HINDU",
  KATOLIK = "KATOLIK",
  BUDDHA = "BUDDHA",
}

export const teacherSchema = z.object({
  nip: z
    .string({ error: "NIP Tidak valid" })
    .length(6, { error: "NIP harus 6 angka" }),
  name: z.string({
    error: "Wajib menggunakan huruf",
  }),
  email: z.email("Email tidak valid"),
  tempat_lahir: z.string(),
  jenis_kelamin: z.enum(Gender),
  agama: z.enum(Agama),
});

export type TeacherSchema = z.infer<typeof teacherSchema>;
