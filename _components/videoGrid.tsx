import React, { useEffect, useState } from "react";
import VideoCard from "./videoCard";

interface VideoUrl {
  url: string;
  projectName: string;
  time: string;
}

interface Video {
  urlList: VideoUrl[];
}

interface VideoResponse {
  videos: Video[];
  urlList: VideoUrl[];
}

type VideoGridProps = {
  activeFilter: string;
};

export default function VideoGrid({ activeFilter }: VideoGridProps) {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        if (activeFilter === "Tous") {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/getAllVideos`
          );
          const data: VideoResponse = await res.json();

          setVideos([
            {
              urlList: Array.isArray(data.urlList) ? data.urlList : [],
            },
          ]);
        } else {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/getByName`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ projectName: activeFilter }),
            }
          );
          const data: VideoResponse = await res.json();

          setVideos([
            {
              urlList: Array.isArray(data.urlList) ? data.urlList : [],
            },
          ]);
        }
      } catch (err) {
        console.error("Failed to fetch videos:", err);
      }
    };

    fetchVideos();
  }, [activeFilter]);

  const urlList: { url: string }[] = videos.flatMap((video) =>
    Array.isArray(video.urlList)
      ? video.urlList.map(({ url }) => ({ url }))
      : []
  );

  return (
    <div className="flex-grid text-white">
      {urlList.length > 0 ? (
        urlList.map((entry, idx) => <VideoCard key={idx} url={entry.url} />)
      ) : (
        <div>Aucune vidéo</div>
      )}
    </div>
  );
}
