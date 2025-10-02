import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type VideoCardProps = {
  url: string;
};

const VideoCard: React.FC<VideoCardProps> = ({ url }) => {
  const [title, setTitle] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  function cleanYouTubeUrl(url: string): string {
    const match = url.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    if (match) {
      return `https://www.youtube.com/watch?v=${match[1]}`;
    }
    return url;
  }

  function extractFileName(url: string): string {
    try {
      const urlObj = new URL(url);
      const pathname = urlObj.pathname;
      const fileNameWithExt = pathname.substring(pathname.lastIndexOf("/") + 1);
      const fileName = fileNameWithExt.split(".")[0];
      return fileName;
    } catch {
      return "Vidéo S3";
    }
  }

  useEffect(() => {
    const fetchVideoInfo = async () => {
      try {
        if (url.includes("amazonaws.com")) {
          // Fetch signed URL and metadata from API
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/getVideoUrl`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ url }),
            }
          );
          if (!response.ok) throw new Error("Failed to fetch S3 video info");
          const data = await response.json();
          setVideoUrl(data.signedUrl);
          setTitle(extractFileName(url));
          setThumbnailUrl(data.thumbnailUrl || "");
        } else if (url.includes("youtube.com") || url.includes("youtu.be")) {
          const cleanUrl = cleanYouTubeUrl(url);
          const oEmbedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(
            cleanUrl
          )}&format=json`;
          const response = await fetch(oEmbedUrl);
          if (!response.ok) throw new Error("Failed to fetch YouTube info");
          const data = await response.json();
          setTitle(data.title);
          setThumbnailUrl(data.thumbnail_url);
          setVideoUrl(cleanUrl);
        } else {
          setTitle("Titre non disponible");
          setThumbnailUrl("");
          setVideoUrl(url);
        }
      } catch {
        setTitle("Titre non disponible");
        setThumbnailUrl("");
        setVideoUrl(url);
      }
    };

    fetchVideoInfo();
  }, [url]);

  if (url.includes("amazonaws.com")) {
    return (
      <div className="flex flex-col gap-4 h-[300px]">
        {videoUrl ? (
          <video
            src={videoUrl}
            controls
            width={300}
            height={225}
            poster={thumbnailUrl || undefined}
          />
        ) : (
          <p>Chargement de la vidéo...</p>
        )}
        <p className="font-semibold text-white w-[300px]">{title}</p>
      </div>
    );
  }

  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    return (
      <div className="flex flex-col gap-4">
        <Link href={videoUrl} target="_blank" rel="noopener noreferrer">
          {thumbnailUrl && (
            <div className="object-cover">
              <Image src={thumbnailUrl} alt={title} width={300} height={1} />
            </div>
          )}
          <div className="flex w-[300px]">
            <p className="font-semibold text-white">{title}</p>
          </div>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <p>{url}</p>
    </div>
  );
};

export default VideoCard;
