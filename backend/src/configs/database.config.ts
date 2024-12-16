import { connect, ConnectOptions } from "mongoose";
const dbName = "foodmine";
const options: ConnectOptions = {
  dbName,
  maxPoolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4, // Use IPv4, skip trying IPv6
};

// db connection
export const dbConnect = async function dbConnect() {
  try {
    await connect(process.env.MONGO_URI!, options);
    console.log("Connect successfully");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
