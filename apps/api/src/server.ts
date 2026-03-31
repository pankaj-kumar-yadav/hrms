import "dotenv/config";

import { app } from "@/app";
import { logger } from "@/core/Logger";
import { connectDB } from "@/config/db";

const port = Number(process.env.PORT ?? 8080);
const MONGO_URI = process.env.MONGO_URI as string;

const startServer = async () => {
  try {
    await connectDB(MONGO_URI);
    
    app.listen(port);

    logger.info(`API server listening on port ${port}`);
    console.log(`API server listening on port ${port}`);

  } catch (error) {
    console.error("❌ Failed to start server", error);
    process.exit(1);
  }
};

startServer();