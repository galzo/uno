import { FileUID, UnoDataUID } from "../fileIdGenerator/fileIdGeneratorService.types";
import { BaseFileRecord } from "../folderScan/folderScannerService.types";

export interface UnoFileRecord extends BaseFileRecord {
  parentId?: FileUID;
  directChildIds?: FileUID[];
}

export interface UnoData {
  id: UnoDataUID;
  files: UnoFileRecord[];
  createdAt: Date;
}
