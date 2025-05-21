import { useState } from "react";
import { createNote } from "../utils/api";

export const CreateNote = () => {
  const [noteData, setNoteData] = useState({
    title: "",
    caption: "",
    content: "",
  });

  const handleInputChange = (e) => {
    e.preventDefault();
    setNoteData({
      ...noteData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await createNote(noteData);
    console.log(res);

    if(res.status === 200) {
        setNoteData({
            title: "",
            caption: "",
            content: ""
        });
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
              <form method="dialog" className="w-full">
                <fieldset className="fieldset">
                  <label className="label">Title</label>
                  <input
                    type="text"
                    className="input w-full"
                    placeholder="Title"
                    onChange={handleInputChange}
                  />
                  <label className="label">Caption</label>
                  <input
                    type="text"
                    className="input w-full"
                    placeholder="Caption"
                    onChange={handleInputChange}
                  />
                  <label htmlFor="content">Content</label>
                  <textarea
                    name="content"
                    id="content"
                    className="input h-16 w-full"
                    placeholder="Content"
                    onChange={handleInputChange}
                  ></textarea>
                </fieldset>
                {/* if there is a button in form, it will close the modal */}
                <div className="button flex flex-row justify-between">
                  <button
                    className="btn btn-accent btn-sm font-bold mt-2"
                    onClick={handleSubmit}
                  >
                    Create Note
                  </button>
                  <button className="btn btn-outline btn-sm mt-2">
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
