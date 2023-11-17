import { ConfigService } from "../services/configService/configService";
import { FolderScannerService } from "../services/folderScan/folderScannerService";
import { UnoStorageService } from "../services/unoStorage/unoStorageService";

export class UnoServer {
  private configService: ConfigService;
  private scannerService: FolderScannerService;
  private storageService: UnoStorageService;

  constructor(config: ConfigService, folderScanner: FolderScannerService, storage: UnoStorageService) {
    this.configService = config;
    this.scannerService = folderScanner;
    this.storageService = storage;
  }
}

export const initServer = () => {
  console.log("initializing server...");
  const server = Bun.serve({
    fetch: (req) => {
      console.log(req.method);
      return new Response("OK!");
    },
  });

  console.log(server.hostname, server.port);
};
