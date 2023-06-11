import db, { leaderboardTable } from "./database";
import { collection, addDoc } from 'firebase/firestore';

export default async function handler(req, res) {
    if (req.method != 'POST') {
        res.status(400).json();
    }
    if (!req.body) {
        return res.status(400).json({ error: 'No data provided' });
    }

    const docRef = await addDoc(collection(db, leaderboardTable), req.body);

    const documentId = docRef.id;

}
