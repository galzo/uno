import { FileUID } from "../fileIdGenerator/fileIdGeneratorService.types";
import { ScannerFileRecord } from "../folderScan/folderScannerService.types";
import { UnoData } from "../unoData/unoDataBuilder.types";
import { FileFlatRecord, FolderMapping } from "./folderDiffService.types";

export const buildFolderMappingFromData = (data: UnoData) => {
  return data.files.reduce<FolderMapping>((res, file) => {
    return {
      ...res,
      [file.id]: file,
    };
  }, {});
};
