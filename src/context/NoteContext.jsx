import { createContext, useEffect, useState } from "react";
import Spinner from "../icons/Spinner";
import { db } from "../appwrite/database"; // Ensure db is imported from the correct source

export const NoteContext = createContext();

const NoteProvider = ({ children }) => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedNote, setSelectedNote] = useState(null);

    useEffect(() => {
        init();
    }, []);

    const init = async () => {
        try {
            const response = await db.notes.list();
            setNotes(response.documents);
        } catch (error) {
            console.error("Error fetching notes:", error);
        } finally {
            setLoading(false);
        }
    };

    const contextData = { notes, setNotes, selectedNote, setSelectedNote };

    return (
        <NoteContext.Provider value={contextData}>
            {loading ?    
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100vh",
                    }}
                >
                    <Spinner size="100" />
                </div>
            : children}
        </NoteContext.Provider>
    );
};

export default NoteProvider;