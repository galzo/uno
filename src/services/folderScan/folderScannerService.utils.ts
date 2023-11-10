import { Stats } from "fs";
import { FileDetails } from "./folderScannerService.types";
import { CryptoHasher } from "bun";
import { FileIdService } from "../fileId/fileIdService";

export const buildFileDetails = (
  fileName: string,
  filePath: string,
  fileStats: Stats,
  fileIdentitifer: FileIdService
): FileDetails => {
  return {
    name: fileName,
    path: filePath,
    isFolder: fileStats.isDirectory(),
    isFile: fileStats.isFile(),
    isSymlink: fileStats.isSymbolicLink(),
    size: fileStats.size,
    versionUID: fileIdentitifer.buildFileVersionUID(fileName, fileStats),
    fileUID: fileIdentitifer.buildFileUID(fileName, filePath, fileStats),
  };
};
