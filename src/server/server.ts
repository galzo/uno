import { Server } from "bun";
import { ConfigService } from "../common/services/configService/configService";
import { FolderScannerService } from "../common/services/folderScan/folderScannerService";
import { UnoStorageService } from "../common/services/unoStorage/unoStorageService";
import { AppConfig } from "../common/services/configService/configService.types";
import { UnoDataBuilder } from "../common/services/unoData/unoDataBuilder";

/**
 * TODO: move to a proper DI library, such as typedi
 */
export class UnoServer {
  private scannerService: FolderScannerService;
  private dataService: UnoDataBuilder;
  private storageService: UnoStorageService;
  private server?: Server;

  constructor(config: AppConfig) {
    this.scannerService = new FolderScannerService(config);
    this.dataService = new UnoDataBuilder();
    this.storageService = new UnoStorageService(config);
  }

  public initialize = async () => {
    await this.initializeUnoData();
    this.server = this.initializeServer();
  };

  public stop = () => {
    this.server?.stop();
  };

  private initializeUnoData = async () => {
    const files = await this.scannerService.scanAppFolder();
    const data = this.dataService.buildUnoData(files);
    await this.storageService.storeUnoData(data);
  };

  private initializeServer = (): Server => {
    console.log("Initializing server...");
    const server = Bun.serve({
      fetch: (req) => {
        return new Response("OK");
      },
    });
    console.log(`Server up: ${server.hostname}:${server.port}`);

    return server;
  };
}
