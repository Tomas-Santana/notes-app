import { GetNoteRequest, GetNoteResponse, GetNoteResponseSchema } from "@/types/api/GetNote";
import { CreateNoteRequest, CreateOrUpdateNoteResponseSchema, CreateOrUpdateNoteResponse, UpdateNoteRequest } from "@/types/api/CreateOrUpdateNote";
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
            createdAt: new Date(),
            updatedAt: new Date(),
        }

        if (payload.id === "new") {
            return {
                note: defaultNote,
            }
        }

        try {
            const res = await superFetch<GetNoteRequest, GetNoteResponse>(
                {
                    options: {
                        method: 'GET',
                        includeCredentials: true,
                    },
                    route: "note/[id]",
                    params: [payload.id],
                    responseSchema: GetNoteResponseSchema,
                }
            );
            console.log("getNote", res);
            return res;
        }
        catch (error) {
            console.log(error);
            throw new Error("Get note failed");
        }
    }

    static async createOrUpdateNote(
        {payload, method = "POST"} : {payload: CreateNoteRequest | UpdateNoteRequest, method?: "POST" | "PUT"}
    ): Promise<CreateOrUpdateNoteResponse> {
            
        try {
            const res = await superFetch<CreateNoteRequest | UpdateNoteRequest, CreateOrUpdateNoteResponse, "note">(
                {
                    options: {
                        method: method,
                        includeCredentials: true,
                    },
                    route: "note",
                    params: [],
                    payload: payload,
                    responseSchema: CreateOrUpdateNoteResponseSchema,
                }
            );

            return res;
        }
        catch (error) {
            console.log(error);

            if (error instanceof SuperFetchError) {
                if (error.code === 400) {
                    throw new Error("La nota no es válida");
                }
            }


            throw new Error("Falló la creación o actualización de la nota");
        }

    }

    static async myNotes() {
        try {
            const res = await superFetch<undefined, MyNotesResponse>(
                {
                    options: {
                        method: 'GET',
                        includeCredentials: true,
                    },
                    route: "notes",
                    params: [],
                    responseSchema: MyNotesResponseSchema,
                }
            );
            return res;
        }
        catch (error) {
            console.log(error);
            throw new Error("Get notes failed");
        }
    }

}