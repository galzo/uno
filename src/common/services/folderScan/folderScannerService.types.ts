import { FileUID, FileVersionUID, UnoDataUID } from "../fileIdGenerator/fileIdGeneratorService.types";

export interface BaseFileRecord {
  id: FileUID;
  versionId: FileVersionUID;
  name: string;
  path: string;
  isFolder: boolean;
  isFile: boolean;
  isSymlink: boolean;
  size: number;
  createdDate: Date;
  updatedDate: Date;
}

export interface ScannerFileRecord extends BaseFileRecord {
  children?: ScannerFileRecord[];
}
