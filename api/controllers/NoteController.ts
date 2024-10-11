import { GetNoteRequest, GetNoteResponse, GetNoteResponseSchema } from "@/types/api/GetNote";
import { superFetch, SuperFetchError } from "./superFetch";
import { Note } from "@/types/Note";




export default class NoteController {
    static async getNote(payload: GetNoteRequest): Promise<GetNoteResponse> {
        const defaultNote: Note = {
            _id: "",
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

            return res;
        }
        catch (error) {
            console.log(error);
            throw new Error("Get note failed");
        }
    }
}