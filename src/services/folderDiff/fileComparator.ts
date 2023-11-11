import { FileUID } from "../fileIdGenerator/fileIdGeneratorService.types";
import { BaseFileRecord, FileRecord } from "../folderScan/folderScannerService.types";

export class FileComparator {
  private files: FileRecord[];
  private filesMapping: Record<FileUID, BaseFileRecord>;

  constructor(files: FileRecord[]) {
    this.files = files;
  }

  private buildSpreadFileMapping = (files: FileRecord[]) => {
    const filesMap = {};
    for (const file of files) {
    }
  };
}
