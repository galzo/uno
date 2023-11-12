import { FileUID, FileVersionUID } from "../fileIdGenerator/fileIdGeneratorService.types";
import { BaseFileRecord } from "../folderScan/folderScannerService.types";

export interface FileMappingRecord extends BaseFileRecord {
  parentId?: FileUID;
  directChildIds?: FileUID[];
}
