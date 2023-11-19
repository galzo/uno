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
    console.log("Building uno folder data...");
    const unoFileRecords = buildUnoFileRecords(fileRecords);
    const unoDataId = this.fileIdService.generateUnoDataUID(unoFileRecords);
    console.log(`Successfully build uno data`);

    return {
      id: unoDataId,
      files: unoFileRecords,
      createdAt: new Date(Date.now()),
    };
  };
}
