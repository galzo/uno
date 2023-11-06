export interface FileDetails {
  name: string;
  path: string;
  isFolder: boolean;
  isFile: boolean;
  isSymlink: boolean;
  versionUID: string;
  fileUID: string;
  children?: FileDetails[];
}
