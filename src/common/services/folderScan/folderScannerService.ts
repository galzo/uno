import { Stats } from "fs";
import { readdir, stat } from "fs/promises";
import { isJunk, isNotJunk } from "junk";
import { buildScannerFileRecord } from "./folderScannerService.utils";
import { ScannerFileRecord } from "./folderScannerService.types";
import { AppConfig } from "../configService/configService.types";
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

  public scanAppFolder = async (): Promise<ScannerFileRecord[]> => {
    console.log("Scanning app folder data...");
    const rootFolder = this.config.serverDataFolder;
    const folderRecords = await this.scanFolder(rootFolder);
    console.log(`Finished app folder data scanning`);

    return folderRecords;
  };

  private scanFolder = async (folderPath: string): Promise<ScannerFileRecord[]> => {
    const files: ScannerFileRecord[] = [];
    const fileNames = await readdir(folderPath);
    const validFilesNames = fileNames.filter(isNotJunk);

    for (const fileName of validFilesNames) {
      const filePath = `${folderPath}/${fileName}`;

      // Skip processing any hidden files, this includes our very own .uno meta folder
      const isHidden = isHiddenSync(filePath);
      if (isHidden) continue;

      const fileStats = await stat(filePath);
      const fileRecord = buildScannerFileRecord(fileName, filePath, fileStats, this.fileIdService);

      const shouldScanAsFolder = fileRecord.isFolder && !fileRecord.isSymlink;
      fileRecord.children = shouldScanAsFolder ? await this.scanFolder(fileRecord.path) : [];

      files.push(fileRecord);
    }

    return files;
  };
}
