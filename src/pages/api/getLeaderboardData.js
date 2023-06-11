import db, { leaderboardTable } from "./database";
import { collection, getDocs } from 'firebase/firestore';

export default async function handler(req, res) {
    try {
        const querySnapshot = await getDocs(collection(db, leaderboardTable));
        const documents = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));

        if (documents.length < 1) {
            res.status(200).json([]);
        } else {
            res.status(200).json(documents);
        }
    } catch (error) {
        console.error('Errore durante il recupero dei documenti:', error);
        res.status(500).json({ error: 'Errore durante il recupero dei documenti' });
    }
}