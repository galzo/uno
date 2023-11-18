import { AppConfig } from "../common/services/configService/configService.types";
import { FolderScannerService } from "../common/services/folderScan/folderScannerService";
import { UnoStorageService } from "../common/services/unoStorage/unoStorageService";

/**
 * TODO: move to a proper DI library, such as typedi
 */
export class UnoClient {
  private scannerService: FolderScannerService;
  private storageService: UnoStorageService;

  constructor(config: AppConfig) {
    this.scannerService = new FolderScannerService(config);
    this.storageService = new UnoStorageService(config);
  }

  public initialize = async () => {
    await this.initializeUnoData();
  };

  private initializeUnoData = async () => {
    const folderData = await this.scannerService.scanAppFolder();
    this.storageService.storeUnoData(folderData);
  };
}
