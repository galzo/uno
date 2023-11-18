import { resolveJsonFileName } from "./fileStorageService.utils";

export const readJsonFile = async <T>(path: string): Promise<T> => {
  const file = Bun.file(path);
  return await file.json();
};

export const writeJsonFile = async <T>(path: string, fileName: string, data: T): Promise<void> => {
  const filePath = `${path}/${resolveJsonFileName(fileName)}`;
  await Bun.write(filePath, JSON.stringify(data));
};