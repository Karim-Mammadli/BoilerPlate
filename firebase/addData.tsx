import firebase_app from "./config";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const db = getFirestore(firebase_app)
export default async function addData(collection: any, id: any, data: any) {
    let resultInsert = null;
    let errorInsert = null;

    try {
        resultInsert = await setDoc(doc(db, collection, id), data, {
            merge: true,
        });
    } catch (e) {
        errorInsert = e;
    }

    return { resultInsert, errorInsert };
}