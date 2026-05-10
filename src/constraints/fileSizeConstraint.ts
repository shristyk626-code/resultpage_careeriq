export const MAX_FILE_SIZE_BYTES = 25 * 1024 * 1024; // 25MB

export function checkFileSizeConstraint(textData: string): boolean {
  if (new Blob([textData]).size > MAX_FILE_SIZE_BYTES) {
    throw new Error("file size must be smaller than 25mb");
  }
  return true;
}
