import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type VideoCardProps = {
  url: string;
};

const VideoCard: React.FC<VideoCardProps> = ({ url }) => {
  const [title, setTitle] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");

  function cleanYouTubeUrl(url: string): string {
    const match = url.match(/(?:v=)([a-zA-Z0-9_-]{11})/);
    if (match) {
      return `https://www.youtube.com/watch?v=${match[1]}`;
    }
    return url;
  }

  useEffect(() => {
    const fetchVideoInfo = async () => {
      try {
        const cleanUrl = cleanYouTubeUrl(url);
        const oEmbedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(
          cleanUrl
        )}&format=json`;
        const response = await fetch(oEmbedUrl);
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        setTitle(data.title);
        setThumbnailUrl(data.thumbnail_url);
      } catch {
        setTitle("Titre non disponible");
      }
    };

    fetchVideoInfo();
  }, [url]);

  return (
    <div className="flex flex-col gap-4 ">
      <Link href={url} target="_blank" rel="noopener noreferrer">
        {thumbnailUrl && (
          <div className="object-cover salut">
            <Image src={thumbnailUrl} alt={title} width={300} height={1} />
          </div>
        )}
        <div className="flex w-[300px] salut">
          <p className="font-semibold text-white salut">{title}</p>
        </div>
      </Link>
    </div>
  );
};

export default VideoCard;
