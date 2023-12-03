import { SyncAction, SyncActionType } from "../services/folderDiff/folderDiffService.types";

export class WrongActionTypeError extends Error {
  constructor(action: SyncAction, expectedType: SyncActionType) {
    const message = `Invalid type for action. provided action: ${action.actionType}. expected action: ${expectedType}`;
    super(message);

    Object.setPrototypeOf(this, WrongActionTypeError.prototype);
  }
}
