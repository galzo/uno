import { FileIdGeneratorService } from "../fileIdGenerator/fileIdGeneratorService";
import { ScannerFileRecord } from "../folderScan/folderScannerService.types";
import { UnoData } from "./unoDataBuilder.types";
import { buildUnoFileRecords } from "./unoDataBuilder.utils";

export class UnoDataBuilder {
  private fileIdService: FileIdGeneratorService;

  constructor() {
    this.fileIdService = new FileIdGeneratorService();
  }

  public buildUnoData = (fileRecords: ScannerFileRecord[]): UnoData => {
    const unoFileRecords = buildUnoFileRecords(fileRecords);
    const unoDataId = this.fileIdService.generateUnoDataUID(unoFileRecords);

    return {
      id: unoDataId,
      files: unoFileRecords,
    };
  };
}
