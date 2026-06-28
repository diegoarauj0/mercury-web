import "reflect-metadata";
import "./config/dotenv.config.js";
import "./container.js";
import { connectMongoose } from "./database/mongodb.database.js";
import { env } from "./env.js";
import { App } from "./app.js";

const app = new App(env.PORT);

async function setup() {
	await connectMongoose();
	await app.start();
}

setup();
