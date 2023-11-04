import { FolderScanner } from "./folderScanner/folderScanner";
console.log("Starting run");

const scanner = new FolderScanner();
const files = await scanner.scanFolder("/Users/galzo/Desktop/testDir");
console.log(files);
