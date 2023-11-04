import { Stats } from "fs";
import { readdir, stat } from "fs/promises";
import { isNotJunk } from "junk";
import { buildFileDetails, buildFileUID, buildFileVersionUID } from "./folderScanner.utils";
import { FileDetails } from "./folderScanner.types";

export class FolderScanner {
  constructor() {}

  public scanFolder = async (folderPath: string): Promise<FileDetails[]> => {
    const files: FileDetails[] = [];

    const fileNames = await readdir(folderPath);
    const validFilesNames = fileNames.filter(isNotJunk);

    for (const fileName of validFilesNames) {
      const filePath = `${folderPath}/${fileName}`;
      const fileStats = await stat(filePath);
      const fileDetails = buildFileDetails(fileName, filePath, fileStats);

      const shouldScanAsFolder = fileDetails.isFolder && !fileDetails.isSymlink;
      fileDetails.children = shouldScanAsFolder ? await this.scanFolder(fileDetails.path) : [];

      files.push(fileDetails);
    }

    return files;
  };
}
