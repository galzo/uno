import { Stats } from "fs";
import { FileDetails } from "./folderScanner.types";

export const buildFileVersionUID = (stats: Stats) => {
  const createdTime = stats.birthtimeMs;
  const updatedTime = stats.mtimeMs;
  return `created-${createdTime};updated-${updatedTime}`;
};

export const buildFileUID = (name: string, versionUID: string, stats: Stats) => {
  return `name-${name};version-${versionUID};size-${stats.size}`;
};

export const buildFileDetails = (fileName: string, filePath: string, fileStats: Stats): FileDetails => {
  const versionUID = buildFileVersionUID(fileStats);
  const fileUID = buildFileUID(fileName, versionUID, fileStats);

  return {
    name: fileName,
    path: filePath,
    isFolder: fileStats.isDirectory(),
    isFile: fileStats.isFile(),
    isSymlink: fileStats.isSymbolicLink(),
    versionUID: versionUID,
    fileUID: fileUID,
  };
};
