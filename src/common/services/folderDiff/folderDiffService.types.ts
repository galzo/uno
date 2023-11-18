import { FileUID, FileVersionUID } from "../fileIdGenerator/fileIdGeneratorService.types";
import { BaseFileRecord } from "../folderScan/folderScannerService.types";

/**
 * A Flat representation of the entire folder, which maps between file ids
 * and their flat representation
 */
export type FolderMapping = Record<FileUID, FileFlatRecord>;

/**
 * A flat representation of the uno file records.
 * this representation doesn't have references to other file records
 * but rather only ids for the relations to other files
 */
export interface FileFlatRecord extends BaseFileRecord {
  parentId?: FileUID;
  directChildIds?: FileUID[];
}

/**
 * Action to perform in order to sync target folder with source folder
 */
export interface SyncAction {
  fileId: FileUID;
  action: SyncActionType;
}

/**
 * Action type to perform in order to sync target folder with source folder
 */
export type SyncActionType = "add" | "delete" | "update";
