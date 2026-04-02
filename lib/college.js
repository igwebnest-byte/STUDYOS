import { getData, setData } from "./storage.js";

const COLLEGE_KEY = "college";

export function setCollege(name) {
  try {
    const collegeName = typeof name === "string" ? name.trim() : "";
    if (!collegeName) {
      return { success: false, message: "College name is required." };
    }

    const stored = setData(COLLEGE_KEY, collegeName);
    if (!stored) {
      return { success: false, message: "Unable to save college." };
    }

    return { success: true, college: collegeName };
  } catch {
    return { success: false, message: "Unable to save college." };
  }
}

export function getCollege() {
  try {
    const college = getData(COLLEGE_KEY);
    return typeof college === "string" ? college : "";
  } catch {
    return "";
  }
}
