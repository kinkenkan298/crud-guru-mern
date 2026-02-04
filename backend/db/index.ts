import mongoose from "mongoose";

const DATABASE_URI =
  "mongodb+srv://dbuser11:Hq4R92Irwrd5EgGI@crud-guru.17if2si.mongodb.net/crud-guru";

export const db = async () => {
  try {
    await mongoose.connect(DATABASE_URI);
    console.log("Database connected");
  } catch (error) {
    console.error("Database connection failed", error);
  }
};
