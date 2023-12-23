import { Router, Request, Response } from "express";
import { FolderScannerService } from "../common/services/folderScan/folderScannerService";
import { UnoDataBuilder } from "../common/services/unoData/unoDataBuilder";
import { UnoStorageService } from "../common/services/unoStorage/unoStorageService";
import { AppConfig } from "../common/services/configService/configService.types";

export class UnoRouter {
  private router: Router;
  private scannerService: FolderScannerService;
  private dataService: UnoDataBuilder;
  private storageService: UnoStorageService;

  constructor(config: AppConfig) {
    this.router = Router();
    this.scannerService = new FolderScannerService(config);
    this.dataService = new UnoDataBuilder();
    this.storageService = new UnoStorageService(config);
  }

  public initializeRoutes = () => {
    this.router.get("/mapping", this.getMapping);
  };

  private getMapping = (request: Request, response: Response) => {
    this.storageService.readUnoData();
  };
}
