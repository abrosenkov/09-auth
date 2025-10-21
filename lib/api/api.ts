import { Note, NoteTag } from "@/types/note";
import axios from "axios";


interface NotesApiResponse {
  notes: Note[];
  totalPages: number;
}

export interface NewNote {
  title: string;
  content?: string;
  tag: NoteTag;
}

export type RegisterRequest = {
  email: string;
  password: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type User = {
  username: string;
  email: string;
  avatar: string;
};

type CheckSessionRequest = {
  success: boolean;
};

// const API_TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

// If NEXT_PUBLIC_API_URL is not set (for local dev), fall back to the Next.js proxy at /api
const baseURL = process.env.NEXT_PUBLIC_API_URL
  ? `${process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, '')}/api`
  : '/api';

export const nextServer = axios.create({
 baseURL,
  withCredentials: true,
});

export const register = async (body: RegisterRequest) =>  {
  const response = await nextServer.post<User>("/auth/register", body);
  return response.data;
};

export const login = async (body: LoginRequest) => {
    const response = await nextServer.post<User>("/auth/login", body);
    return response.data;
}

export const checkSession = async () => {
  const response = await nextServer.get<CheckSessionRequest>('/auth/session');
  return response.data.success;
};

export const getMe = async () => {
  const response = await nextServer.get<User>('/users/me');
  return response.data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post('/auth/logout')
};

export const fetchNotes = async (
  search: string,
  page: number,
  tag?: string
): Promise<NotesApiResponse> => {
  const response = await nextServer.get<NotesApiResponse>("/notes", {
    params: {
      search,
      page,
      tag,
    },
  });
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await nextServer.get<Note>(`/notes/${id}`);
  return response.data;
};

export const createNote = async (note: NewNote): Promise<Note> => {
  const response = await nextServer.post<Note>("/notes", note);
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await nextServer.delete<Note>(`/notes/${id}`);
  return response.data;
};
