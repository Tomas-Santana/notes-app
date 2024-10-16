import {
  GetNoteRequest,
  GetNoteResponse,
  GetNoteResponseSchema,
} from "@/types/api/GetNote";
import {
  CreateNoteRequest,
  CreateOrUpdateNoteResponseSchema,
  CreateOrUpdateNoteResponse,
  UpdateNoteRequest,
  DeleteNoteRequest,
  DeleteNoteResponse,
  DeleteNoteResponseSchema,
} from "@/types/api/CreateOrUpdateNote";
import { superFetch, SuperFetchError } from "./superFetch";
import { Note } from "@/types/Note";
import { MyNotesResponse, MyNotesResponseSchema } from "@/types/api/MyNotes";

export default class NoteController {
  static async getNote(payload: GetNoteRequest): Promise<GetNoteResponse> {
    const defaultNote: Note = {
      _id: "new",
      title: "",
      isFavorite: false,
      userId: "",
      preview: "",
      html: "",
      content: "",
      categories: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      importance: 0,
    };

    if (payload.id === "new") {
      return {
        note: defaultNote,
      };
    }

    try {
      const res = await superFetch<GetNoteRequest, GetNoteResponse>({
        options: {
          method: "GET",
          includeCredentials: true,
        },
        route: "note/[id]",
        params: [payload.id],
        responseSchema: GetNoteResponseSchema,
      });
      console.log("getNote", res);
      return res;
    } catch (error) {
      console.log(error);
      throw new Error("Get note failed");
    }
  }

  static async createOrUpdateNote({
    payload,
    method = "POST",
  }: {
    payload: CreateNoteRequest | UpdateNoteRequest;
    method?: "POST" | "PUT";
  }): Promise<CreateOrUpdateNoteResponse> {
    console.log(payload);

    try {
      const res = await superFetch<
        CreateNoteRequest | UpdateNoteRequest,
        CreateOrUpdateNoteResponse,
        "note"
      >({
        options: {
          method: method,
          includeCredentials: true,
        },
        route: "note",
        params: [],
        payload: payload,
        responseSchema: CreateOrUpdateNoteResponseSchema,
      });

      return res;
    } catch (error) {
      console.log(error);

      if (error instanceof SuperFetchError) {
        if (error.code === 400) {
          throw new Error("La nota no es válida");
        }
      }

      throw new Error("Falló la creación o actualización de la nota");
    }
  }

  static async deleteNote(
    payload: DeleteNoteRequest
  ): Promise<DeleteNoteResponse> {
    console.log(payload);
    
    try {
      const res = await superFetch<DeleteNoteRequest, DeleteNoteResponse>({
        options: {
          method: "DELETE",
          includeCredentials: true,
        },
        route: "note/[id]",
        params: [payload._id],
        responseSchema: DeleteNoteResponseSchema,
      });
      return res;
    } catch (error) {        
      console.log(error);
      throw new Error("Delete note failed");
    }
  }

  static async myNotes() {
    try {
      const res = await superFetch<undefined, MyNotesResponse>({
        options: {
          method: "GET",
          includeCredentials: true,
        },
        route: "notes",
        params: [],
        responseSchema: MyNotesResponseSchema,
      });
      return res;
    } catch (error) {
      console.log(error);
      throw new Error("Get notes failed");
    }
  }
}
