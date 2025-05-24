import { useEffect, useState } from "react";
import { Card } from "./Card";
import { getNotes } from "../utils/api";
import { CreateNote } from "./CreateNote";
import { toast } from "react-toastify";

export const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true);
        const res = await getNotes();
        setNotes(res?.data?.notes || []);
      } catch (error) {
        console.error("Error fetching notes:", error);
        setError(error.message);
        setNotes([]);
        toast.error("Error fetching notes");
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, [isModalOpen]);

  if (loading) {
    return <div className="text-center mt-8">Loading notes...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-error">Error: {error}</div>;
  }

  return (
    <div className="mainContainer">
      <CreateNote isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <h1 className="text-center text-2xl text-primary font-semibold font-serif">
        Dashboard
      </h1>
      <div className="innerContainer w-[90%] mx-auto p-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.isArray(notes) && notes.length > 0 ? (
          notes.map((note) => <Card note={note} key={note._id} allNotes={notes} setAllNotes={setNotes} /> )
        ) : (
          <p className="text-center col-span-3">No notes found. Create your first note!</p>
        )}
      </div>
    </div>
  );
};
