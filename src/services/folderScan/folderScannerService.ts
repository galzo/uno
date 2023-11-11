import { Stats } from "fs";
import { readdir, stat } from "fs/promises";
import { isJunk, isNotJunk } from "junk";
import { buildFileDetails } from "./folderScannerService.utils";
import { FileRecord } from "./folderScannerService.types";
import { AppConfig } from "../config/configService.types";
import { isHiddenSync } from "hidefile";
import { CryptoHasher } from "bun";
import { FileIdGeneratorService } from "../fileIdGenerator/fileIdGeneratorService";

export class FolderScannerService {
  private config: AppConfig;
  private fileIdService: FileIdGeneratorService;
  constructor(config: AppConfig) {
    this.config = config;
    this.fileIdService = new FileIdGeneratorService();
  }

  public scanAppFolder = async (): Promise<FileRecord[]> => {
    console.log("scanning folder...");
    const rootFolder = this.config.appFolderLocation;
    const folderRecords = await this.scanFolder(rootFolder);
    console.log(`Finished folder scanning`);

    return folderRecords;
  };

  private scanFolder = async (folderPath: string): Promise<FileRecord[]> => {
    const files: FileRecord[] = [];
    const fileNames = await readdir(folderPath);
    const validFilesNames = fileNames.filter(isNotJunk);

    for (const fileName of validFilesNames) {
      const filePath = `${folderPath}/${fileName}`;

      // Skip processing any hidden files, this includes our very own .uno meta folder
      const isHidden = isHiddenSync(filePath);
      if (isHidden) continue;

      const fileStats = await stat(filePath);
      const fileDetails = buildFileDetails(fileName, filePath, fileStats, this.fileIdService);

      const shouldScanAsFolder = fileDetails.isFolder && !fileDetails.isSymlink;
      fileDetails.children = shouldScanAsFolder ? await this.scanFolder(fileDetails.path) : [];

      files.push(fileDetails);
    }

    console.log(files);
    return files;
  };
}
