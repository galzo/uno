import { FileUID, FileVersionUID } from "../fileIdGenerator/fileIdGeneratorService.types";

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

export interface FileRecord extends BaseFileRecord {
  children?: FileRecord[];
}
