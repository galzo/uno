import { FileUID, FileVersionUID } from "../fileIdGenerator/fileIdGeneratorService.types";
import { BaseFileRecord } from "../folderScan/folderScannerService.types";
import { UnoFileRecord } from "../unoData/unoDataBuilder.types";

/**
 * A Flat representation of the entire folder, which maps between file ids
 * and their flat representation
 */
export type FolderMapping = Record<FileUID, UnoFileRecord>;

/**
 * Action to perform in order to sync target folder with source folder
 */
export interface SyncAction {
  fileId: FileUID;
  actionType: SyncActionType;
  treeDepth: number;
}

/**
 * Action type to perform in order to sync target folder with source folder
 */
export type SyncActionType = "add" | "delete" | "update";
