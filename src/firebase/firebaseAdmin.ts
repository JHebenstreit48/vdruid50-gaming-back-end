import "dotenv/config";
import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const projectId = process.env.FB_VDRUID50_PROJECT_ID;
const clientEmail = process.env.FB_VDRUID50_CLIENT_EMAIL;
const rawKey = process.env.FB_VDRUID50_PRIVATE_KEY;

if (!projectId || !clientEmail || !rawKey) {
  throw new Error("Missing Firebase Admin env vars (FB_VDRUID50_*)");
}

const privateKey = rawKey.replace(/\\n/g, "\n");

const app =
  getApps()[0] ||
  initializeApp({
    credential: cert({ projectId, clientEmail, privateKey }),
  });

export const adminDb = getFirestore(app);