import { CryptoHasher } from "bun";
import { Stats } from "fs";
import { FileUID, FileVersionUID } from "./fileIdGeneratorService.types";

export class FileIdGeneratorService {
  private cryptoHasher: CryptoHasher;

  constructor() {
    this.cryptoHasher = new CryptoHasher("sha256");
  }

  public buildFileUID = (fileName: string, filePath: string, fileStats: Stats): FileUID => {
    const fileRepr = this._buildFileUniqueRepresentation(fileName, filePath, fileStats);
    return this._hashContent(fileRepr);
  };

  public buildFileVersionUID = (fileName: string, fileStats: Stats): FileVersionUID => {
    const versionRepr = this._buildFileVersionRepresentation(fileName, fileStats);
    return this._hashContent(versionRepr);
  };

  private _hashContent = (content: string) => {
    this.cryptoHasher.update(content);
    return this.cryptoHasher.digest("hex");
  };

  private _buildFileUniqueRepresentation = (fileName: string, filePath: string, fileStats: Stats) => {
    const fileType = fileStats.isDirectory() ? "directory" : "file";
    const isSymlink = fileStats.isSymbolicLink() ? "symlink" : "";
    return `${fileName};${filePath};${fileType};${isSymlink}`;
  };

  private _buildFileVersionRepresentation = (fileName: string, fileStats: Stats) => {
    const createdTime = fileStats.birthtimeMs;
    const updatedTime = fileStats.mtimeMs;
    return `${fileName};${createdTime};${updatedTime}`;
  };
}
