import mongoose from "mongoose";
import School from "@/models/School";

let isConnected = false;

export async function dbConnect() {
  if (isConnected) return;
  
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected");
    isConnected = true;

    // Call the function to insert default schools on startup
    await insertDefaultSchools();
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

async function insertDefaultSchools() {
  const schoolCount = await School.countDocuments();

  if (schoolCount < 2) {
    const defaultSchools = [
      { subdomain: "school1", name: "School One", description: "First school description...", contact: "contact@school1.com" },
      { subdomain: "school2", name: "School Two", description: "Second school description...", contact: "contact@school2.com" }
    ];

    const existingSubdomains = (await School.find()).map(school => school.subdomain);
    
    const schoolsToInsert = defaultSchools.filter(school => !existingSubdomains.includes(school.subdomain));

    if (schoolsToInsert.length > 0) {
      await School.insertMany(schoolsToInsert);
      console.log("Default schools added:", schoolsToInsert);
    }
  }
}
