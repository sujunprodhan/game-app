'use client';
import React, { useState } from 'react';

const videos = [
  {
    id: 'jqBMNsVS9NA',
    title: 'Awesome Gameplay Trailer',
  },
  {
    id: 'Rt4725iE92k',
    title: 'Top 10 Games 2026',
  },
  {
    id: 'IRfh9rcO6IA',
    title: 'Best Action Games',
  },
];

const Video = () => {
  const [activeVideo, setActiveVideo] = useState(videos[0]);

  return (
    <div
      className="grid md:grid-cols-1 gap-6 container mx-auto mt-20
    "
    >
      {/* Main Video */}
      <div className="md:col-span-2">
        <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-xl">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={`https://www.youtube.com/embed/${activeVideo.id}`}
            title={activeVideo.title}
            allowFullScreen
          ></iframe>
        </div>

        <h2 className="mt-4 text-xl font-semibold text-white">{activeVideo.title}</h2>
      </div>

      {/*  Video List */}
      <div className="grid gap-6
      grid-cols-3">
        {videos.map((video) => (
          <div
            key={video.id}
            onClick={() => setActiveVideo(video)}
            className={`cursor-pointer overflow-hidden rounded-lg border-2 transition-all ${
              activeVideo.id === video.id
                ? ' scale-105 duration-500'
                : 'border-transparent hover:scale-105 hover:border-white/30'
            }`}
          >
            {/* Thumbnail */}
            <img
              src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
              alt={video.title}
              className="w-full h-60 object-cover"
            />

            {/* Title overlay */}
            <p className="p-2 text-white text-sm font-medium bg-black/40">{video.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Video;
