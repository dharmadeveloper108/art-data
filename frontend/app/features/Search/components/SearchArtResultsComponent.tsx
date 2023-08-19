import { FC } from "react";
import { Card } from "@/app/components/Card";
import { Artist } from "@/app/types/artist";
import { Artwork } from "@/app/types/artwork";
import { Show } from "@/app/types/show";

interface SearchResultComponent {
  artists?: Artist[];
  artworks?: Artwork[];
  shows?: Show[];
}

export const SearchResultComponent: FC<SearchResultComponent> = ({
  artists,
  artworks,
  shows,
}) => {
  return (
    <div className="grid gap-6 mb-2 md:grid-cols-2">
      <h2>Search results </h2>
      {artists && (
        <>
          <h2>Artists</h2>
          {artists.map((artist: Artist) => (
            <Card
              key={artist.artsyId}
              link={artist.artsyLink}
              title={artist.title}
              description={artist.description ?? undefined}
            />
          ))}
        </>
      )}
      {artworks && (
        <>
          <h2>Artworks</h2>
          {artworks.map((artwork: Artwork) => (
            <Card
              key={artwork.artsyId}
              link={artwork.artsyLink}
              title={artwork.title}
              description={artwork.description ?? undefined}
            />
          ))}
        </>
      )}
      {shows && (
        <>
          <h2>Shows</h2>
          {shows.map((show: Show) => (
            <Card
              key={show.artsyId}
              link={show.artsyLink}
              title={show.title}
              description={show.description ?? undefined}
            />
          ))}
        </>
      )}
    </div>
  );
};
