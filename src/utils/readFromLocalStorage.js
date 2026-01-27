export function readFromLocalStorage(key, checkLSValid) {
  try {
    const dataFromLS = localStorage.getItem(key);
    if (!dataFromLS) return null;
    else {
      const dataJSON = JSON.parse(dataFromLS);
      if (checkLSValid && !checkLSValid(dataJSON)) {
        throw new Error("Invalid localStorage format");
      }
      return dataJSON;
    }
  } catch {
    console.warn(
      `Failed to parse ${key} from localStorage. Resetting to default.`,
    );
    localStorage.removeItem(key);
    return null;
  }
}
