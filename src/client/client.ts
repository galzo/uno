import { AppConfig } from "../common/services/configService/configService.types";
import { FolderScannerService } from "../common/services/folderScan/folderScannerService";
import { UnoDataBuilder } from "../common/services/unoData/unoDataBuilder";
import { UnoStorageService } from "../common/services/unoStorage/unoStorageService";

/**
 * TODO: move to a proper DI library, such as typedi
 */
export class UnoClient {
  private scannerService: FolderScannerService;
  private dataService: UnoDataBuilder;
  private storageService: UnoStorageService;

  constructor(config: AppConfig) {
    this.scannerService = new FolderScannerService(config);
    this.dataService = new UnoDataBuilder();
    this.storageService = new UnoStorageService(config);
  }

  public initialize = async () => {
    await this.initializeUnoData();
  };

  private initializeUnoData = async () => {
    const files = await this.scannerService.scanAppFolder();
    const data = this.dataService.buildUnoData(files);
    await this.storageService.storeUnoData(data);
  };
}
