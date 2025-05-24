import { useState } from "react";
import { createNote } from "../utils/api";
import { toast } from "react-toastify";
import { useToastConfig } from "../utils/toastConfig";
// import { useNavigate } from "react-router-dom";
export const CreateNote = ({isModalOpen, setIsModalOpen}) => {
  // const navigate = useNavigate();
  const toastConfig = useToastConfig();
  const [noteData, setNoteData] = useState({
    title: "",
    caption: "",
    content: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNoteData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createNote(noteData);
      if (res.status === 200 || res.status === 201) {
        // Clear form after successful creation
        setNoteData({
          title: "",
          caption: "",
          content: "",
        });
        // Close the modal
        document.getElementById("my_modal_1").close();
        isModalOpen ? setIsModalOpen(false) : setIsModalOpen(true);
        toast.success("Note Created Successfully", toastConfig);
        // navigate('/');
      }
    } catch (error) {
      console.error("Error creating note:", error.response?.data || error.message);
      toast.error("Failed to create note", toastConfig);
    }
  };

  // const [title, setTitle] = useState("");
  // const [caption, setCaption] = useState("");
  // const [content, setContent] = useState("");

  // const handleSubmit = (e) => {
  //     e.preventDefault();
  //     const noteData = {
  //         title,
  //         caption,
  //         content
  //     }
  //     console.log(noteData);
  // }

  return (
    <div className="mainContainer">
      <div className="innerContainer">
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg text-center">Welcome to Notify</h3>
            <p className="text-center">
              Create your note to keep track of your thoughts and ideas.
            </p>
            <div className="modal-action">
              <form method="dialog" className="w-full" onSubmit={handleSubmit}>
                <fieldset className="fieldset">
                  <label className="label">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={noteData.title}
                    className="input w-full"
                    placeholder="Title"
                    onChange={handleInputChange}
                  />
                  <label className="label">Caption</label>
                  <input
                    type="text"
                    name="caption"
                    value={noteData.caption}
                    className="input w-full"
                    placeholder="Caption"
                    onChange={handleInputChange}
                  />
                  <label htmlFor="content">Content</label>
                  <textarea
                    name="content"
                    id="content"
                    value={noteData.content}
                    className="input h-16 w-full"
                    placeholder="Content"
                    onChange={handleInputChange}
                  ></textarea>
                </fieldset>
                <div className="button flex flex-row justify-between">
                  <button
                    type="submit"
                    className="btn btn-accent btn-sm font-bold mt-2"
                  >
                    Create Note
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline btn-sm mt-2"
                    onClick={() => document.getElementById("my_modal_1").close()}
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};
