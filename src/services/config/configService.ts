import { AppConsts } from "../../consts/appConsts";
import { readJsonFile } from "../filesStorage/fileStorageService";
import { AppConfig } from "./configService.types";

export class ConfigService {
  public config: AppConfig;
  private static instance: ConfigService;

  constructor(config: AppConfig) {
    this.config = config;
  }

  public static async getInstance(): Promise<ConfigService> {
    const isInitialized = Boolean(ConfigService.instance);
    return isInitialized ? ConfigService.instance : await ConfigService.initializeInstance();
  }

  private static async initializeInstance() {
    const config = await readJsonFile<AppConfig>(`./${AppConsts.appConfigFile}`);
    const serviceInstance = new ConfigService(config);
    ConfigService.instance = serviceInstance;

    return serviceInstance;
  }
}
