import { AppConsts } from "./common/consts/appConsts";
import { UnoServer } from "./server/server";
import { ConfigService } from "./common/services/configService/configService";
import { writeJsonFile } from "./common/services/filesStorage/fileStorageService";
import { FolderScannerService } from "./common/services/folderScan/folderScannerService";
import { UnoStorageService } from "./common/services/unoStorage/unoStorageService";

const runServer = async () => {
  const configService = await ConfigService.getInstance();
  const server = new UnoServer(configService.config);
  await server.initialize();
};

await runServer();
