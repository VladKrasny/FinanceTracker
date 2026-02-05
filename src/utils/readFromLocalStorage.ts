export function readFromLocalStorage<T>(
  key: string,
  checkLSValid: (value: unknown) => value is T,
): T | null {
  try {
    const dataFromLS = localStorage.getItem(key);
    if (!dataFromLS) return null;
    const dataJSON: unknown = JSON.parse(dataFromLS);
    if (!checkLSValid(dataJSON)) {
      throw new Error("Invalid localStorage format");
    }
    return dataJSON;
  } catch {
    console.warn(
      `Failed to parse ${key} from localStorage. Resetting to default.`,
    );
    localStorage.removeItem(key);
    return null;
  }
}
