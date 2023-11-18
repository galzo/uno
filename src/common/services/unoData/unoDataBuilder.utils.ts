import { FileUID } from "../fileIdGenerator/fileIdGeneratorService.types";
import { ScannerFileRecord } from "../folderScan/folderScannerService.types";
import { UnoFileRecord } from "./unoDataBuilder.types";

export const buildUnoFileRecords = (scannerfileRecords: ScannerFileRecord[]) => {
  const unoFileRecords = _flattenFileRecords(scannerfileRecords);
  return unoFileRecords;
};

const _resolveFileChildIds = (file: ScannerFileRecord): FileUID[] => {
  if (!file.isFolder || !file.children) return [];
  return file.children.map((childRecord) => childRecord.id);
};

const _buildUnoFileRecord = (fileRecord: ScannerFileRecord, parentFolderId?: FileUID): UnoFileRecord => {
  return {
    ...fileRecord,
    parentId: parentFolderId,
    directChildIds: _resolveFileChildIds(fileRecord),
  };
};

const _flattenFileRecords = (fileRecords: ScannerFileRecord[], parentFolderId?: FileUID) => {
  const flattenedRecords: UnoFileRecord[] = [];

  for (const file of fileRecords) {
    const flatteneRec = _buildUnoFileRecord(file, parentFolderId);
    flattenedRecords.push(flatteneRec);

    if (file.isFolder && file.children) {
      const childRecords = _flattenFileRecords(file.children, file.id);
      flattenedRecords.push(...childRecords);
    }
  }

  return flattenedRecords;
};
