import { hideSync } from "hidefile";
import { exists, mkdir } from "fs/promises";
import { AppConsts } from "../../consts/appConsts";
import { ScannerFileRecord } from "../folderScan/folderScannerService.types";

export const createFolderIfNotExists = async (folderPath: string, isHidden: boolean) => {
  const isFolderExist = await exists(folderPath);
  if (isFolderExist) return;

  await mkdir(folderPath);

  if (isHidden) {
    hideSync(folderPath);
  }
};

export const isUnoDataFileExist = async (folderPath: string) => {
  const dataFilePath = `${folderPath}/${AppConsts.unoDataFile}`;
  return await exists(dataFilePath);
};
