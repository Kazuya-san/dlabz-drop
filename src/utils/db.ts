const uri = process.env.MONGODB_URI;
import { connect, Mongoose, MongooseOptions } from "mongoose";

const options: MongooseOptions = {};

declare global {
  var _mongoClientPromise: Promise<Mongoose>;
}

class Singleton {
  static async getInstance() {
    if (!global._mongoClientPromise) {
      global._mongoClientPromise = connect(uri as string, options);
    }
    return global._mongoClientPromise;
  }
}

export const mongoose = Singleton.getInstance();

export default Singleton;
