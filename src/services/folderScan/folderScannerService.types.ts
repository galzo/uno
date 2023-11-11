import { FileUID, FileVersionUID } from "../fileIdGenerator/fileIdGeneratorService.types";

export interface FolderScanResults {
  files: FileRecord[];
}

export interface FileRecord {
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

  children?: FileRecord[];
}
