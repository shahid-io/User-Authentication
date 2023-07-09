import mongoose from "mongoose";

async function connect() {
  try {
    const mongo = await mongoose.connect(`${process.env.MONGO_URL}user-alpha`);
    console.log(`MongoDB Connected ${mongo.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
}
export default connect;
