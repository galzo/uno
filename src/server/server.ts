import { Server } from "bun";
import { ConfigService } from "../services/configService/configService";
import { FolderScannerService } from "../services/folderScan/folderScannerService";
import { UnoStorageService } from "../services/unoStorage/unoStorageService";
import { AppConfig } from "../services/configService/configService.types";

/**
 * TODO: move to a proper DI library, such as typedi
 */
export class UnoServer {
  private scannerService: FolderScannerService;
  private storageService: UnoStorageService;
  private server?: Server;

  constructor(config: AppConfig) {
    this.scannerService = new FolderScannerService(config);
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
    const folderData = await this.scannerService.scanAppFolder();
    await this.storageService.storeUnoData(folderData);
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
