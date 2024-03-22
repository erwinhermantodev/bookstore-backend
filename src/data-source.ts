import "reflect-metadata";
import { DataSource } from "typeorm";
import { Book } from "./entities/Book";
import { Customer } from "./entities/Customer";
import { Order } from "./entities/Order";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "aws-0-ap-southeast-1.pooler.supabase.com",
  port: 5432,
  username: "postgres.idhksanzvgpvecyplzhw",
  password: "0In8huQDbcnefH4r",
  database: "postgres",
  synchronize: true,
  logging: false,
  entities: [Book, Customer, Order],
  migrations: [],
  subscribers: [],
});
