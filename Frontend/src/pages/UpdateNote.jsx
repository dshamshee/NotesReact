import { useState } from "react";
import { updateNote } from "../utils/api";
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useToastConfig } from "../utils/toastConfig";

export const UpdateNote = () => {
  const navigate = useNavigate();
  const note = useLoaderData();
  const toastConfig = useToastConfig();
  const [updatedNote, setUpdatedNote] = useState({
    title: note.data.note.title,
    caption: note.data.note.caption,
    content: note.data.note.content,
  });

  const handleInputChange = (e) => {
    e.preventDefault();
    setUpdatedNote({ ...updatedNote, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateNote(updatedNote, note.data.note._id);
      toast.success("Note updated successfully", toastConfig);
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Note update failed", toastConfig);
    }
  }

  return (
    <div className="mainContainer w-full flex justify-center items-center">
      <div className="innerContainer w-[40%] mx-auto p-3 ">
        
          <div className="">
            <h3 className="font-bold text-lg text-center">Welcome to Notify</h3>
             <p className="text-center">
               Update your note to keep track of your thoughts and ideas.
             </p>
            <div className="">
              <form  className="w-full" onSubmit={handleSubmit}>
                
                   <label className="label">Title</label>
                   <input
                     type="text"
                     name="title"
                     value={updatedNote.title}
                     className="input w-full"
                     placeholder="Title"
                     onChange={handleInputChange}
                   />
                   <label className="label">Caption</label>
                   <input
                     type="text"
                     name="caption"
                     value={updatedNote.caption}
                     className="input w-full"
                     placeholder="Caption"
                     onChange={handleInputChange}
                   />
                   <label htmlFor="content">Content</label>
                   <textarea
                     name="content"
                     id="content"
                     value={updatedNote.content}
                     className="input h-16 w-full"
                     placeholder="Content"
                     onChange={handleInputChange}
                   ></textarea>
                
                <div className="button flex flex-row justify-between">
                  <button
                    type="submit"
                    className="btn btn-accent btn-sm font-bold mt-2"
                  >
                    Update Note
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline btn-sm mt-2"
                    onClick={() => navigate("/")}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        
      </div>
    </div>
  );
};
