const mongoose = require("mongoose");

async function connectionDB() {
  try {
    console.log("DATABASE CONNECTION REQUEST");
    const options = {};
    await mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.DB, options);
    console.log("DATABASE CONNECTION SUCCESSFUL");
  } catch (error) {
    console.log(error);
  }
}

connectionDB();
