import { Stats } from "fs";
import { FileRecord } from "./folderScannerService.types";
import { CryptoHasher } from "bun";
import { FileIdGeneratorService } from "../fileIdGenerator/fileIdGeneratorService";

export const buildFileRecord = (
  name: string,
  path: string,
  stats: Stats,
  idGenerator: FileIdGeneratorService
): FileRecord => {
  return {
    name: name,
    path: path,
    isFolder: stats.isDirectory(),
    isFile: stats.isFile(),
    isSymlink: stats.isSymbolicLink(),
    size: stats.size,
    versionId: idGenerator.generateFileVersionUID(name, stats),
    id: idGenerator.generateFileUID(name, path, stats),
    createdDate: stats.birthtime,
    updatedDate: stats.mtime,
  };
};
