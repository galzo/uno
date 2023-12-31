import { Server } from "bun";
import { ConfigService } from "../common/services/configService/configService";
import { FolderScannerService } from "../common/services/folderScan/folderScannerService";
import { UnoStorageService } from "../common/services/unoStorage/unoStorageService";
import { AppConfig } from "../common/services/configService/configService.types";
import { UnoDataBuilder } from "../common/services/unoData/unoDataBuilder";
import express, { Application } from "express";

/**
 * TODO: move to a proper DI library, such as typedi
 */
export class UnoServer {
  private server: Application;

  private scannerService: FolderScannerService;
  private dataService: UnoDataBuilder;
  private storageService: UnoStorageService;

  constructor(config: AppConfig) {
    this.scannerService = new FolderScannerService(config);
    this.dataService = new UnoDataBuilder();
    this.storageService = new UnoStorageService(config);
    this.server = express();
  }

  public initialize = async () => {
    await this.initializeUnoData();
  };

  public stop = () => {};

  private initializeUnoData = async () => {
    const files = await this.scannerService.scanAppFolder();
    const data = this.dataService.buildUnoData(files);

    const shouldUpdate = await this.storageService.shouldUpdateUnoData(data);
    if (!shouldUpdate) return;

    await this.storageService.storeUnoData(data);
  };

  private initializeServer = () => {
    // console.log("Initializing server...");
    // const server = Bun.serve({
    //   fetch: router,
    // });
    // console.log(`Server up: ${server.hostname}:${server.port}`);
    // return server;
  };
}
