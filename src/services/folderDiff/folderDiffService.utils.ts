import { FileUID } from "../fileIdGenerator/fileIdGeneratorService.types";
import { FolderScannerRecord } from "../folderScan/folderScannerService.types";
import { FileMappingRecord } from "./folderDiffService.types";

const resolveRecordChildIds = (record: FolderScannerRecord) => {
  if (!record.isFolder || !record.children) return [];

  return record.children.map((childRecord) => childRecord.id);
};

const buildFileMappingRecord = (fileRecord: FolderScannerRecord, parentFolderId?: FileUID): FileMappingRecord => {
  return {
    ...fileRecord,
    parentId: parentFolderId,
    directChildIds: resolveRecordChildIds(fileRecord),
  };
};

export const buildSpreadFolderMapping = (folderRecords: FolderScannerRecord[], parentFolderId?: FileUID) => {
  const mappingRecords: FileMappingRecord[] = [];

  for (const fileRecord of folderRecords) {
    const mappingRecord = buildFileMappingRecord(fileRecord);
    mappingRecords.push(mappingRecord);

    if (fileRecord.isFolder && fileRecord.children) {
      const childRecords = buildSpreadFolderMapping(fileRecord.children, fileRecord.id);
      mappingRecords.push(...childRecords);
    }
  }

  return mappingRecords;
};
