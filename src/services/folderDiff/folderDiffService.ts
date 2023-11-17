import { Optional } from "../../types/common";
import { BaseFileRecord } from "../folderScan/folderScannerService.types";
import { FileFlatRecord, FolderMapping, SyncAction, SyncActionType } from "./folderDiffService.types";

export const generateFolderSyncActions = (source: FolderMapping, target: FolderMapping) => {
  const upsertActions = _createUpsertActions(source, target);
  const deleteActions = _createDeleteActions(source, target);
  return [...upsertActions, ...deleteActions];
};

const _createUpsertActions = (source: FolderMapping, target: FolderMapping): SyncAction[] => {
  const upsertActions = [];

  for (const file of Object.values(source)) {
    const actionType = _resolveUpsertAction(file, target);
    if (!actionType) continue;

    const action = { fileId: file.id, action: actionType };
    upsertActions.push(action);
  }

  return upsertActions;
};

const _createDeleteActions = (source: FolderMapping, target: FolderMapping): SyncAction[] => {
  const sourceFileIds = Object.keys(source);
  const targetFileIds = Object.keys(target);

  return targetFileIds
    .filter((id) => !sourceFileIds.includes(id))
    .map((idToDelete) => {
      return {
        fileId: idToDelete,
        action: "delete",
      };
    });
};

const _resolveUpsertAction = (file: FileFlatRecord, targetFolder: FolderMapping): Optional<SyncActionType> => {
  const fileInTarget = targetFolder[file.id];

  const shouldCreateFile = !fileInTarget;
  if (shouldCreateFile) return "add";

  const fileVersionsMatch = file.versionId === fileInTarget.versionId;
  return fileVersionsMatch ? null : "update";
};
