import { Artist } from "@/app/types/artist";
import { Artwork } from "@/app/types/artwork";
import { Show } from "@/app/types/show";

export type SearchResult = {
    artists: Artist[];
    artwork: Artwork[];
    shows: Show[];
};
