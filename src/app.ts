import { AppConsts } from "./consts/appConsts";
import { UnoServer } from "./server/server";
import { ConfigService } from "./services/configService/configService";
import { writeJsonFile } from "./services/filesStorage/fileStorageService";
import { FolderScannerService } from "./services/folderScan/folderScannerService";
import { UnoStorageService } from "./services/unoStorage/unoStorageService";

const runServer = async () => {
  const configService = await ConfigService.getInstance();
  const server = new UnoServer(configService.config);
  await server.initialize();
};

await runServer();
