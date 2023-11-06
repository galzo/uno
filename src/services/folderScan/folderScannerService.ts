import { Stats } from "fs";
import { readdir, stat } from "fs/promises";
import { isJunk, isNotJunk } from "junk";
import { buildFileDetails, buildFileUID, buildFileVersionUID } from "./folderScannerService.utils";
import { FileDetails } from "./folderScannerService.types";
import { AppConfig } from "../config/configService.types";
import { isHiddenSync } from "hidefile";

export class FolderScannerService {
  private config: AppConfig;
  constructor(config: AppConfig) {
    this.config = config;
  }

  public scanAppFolder = async (): Promise<FileDetails[]> => {
    console.log("scanning folder...");
    const rootFolder = this.config.appFolderLocation;
    const folderMapping = await this.scanFolder(rootFolder);
    console.log(`Finished folder scanning. found ${folderMapping.length} entities`);

    return folderMapping;
  };

  private scanFolder = async (folderPath: string): Promise<FileDetails[]> => {
    const files: FileDetails[] = [];
    const fileNames = await readdir(folderPath);
    const validFilesNames = fileNames.filter(isNotJunk);

    for (const fileName of validFilesNames) {
      const filePath = `${folderPath}/${fileName}`;

      // Skip processing any hidden files, this includes our very own .uno meta folder
      const isHidden = isHiddenSync(filePath);
      if (isHidden) continue;

      const fileStats = await stat(filePath);
      const fileDetails = buildFileDetails(fileName, filePath, fileStats);

      const shouldScanAsFolder = fileDetails.isFolder && !fileDetails.isSymlink;
      fileDetails.children = shouldScanAsFolder ? await this.scanFolder(fileDetails.path) : [];

      files.push(fileDetails);
    }

    console.log(files);
    return files;
  };
}
