import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

const MediaGallery = ({ resources }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const isVideo = (url) => url.toLowerCase().endsWith('.mp4');

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % resources.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + resources.length) % resources.length);
  };

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    setIsPlaying(false);
  }, [currentIndex]);

  const renderMedia = () => {
    const currentResource = resources[currentIndex];
    if (isVideo(currentResource)) {
      console.log("Video" + currentResource);
      return (
        <video
          ref={videoRef}
          src={currentResource}
          className="w-full h-full object-contain"
          controls={false}
          onEnded={() => setIsPlaying(false)}
          loop
        />
      );
    } else {
      console.log("Image" + currentResource);
      return (
        <img
          src={currentResource}
          alt={`Resource ${currentIndex + 1}`}
          className="w-full h-full object-contain"
        />
      );
    }
  };

  return (
    <div className="relative h-96">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full"
        >
          {renderMedia()}
        </motion.div>
      </AnimatePresence>
      
      <button
        onClick={handlePrev}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
      >
        <ChevronRight size={24} />
      </button>

      {isVideo(resources[currentIndex]) && (
        <button
          onClick={handlePlayPause}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
        >
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </button>
      )}

      <div className="absolute bottom-4 left-0 right-0 flex justify-center">
        {resources.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full mx-1 ${
              currentIndex === index ? 'bg-white' : 'bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default MediaGallery;