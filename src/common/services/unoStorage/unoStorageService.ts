import { exists, mkdir } from "fs/promises";
import { AppConfig } from "../configService/configService.types";
import { AppConsts } from "../../consts/appConsts";
import { readJsonFile, writeJsonFile } from "../filesStorage/fileStorageService";
import { hideSync } from "hidefile";
import { FileRecord } from "../folderScan/folderScannerService.types";
import { createFolderIfNotExists, isUnoDataFileExist } from "./unoStorageService.utils";

export class UnoStorageService {
  private dataFolderPath: string;
  private backupFolderPath: string;

  constructor(config: AppConfig) {
    const unoFolderPath = `${config.serverDataFolder}/${AppConsts.unoDataFolder}`;
    this.dataFolderPath = unoFolderPath;
    this.backupFolderPath = `${unoFolderPath}/${AppConsts.unoBackupFolder}`;
  }

  public readUnoData = async (): Promise<FileRecord[]> => {
    const hasUnoData = await isUnoDataFileExist(this.dataFolderPath);
    return await readJsonFile(`${this.dataFolderPath}/${AppConsts.unoDataFile}`);
  };

  public storeUnoData = async <T>(data: FileRecord[]): Promise<void> => {
    console.log("Storing folder data...");
    await createFolderIfNotExists(this.dataFolderPath, true);
    await writeJsonFile(this.dataFolderPath, AppConsts.unoDataFile, data);
    console.log("Successfully stored data");
  };
}
