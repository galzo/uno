import { FileUID, FileVersionUID } from "../fileIdGenerator/fileIdGeneratorService.types";
import { BaseFileRecord } from "../folderScan/folderScannerService.types";

export interface FileFlatRecord extends BaseFileRecord {
  parentId?: FileUID;
  directChildIds?: FileUID[];
}

export type FolderMapping = Record<FileUID, FileFlatRecord>;
