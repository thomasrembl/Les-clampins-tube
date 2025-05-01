import React, { useEffect, useState } from "react";
import VideoCard from "./videoCard";

type VideoGridProps = {
  activeFilter: string;
};

export default function VideoGrid({ activeFilter }: VideoGridProps) {
  const [videos, setVideos] = useState<{ urlList: [] }[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        if (activeFilter === "Tous") {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/getAllVideos`
          );
          const data = await res.json();
          setVideos(data as { urlList: [] }[]);
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
          const data = await res.json();
          setVideos(data as { urlList: [] }[]);
        }
      } catch (err) {
        console.error("Failed to fetch videos:", err);
      }
    };

    fetchVideos();
  }, [activeFilter]);

  const urlList = Array.isArray(videos.urlList) ? videos.urlList : [];

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
