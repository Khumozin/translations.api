import cors from 'cors';
import * as dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';

import { Translation } from './translation';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// routes
app.get("/", (req: Request, res: Response) => {
  return res.send({
    Message: "Translations API!",
  });
});

app.get("/translation/:locale", async (req: Request, res: Response) => {
  const Locale = req.params.locale;

  const translations = await Translation.find({ Locale });

  return res.send(translations);
});

const start = async () => {
  const DB_CONNECTION =
    process.env.DB_CONNECTION || "mongodb://localhost:27017/translations_db";
  const PORT = process.env.PORT || 3000;

  try {
    await mongoose.connect(DB_CONNECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      });

    console.log("Connected to DB! ✅");
  } catch (error) {
    console.error(error);
  }

  app.listen(PORT, () => console.log(`API listening on port ${PORT}!`));
};

start();
