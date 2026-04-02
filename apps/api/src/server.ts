import "dotenv/config";

import { app } from "@/app";
import { mongoURI, port } from "@/config";
import { connectDB } from "@/database/db";
import { LoggerService } from "@/core/Logger";

const startServer = async () => {
  try {
    await connectDB(mongoURI);

    app.listen(port);

    LoggerService.info(`API server listening on port ${port}`);
    console.log(`API server listening on port ${port}`);

  } catch (error) {
    console.error("❌ Failed to start server", error);
    process.exit(1);
  }
};

startServer();