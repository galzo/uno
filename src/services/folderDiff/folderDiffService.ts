import { BaseFileRecord } from "../folderScan/folderScannerService.types";
import { FileFlatRecord, FolderMapping, SyncAction, SyncActionType } from "./folderDiffService.types";

export const compareFolderMappings = (thisMapping: FolderMapping, targetMapping: FolderMapping) => {
  const upsertActions = Object.values(thisMapping).map((file) => {
    return { id: file.id, action: _resolveSyncAction(file, targetMapping) };
  });
};

const _createUpsertActions = (thisMapping: FolderMapping, targetMapping: FolderMapping): SyncAction[] => {
  const upsertActions = Object.values(thisMapping).map((file) => {
    return { fileId: file.id, action: _resolveSyncAction(file, targetMapping) };
  });

  return upsertActions;
};

const _createDeleteActions = (thisMapping: FolderMapping, targetMapping: FolderMapping): SyncAction[] => {
  const thisFileIds = Object.keys(thisMapping);
  const targetFileIds = Object.keys(targetMapping);

  return [];
};

const _resolveSyncAction = (file: FileFlatRecord, targetMapping: FolderMapping): SyncActionType => {
  const fileInTarget = targetMapping[file.id];

  const shouldCreateFile = !fileInTarget;
  if (shouldCreateFile) return "add";

  const fileVersionsMatch = file.versionId === fileInTarget.versionId;
  return fileVersionsMatch ? "noAction" : "update";
};
