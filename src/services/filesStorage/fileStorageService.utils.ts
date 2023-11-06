/**
 * Validates that the filename ends with .json suffix, and adds it if needed
 */
export const resolveJsonFileName = (fileName: string) => {
  return fileName.endsWith(".json") ? fileName : `${fileName}.json`;
};
