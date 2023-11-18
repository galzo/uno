import { FileUID } from "../fileIdGenerator/fileIdGeneratorService.types";
import { FileRecord } from "../folderScan/folderScannerService.types";
import { FileFlatRecord, FolderMapping } from "./folderDiffService.types";

const _resolveFileChildIds = (file: FileRecord): FileUID[] => {
  if (!file.isFolder || !file.children) return [];
  return file.children.map((childRecord) => childRecord.id);
};

const _buildFileFlatRecord = (fileRecord: FileRecord, parentFolderId?: FileUID): FileFlatRecord => {
  return {
    ...fileRecord,
    parentId: parentFolderId,
    directChildIds: _resolveFileChildIds(fileRecord),
  };
};

const _flattenFileRecords = (fileRecords: FileRecord[], parentFolderId?: FileUID) => {
  const flattenedRecords: FileFlatRecord[] = [];

  for (const file of fileRecords) {
    const flatteneRec = _buildFileFlatRecord(file);
    flattenedRecords.push(flatteneRec);

    if (file.isFolder && file.children) {
      const childRecords = _flattenFileRecords(file.children, file.id);
      flattenedRecords.push(...childRecords);
    }
  }

  return flattenedRecords;
};

export const buildFolderMappingFromRecords = (fileRecords: FileRecord[]) => {
  const flattenedFileRecords = _flattenFileRecords(fileRecords);
  return flattenedFileRecords.reduce<FolderMapping>((res, file) => {
    return {
      ...res,
      [file.id]: file,
    };
  }, {});
};
