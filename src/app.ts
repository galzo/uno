import { AppConsts } from "./consts/appConsts";
import { ConfigService } from "./services/config/configService";
import { writeJsonFile } from "./services/filesStorage/fileStorageService";
import { FolderScannerService } from "./services/folderScan/folderScannerService";
import { UnoMetaStorageService } from "./services/unoMetaStorage/unoMetaStorageService";
console.log("Starting run");

const configService = await ConfigService.getInstance();
const scannerService = new FolderScannerService(configService.config);
const storageService = new UnoMetaStorageService(configService.config);

const folderRecords = await scannerService.scanAppFolder();
await storageService.storeUnoFolderRecords(folderRecords);