import firebase_app from "./config";
import { getFirestore, doc, updateDoc } from "firebase/firestore";

const db = getFirestore(firebase_app)
export default async function updateData(collection: any, id: any, data: any) {
    let resultUpdate = null;
    let errorUpdate = null;

    try {
        resultUpdate = await updateDoc(doc(db, collection, id), data, {
            merge: true,
        });
    } catch (e) {
        errorUpdate = e;
    }

    return { resultUpdate, errorUpdate };
}