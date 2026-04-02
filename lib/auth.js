import { getData, setData } from "./storage.js";

const USER_KEY = "user";
const LOGGED_IN_KEY = "loggedIn";
const SUBJECTS_KEY = "subjects";
const NOTES_KEY = "notes";

const normalizeString = (value) => (typeof value === "string" ? value.trim() : "");
const normalizeEmail = (value) => normalizeString(value).toLowerCase();

function seedDemoDataForNewUser() {
  try {
    const existingSubjects = getData(SUBJECTS_KEY);
    if (!Array.isArray(existingSubjects) || existingSubjects.length === 0) {
      const now = Date.now();
      const demoSubjects = [
        { id: now + 1, name: "Data Structures", attended: 18, total: 22 },
        { id: now + 2, name: "Database Systems", attended: 15, total: 20 },
        { id: now + 3, name: "Operating Systems", attended: 12, total: 18 },
        { id: now + 4, name: "Computer Networks", attended: 10, total: 14 },
      ];
      setData(SUBJECTS_KEY, demoSubjects);
    }

    const existingNotes = getData(NOTES_KEY);
    if (!Array.isArray(existingNotes) || existingNotes.length === 0) {
      const now = Date.now();
      const demoNotes = [
        {
          id: now + 11,
          title: "DSA Cheat Sheet",
          subject: "Data Structures",
          type: "Notes",
          url: "",
          createdAt: new Date().toISOString(),
        },
        {
          id: now + 12,
          title: "DBMS PYQ 2024",
          subject: "Database Systems",
          type: "PYQ",
          url: "",
          createdAt: new Date().toISOString(),
        },
        {
          id: now + 13,
          title: "OS Process Scheduling Summary",
          subject: "Operating Systems",
          type: "Notes",
          url: "",
          createdAt: new Date().toISOString(),
        },
      ];
      setData(NOTES_KEY, demoNotes);
    }
  } catch {
    // Ignore demo seeding failures to avoid blocking signup.
  }
}

export function signup(name, email, password) {
  try {
    const normalizedName = normalizeString(name);
    const normalizedEmail = normalizeEmail(email);
    const normalizedPassword = normalizeString(password);

    if (!normalizedName || !normalizedEmail || !normalizedPassword) {
      return { success: false, message: "All fields are required." };
    }

    const existingUser = getData(USER_KEY);
    if (
      existingUser &&
      typeof existingUser.email === "string" &&
      existingUser.email.toLowerCase() === normalizedEmail
    ) {
      return { success: false, message: "User with this email already exists." };
    }

    const user = {
      name: normalizedName,
      email: normalizedEmail,
      password: normalizedPassword,
    };

    const stored = setData(USER_KEY, user);
    if (!stored) {
      return { success: false, message: "Unable to create account." };
    }

    // Seed once for fresh accounts without overwriting any existing user data.
    seedDemoDataForNewUser();

    return { success: true, message: "Signup successful.", user };
  } catch {
    return { success: false, message: "Something went wrong during signup." };
  }
}

export function login(email, password) {
  try {
    const normalizedEmail = normalizeEmail(email);
    const normalizedPassword = normalizeString(password);

    if (!normalizedEmail || !normalizedPassword) {
      return { success: false, message: "Email and password are required." };
    }

    const user = getData(USER_KEY);
    if (!user || typeof user !== "object") {
      return { success: false, message: "No account found. Please sign up first." };
    }

    const valid =
      typeof user.email === "string" &&
      typeof user.password === "string" &&
      user.email.toLowerCase() === normalizedEmail &&
      user.password === normalizedPassword;

    if (!valid) {
      return { success: false, message: "Invalid email or password." };
    }

    const session = {
      email: user.email,
      loggedInAt: new Date().toISOString(),
    };

    const stored = setData(LOGGED_IN_KEY, session);
    if (!stored) {
      return { success: false, message: "Unable to create session." };
    }

    return {
      success: true,
      message: "Login successful.",
      user: { name: user.name, email: user.email },
    };
  } catch {
    return { success: false, message: "Something went wrong during login." };
  }
}

export function logout() {
  try {
    if (typeof window === "undefined" || !window.localStorage) {
      return { success: false, message: "Storage not available." };
    }

    window.localStorage.removeItem(LOGGED_IN_KEY);
    return { success: true, message: "Logout successful." };
  } catch {
    return { success: false, message: "Unable to logout." };
  }
}

export function isAuthenticated() {
  try {
    const session = getData(LOGGED_IN_KEY);
    return Boolean(session && typeof session.email === "string" && session.email.trim());
  } catch {
    return false;
  }
}

export function getCurrentUser() {
  try {
    const session = getData(LOGGED_IN_KEY);
    const user = getData(USER_KEY);

    if (!session || !user) return null;
    if (session.email !== user.email) return null;

    return {
      name: typeof user.name === "string" ? user.name : "",
      email: typeof user.email === "string" ? user.email : "",
    };
  } catch {
    return null;
  }
}
