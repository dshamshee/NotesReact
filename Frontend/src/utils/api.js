import axios from "axios";
import Cookies from 'js-cookie';

export const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true, // This enables sending cookies with requests
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add request interceptor to include token in headers
api.interceptors.request.use((config) => {
    const token = Cookies.get('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export const nweUser = async (formData) => {
    try {
        const res = await api.post('/user/signup', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return res;
    } catch (error) {
        console.log(error.response.data);
        throw error;
    }
}

export const login = async(formData)=>{
    try {
        const res = await api.post('/user/login', formData)
        return res;
    } catch (error) {
        console.log(error.response.data);
        throw error;
    }
}

export const logout = async () => {
    try {
        const res = await api.get('/user/logout');
        return res;
    } catch (error) {
        console.log(error.response.data);
        throw error;
    }
}

export const getUser = async ()=>{
    try {
        const res = await api.get('/user/get_user');
        return res;
    } catch (error) {
        console.log(error.response.data);
        throw error;
    }
}

// Note API 
export const createNote = async(noteData)=>{
    try {
        const res = await api.post("/note/createNote", noteData);
        return res;
    } catch (error) {
        console.log(error.response?.data);
        throw error;
    }
}

export const getNotes = async()=>{
    try {
        const res = await api.get('/note/allNotes');
        return res;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const updateNote = async(updatedNoteData, id)=>{
    try {
        const res = await api.post(`/note/updateNote/${id}`, updatedNoteData);
        return res;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


export const deleteNote = async(id)=>{
    try {
        const res = await api.get(`note/deleteNote/${id}`)
        return res;
    } catch (error) {
        console.log(error.response?.data);
        throw error;
    }
}