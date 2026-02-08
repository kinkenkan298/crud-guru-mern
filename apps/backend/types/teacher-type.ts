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
  KONGHUCU = "KONGHUCU",
}
