import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import cors from "cors";
import { ZodError } from "zod";

import { routes } from "./routes";

const app = express();
app.use(express.json());
app.use(cors());

app.use(routes);

// Validação de errors
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ZodError) {
    return res.status(404).json({
      error: err.message,
    });
  }

  if (err instanceof Error) {
    return res.status(400).json({
      error: err.message,
    });
  }

  return res.status(500).json({
    status: "error",
    message: "Internal server Error.",
  });
});

app.listen(3333, () => console.log("HTTP Server running! 🔥"));
