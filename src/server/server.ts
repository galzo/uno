import { Server } from "bun";
import { ConfigService } from "../services/configService/configService";
import { FolderScannerService } from "../services/folderScan/folderScannerService";
import { UnoStorageService } from "../services/unoStorage/unoStorageService";

export class UnoServer {
  private configService: ConfigService;
  private scannerService: FolderScannerService;
  private storageService: UnoStorageService;
  private server?: Server;

  constructor(config: ConfigService, folderScanner: FolderScannerService, storage: UnoStorageService) {
    this.configService = config;
    this.scannerService = folderScanner;
    this.storageService = storage;
  }

  public initialize = async () => {
    await this.initializeUnoData();
    this.server = this.initializeServer();
  };

  public stop = () => {
    this.server?.stop();
  };

  private initializeUnoData = async () => {
    console.log("Scanning folder...");
    const folderData = await this.scannerService.scanAppFolder();
    await this.storageService.storeUnoData(folderData);
    console.log("Scan complete. database setup");
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
