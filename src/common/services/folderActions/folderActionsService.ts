import { WrongActionTypeError } from "../../types/errors";
import { AppConfig } from "../configService/configService.types";
import { FolderMapping, SyncAction } from "../folderDiff/folderDiffService.types";
import { UnoData } from "../unoData/unoDataBuilder.types";
import { UnoStorageService } from "../unoStorage/unoStorageService";
import { unlink, rm } from "fs/promises";

export class FolderActionsService {
  private config: AppConfig;
  private appFolderData: FolderMapping;

  constructor(config: AppConfig, appFolderData: FolderMapping) {
    this.config = config;
    this.appFolderData = appFolderData;
  }

  public performSyncAction = async (action: SyncAction) => {
    switch (action.actionType) {
      case "delete":
        await this.performDeleteAction(action);
        return;
      case "add":
      case "update":
      default:
        throw new Error("Not yet implemented");
    }
  };

  private performDeleteAction = async (action: SyncAction) => {
    if (action.actionType !== "delete") {
      throw new WrongActionTypeError(action, "delete");
    }

    const targetFile = this.resolveFileDetailsForAction(action);
    await rm(targetFile.path);
  };

  private resolveFileDetailsForAction = (action: SyncAction) => {
    return this.appFolderData[action.fileId];
  };
}
