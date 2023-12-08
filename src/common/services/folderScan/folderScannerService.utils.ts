import { Stats } from "fs";
import { ScannerFileRecord } from "./folderScannerService.types";
import { CryptoHasher } from "bun";
import { FileIdGeneratorService } from "../fileIdGenerator/fileIdGeneratorService";
import { FileUID } from "../fileIdGenerator/fileIdGeneratorService.types";

export const buildScannerFileRecord = (
  name: string,
  path: string,
  stats: Stats,
  depth: number,
  idGenerator: FileIdGeneratorService
): ScannerFileRecord => {
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
    treeDepth: depth,
  };
};
