import { deleteNote } from "../utils/api";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useToastConfig } from "../utils/toastConfig";

export const Card = ({ note, allNotes, setAllNotes }) => {
  const { _id, title, content, caption } = note;
  const toastConfig = useToastConfig();

  const handleDelete = async (id) => {
    try {
      await deleteNote(id);
      const filteredNotes = allNotes.filter((note) => note._id !== id);
      setAllNotes(filteredNotes);
      toast.success("Note deleted successfully", toastConfig);
    } catch (error) {
      console.log(error);
      toast.error("Note deletion failed", toastConfig);
    }
  };

  const handleCardColor = () => {
    const colors = ['bg-primary', 'bg-secondary', 'bg-accent', 'bg-neutral', 'bg-error', 'bg-warning', 'bg-success', 'bg-info'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    return randomColor;
  }

  return (
    <div className="maincontainer">
      <div className="innerContainer">
        <div className={`card ${handleCardColor()} text-primary-content w-[300px] md:w-96`}>
          <div className="card-body">
            <h2 className="card-title">{title}</h2>
            <p>{content}</p>
            <div className="card-actions justify-between mt-3">
              <div className="caption">
                <p>{caption}</p>
              </div>
              <div className="buttons flex gap-3">
                <button
                  className="btn btn-xs btn-outline hover:text-success"
                >
                  <Link to={`/updateNote/${_id}`}>Edit</Link>
                </button>
                <button
                  onClick={() => {
                    handleDelete(_id);
                  }}
                  className="btn btn-xs btn-outline hover:text-error"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
