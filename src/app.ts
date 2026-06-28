import { engine } from "express-handlebars";
import { paths } from "./paths.js";
import router from "./router.js";
import express from "express";

export class App {
	private readonly app = express();

	constructor(public readonly port: number) {
		this.setup();
	}

	private setup(): void {
		this.setupMiddlewares();
		this.app.use("/public", express.static(paths.public));
		this.handlebars();
		this.app.use(router);
	}

	private setupMiddlewares(): void {
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
	}

	private handlebars(): void {
		this.app.engine("handlebars", engine());
		this.app.set("view engine", "handlebars");
		this.app.set("views", paths.views);
	}

	public start(): Promise<void> {
		return new Promise<void>((resolve) => {
			this.app.listen(this.port, () => {
				console.log("Server on:");
				console.log(` Port: ${this.port}`);
				console.log(` URL: http://localhost:${this.port}`);
				resolve();
			});
		});
	}
}
