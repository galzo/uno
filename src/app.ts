import { AppConsts } from "./consts/appConsts";
import { ConfigService } from "./services/config/configService";
import { writeJsonFile } from "./services/filesStorage/fileStorageService";
import { FolderScannerService } from "./services/folderScan/folderScannerService";
import { UnoStorageService } from "./services/unoStorage/unoStorageService";

const generateUnoFolderData = async () => {
  console.log("Starting run");
  const configService = await ConfigService.getInstance();
  const scannerService = new FolderScannerService(configService.config);
  const storageService = new UnoStorageService(configService.config);

  const folderData = await scannerService.scanAppFolder();
  await storageService.storeUnoData(folderData);
};
