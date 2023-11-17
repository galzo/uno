import { exists, mkdir } from "fs/promises";
import { AppConfig } from "../config/configService.types";
import { AppConsts } from "../../consts/appConsts";
import { writeJsonFile } from "../filesStorage/fileStorageService";
import { hideSync } from "hidefile";
import { FileRecord } from "../folderScan/folderScannerService.types";

export class UnoStorageService {
  private unoFolderPath: string;

  constructor(config: AppConfig) {
    this.unoFolderPath = `${config.appFolderLocation}/${AppConsts.unoMetaFolder}`;
  }

  public storeUnoData = async <T>(mapping: FileRecord[]): Promise<void> => {
    console.log("Storing folder mapping to uno meta...");
    await this.initializeUnoFolder();
    await writeJsonFile(this.unoFolderPath, AppConsts.folderMappingFile, mapping);
    console.log("Successfully stored mapping");
  };

  private initializeUnoFolder = async () => {
    const isFolderExist = await exists(this.unoFolderPath);
    if (isFolderExist) return;

    await mkdir(this.unoFolderPath);
    hideSync(this.unoFolderPath);
  };
}
