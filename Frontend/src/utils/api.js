import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:3000"
});


export const createNote = async(noteData)=>{
    try {
        const res = await api.post("/note/createNote", noteData);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}