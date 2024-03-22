import { getConnection, ConnectionNotFoundError } from "typeorm";
import { AppDataSource } from "./data-source";

export const initializeDatabaseConnection = async (): Promise<void> => {
  try {
    console.log("====================================");
    console.log("getConnection");
    console.log("====================================");
    getConnection(); // Try to get the default connection
  } catch (error) {
    if (error instanceof ConnectionNotFoundError) {
      console.log("====================================");
      console.log("AppDataSource.initialize()");
      console.log("====================================");
      await AppDataSource.initialize();
    } else {
      throw error; // Rethrow other errors
    }
  }
};
