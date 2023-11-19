import { exists, mkdir } from "fs/promises";
import { AppConfig } from "../configService/configService.types";
import { AppConsts } from "../../consts/appConsts";
import { readJsonFile, writeJsonFile } from "../filesStorage/fileStorageService";
import { hideSync } from "hidefile";
import { ScannerFileRecord } from "../folderScan/folderScannerService.types";
import { createFolderIfNotExists, isUnoDataFileExist } from "./unoStorageService.utils";
import { UnoData } from "../unoData/unoDataBuilder.types";
import { Optional } from "../../types/common";
import { UnoDataUID } from "../fileIdGenerator/fileIdGeneratorService.types";

export class UnoStorageService {
  private dataFolderPath: string;
  private backupFolderPath: string;

  constructor(config: AppConfig) {
    const unoFolderPath = `${config.serverDataFolder}/${AppConsts.unoDataFolder}`;
    this.dataFolderPath = unoFolderPath;
    this.backupFolderPath = `${unoFolderPath}/${AppConsts.unoBackupFolder}`;
  }

  public readUnoData = async (): Promise<Optional<UnoData>> => {
    const hasUnoData = await isUnoDataFileExist(this.dataFolderPath);
    return hasUnoData ? await readJsonFile(`${this.dataFolderPath}/${AppConsts.unoDataFile}`) : undefined;
  };

  public shouldUpdateUnoData = async (newData: UnoData): Promise<boolean> => {
    console.log("Checking if data should be updated...");
    const currentData = await this.readUnoData();
    const shouldUpdate = !currentData || currentData.id !== newData.id;
    console.log(`Current data uid: ${currentData?.id ?? ""}. should update: ${shouldUpdate}`);

    return shouldUpdate;
  };

  public storeUnoData = async <T>(data: UnoData): Promise<void> => {
    console.log("Storing folder data...");
    await createFolderIfNotExists(this.dataFolderPath, true);
    await writeJsonFile(this.dataFolderPath, AppConsts.unoDataFile, data);
    console.log("Successfully stored data");
  };
}
