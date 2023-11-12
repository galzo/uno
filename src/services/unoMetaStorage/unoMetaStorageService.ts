import { exists, mkdir } from "fs/promises";
import { AppConfig } from "../config/configService.types";
import { AppConsts } from "../../consts/appConsts";
import { writeJsonFile } from "../filesStorage/fileStorageService";
import { hideSync } from "hidefile";
import { FolderScannerRecord } from "../folderScan/folderScannerService.types";

export class UnoMetaStorageService {
  private metaFolderPath: string;

  constructor(config: AppConfig) {
    this.metaFolderPath = `${config.appFolderLocation}/${AppConsts.unoMetaFolder}`;
  }

  public storeUnoFolderRecords = async <T>(mapping: FolderScannerRecord[]): Promise<void> => {
    console.log("Storing folder mapping to uno meta...");
    await this.initializeUnoMetaFolder();
    await writeJsonFile(this.metaFolderPath, AppConsts.folderMappingFile, mapping);
    console.log("Successfully stored mapping");
  };

  private initializeUnoMetaFolder = async () => {
    const isFolderExist = await exists(this.metaFolderPath);
    if (isFolderExist) return;

    await mkdir(this.metaFolderPath);
    hideSync(this.metaFolderPath);
  };
}
