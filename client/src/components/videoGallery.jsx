import React, { useState, useEffect } from "react";
import { Upload, X, Trash2, Heart, Eye, Camera, Star, Play, Pause, Volume2, VolumeX } from "lucide-react";

const VideoGallery = ({ isLoggedIn = true }) => {
  const [loading, setLoading] = useState(false);
  const [videos, setVideos] = useState([]);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragOver, setDragOver] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [playingVideo, setPlayingVideo] = useState(null);

  // ✅ Fetch videos from backend on mount
  useEffect(() => {
    const fetchVideos = async () => {
      try {


        setLoading(true);
        const response = await fetch("http://localhost:8080/gallery/videoget");

        // Sample videos for demo - replace with your API endpoint
        const sampleVideos = [
          {
            _id: "1",
            name: "Classical Dance Performance",
            url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
            thumbnail: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
            likes: 24,
            views: 156,
            duration: "5:30"
          },
          {
            _id: "2",
            name: "Sitar Recital",
            url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4",
            thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
            likes: 18,
            views: 89,
            duration: "8:45"
          },
          {
            _id: "3",
            name: "Cultural Festival Highlights",
            url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_5mb.mp4",
            thumbnail: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
            likes: 32,
            views: 203,
            duration: "12:15"
          },
          {
            _id: "4",
            name: "Traditional Art Workshop",
            url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
            thumbnail: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop",
            likes: 15,
            views: 67,
            duration: "6:20"
          },
          {
            _id: "5",
            name: "Music Concert Performance",
            url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4",
            thumbnail: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=300&fit=crop",
            likes: 41,
            views: 287,
            duration: "15:30"
          },
          {
            _id: "6",
            name: "Dance Workshop Session",
            url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
            thumbnail: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
            likes: 29,
            views: 134,
            duration: "9:10"
          }
        ];
        const videos = await response.json();
        console.log("Videos are :-", videos);
        setVideos([...videos]);
        console.log("Videos fetched:", videos);
        setLoading(false);

      } catch (err) {
        console.error("Error fetching videos:", err);
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  // ✅ Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.startsWith("video/")) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  // ✅ Handle drag/drop
  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith("video/")) {
      setFile(droppedFile);
      setPreview(URL.createObjectURL(droppedFile));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => setDragOver(false);

  // ✅ Upload to backend
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a video file first.");
      return;
    }

    setLoading(true);

    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      setUploadProgress(i);
      await new Promise(resolve => setTimeout(resolve, 300));
    }

    const newVideo = {
      _id: Date.now().toString(),
      name: file.name,
      url: preview,
      thumbnail: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      likes: 0,
      views: 0,
      duration: "0:00"
    };

    setVideos(prev => [newVideo, ...prev]);
    alert("Video uploaded successfully!");
    setFile(null);
    setPreview(null);
    setUploadProgress(0);
    setLoading(false);
  };

  // ✅ Delete video from backend
  const deleteVideo = async (id) => {
    try {
      setVideos(prev => prev.filter(video => video._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // VideoCard component
  const VideoCard = ({ video, index }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [liked, setLiked] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    return (
      <div
        key={video._id}
        className="group relative overflow-hidden rounded-3xl shadow-2xl transform transition-all duration-700 hover:scale-110 hover:rotate-1 cursor-pointer"
        style={{
          animationDelay: `${index * 150}ms`,
          animation: "fadeInUp 1s ease-out forwards",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setSelectedVideo(video)}
      >
        {/* Video thumbnail with gradient border */}
        <div className="relative rounded-3xl border-4 border-gradient-to-r from-yellow-400 via-orange-500 to-red-500 p-[2px]">
          <div className="relative">
            <img
              src={video.thumbnail}
              alt={video.name}
              className="w-full h-72 object-cover rounded-2xl shadow-lg transition-all duration-700 group-hover:brightness-110 group-hover:scale-105"
            />

            {/* Play button overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={`w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 transform ${isHovered ? 'scale-110 bg-yellow-400/90' : 'scale-100'
                }`}>
                <Play size={24} className={`ml-1 transition-all duration-300 ${isHovered ? 'text-white' : 'text-gray-800'}`} />
              </div>
            </div>

            {/* Duration badge */}
            <div className="absolute top-4 right-4 px-2 py-1 bg-black/70 backdrop-blur-sm rounded-lg text-white text-sm font-bold">
              {video.duration}
            </div>
          </div>
        </div>

        {/* Hover Overlay with Icons */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-between px-6 py-4">
          <div>
            <h3 className="text-lg font-bold text-yellow-200 drop-shadow-md mb-1">
              {video.name || "Sacred Video"}
            </h3>
            <div className="flex items-center gap-4 text-sm text-orange-200">
              <span className="flex items-center gap-1">
                <Heart size={14} className="text-red-400" />
                {video.likes || 0}
              </span>
              <span className="flex items-center gap-1">
                <Eye size={14} className="text-blue-400" />
                {video.views || 0}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLiked(!liked);
              }}
              className="p-2 bg-yellow-400/90 rounded-full hover:bg-yellow-500 transition-all duration-300 shadow-lg"
            >
              <Heart size={18} className={`${liked ? 'text-red-700 animate-pulse' : 'text-red-700'}`} />
            </button>
            {isLoggedIn && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteVideo(video._id);
                }}
                className="p-2 bg-red-500/80 rounded-full hover:bg-red-600 transition-all duration-300 shadow-lg"
              >
                <Trash2 size={16} className="text-white" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <section className="min-h-screen bg-gradient-to-br from-red-900 via-orange-800 to-yellow-700 relative overflow-hidden">
        {/* Traditional Pattern Background with floating animations */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 border-4 border-yellow-400 rounded-full animate-spin"></div>
          <div className="absolute top-40 right-32 w-24 h-24 border-4 border-red-400 rounded-full animate-ping"></div>
          <div className="absolute bottom-32 left-40 w-28 h-28 border-4 border-orange-400 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-36 h-36 border-4 border-pink-400 rounded-full animate-bounce"></div>

          {/* Additional floating elements */}
          <div className="absolute top-1/2 left-10 w-16 h-16 border-2 border-yellow-300 rounded-full animate-ping"></div>
          <div className="absolute top-1/3 right-10 w-20 h-20 border-2 border-red-300 rounded-full animate-pulse"></div>
        </div>

        <div className="container mx-auto max-w-7xl py-16 px-4 relative z-10">
          {/* Header Section with Indian Cultural Styling */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full border-2 border-yellow-400/50 text-yellow-200 text-lg font-bold mb-8 backdrop-blur-sm transform hover:scale-110 transition-all duration-500 hover:shadow-2xl animate-bounce">
              <Play size={24} className="text-yellow-300 animate-pulse" />
              <span className="bg-gradient-to-r from-yellow-200 to-orange-200 bg-clip-text text-transparent animate-pulse">
                SPIC MACAY Video Gallery
              </span>
              <Star size={20} className="text-yellow-300 animate-pulse" />
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight animate-pulse">
              <span className="bg-gradient-to-r from-yellow-200 via-orange-200 to-red-200 bg-clip-text text-transparent drop-shadow-2xl inline-block transform hover:scale-105 transition-transform duration-500">
                Experience the magic of
              </span>
              <br />
              <span className="bg-gradient-to-r from-red-300 via-pink-300 to-orange-300 bg-clip-text text-transparent drop-shadow-2xl inline-block transform hover:scale-105 transition-transform duration-700">
                cultural performances
              </span>
              <br />
              <span className="bg-gradient-to-r from-orange-200 via-yellow-200 to-red-200 bg-clip-text text-transparent drop-shadow-2xl inline-block transform hover:scale-105 transition-transform duration-900">
                in motion
              </span>
            </h1>

            <p className="text-lg md:text-xl text-orange-100 max-w-3xl mx-auto leading-relaxed font-medium transform translate-y-4 opacity-0 animate-slideInUp">
              Immerse yourself in our captivating video collection, showcasing the vibrant world of Indian classical arts and cultural heritage.
            </p>

            {/* Decorative Elements with animations */}
            <div className="flex justify-center items-center gap-4 mt-8 animate-fadeIn">
              <div className="w-16 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-pulse"></div>
              <Star className="text-yellow-300 animate-spin" size={24} />
              <div className="w-16 h-1 bg-gradient-to-r from-orange-400 to-red-400 rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Upload Section with Cultural Design */}
          {isLoggedIn && (
            <div className="mb-20">
              <div className="max-w-lg mx-auto">
                <div className="space-y-8">
                  {/* Drag & Drop Area with Indian-inspired design */}
                  <div
                    className={`relative border-3 border-dashed rounded-3xl p-10 text-center transition-all duration-500 cursor-pointer transform hover:scale-105
                      ${dragOver
                        ? 'border-yellow-400 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 shadow-2xl'
                        : 'border-orange-400/60 hover:border-yellow-400/80 bg-gradient-to-br from-red-900/40 to-orange-800/40 hover:shadow-xl'
                      }`}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onClick={() => document.getElementById('fileInput').click()}
                  >
                    <input
                      id="fileInput"
                      type="file"
                      accept="video/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />

                    <div className="space-y-6">
                      <div className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center transition-all duration-500 shadow-lg ${dragOver ? 'scale-125 rotate-12' : 'hover:scale-110'}`}>
                        <Upload className="text-white" size={28} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-yellow-200 mb-3">
                          Share Your Cultural Videos
                        </h3>
                        <p className="text-lg font-medium text-orange-200 mb-2">
                          Drop your videos here or click to browse
                        </p>
                        <p className="text-orange-300">
                          Support for MP4, MOV, AVI up to 100MB
                        </p>
                      </div>
                    </div>

                    {/* Decorative corner elements */}
                    <div className="absolute top-4 left-4 w-8 h-8 border-l-4 border-t-4 border-yellow-400 rounded-tl-lg"></div>
                    <div className="absolute top-4 right-4 w-8 h-8 border-r-4 border-t-4 border-orange-400 rounded-tr-lg"></div>
                    <div className="absolute bottom-4 left-4 w-8 h-8 border-l-4 border-b-4 border-red-400 rounded-bl-lg"></div>
                    <div className="absolute bottom-4 right-4 w-8 h-8 border-r-4 border-b-4 border-pink-400 rounded-br-lg"></div>
                  </div>

                  {/* Preview with ornate frame */}
                  {preview && (
                    <div className="relative bg-gradient-to-r from-yellow-500 to-orange-500 p-2 rounded-2xl shadow-2xl">
                      <video
                        src={preview}
                        controls
                        className="w-full h-64 object-cover rounded-xl shadow-lg"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setPreview(null);
                          setFile(null);
                        }}
                        className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-200 transform hover:scale-110 shadow-lg"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  )}

                  {/* Upload Button with Indian-inspired design */}
                  <button
                    type="button"
                    onClick={handleUpload}
                    disabled={loading || !file}
                    className={`w-full py-4 px-8 rounded-2xl font-bold text-xl text-white transition-all duration-500 relative overflow-hidden shadow-xl transform hover:scale-105
                      ${loading || !file
                        ? 'bg-gray-600 cursor-not-allowed'
                        : 'bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 hover:from-yellow-600 hover:via-orange-600 hover:to-red-600 hover:shadow-2xl'
                      }`}
                  >
                    {loading ? (
                      <div className="flex items-center justify-center gap-3">
                        <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Uploading Sacred Video... {uploadProgress}%</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-3">
                        <Star size={20} />
                        <span>Upload to Gallery</span>
                        <Star size={20} />
                      </div>
                    )}

                    {loading && (
                      <div
                        className="absolute bottom-0 left-0 h-2 bg-yellow-300/50 transition-all duration-300 rounded-full"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Video Grid with Cultural Layout */}
          {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
            {loading ? (
              // Loading skeleton
              Array(8).fill(0).map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="aspect-video bg-gradient-to-br from-orange-100 to-red-100 rounded-3xl"></div>
                </div>
              ))
            ) : videos.length > 0 ? (
              videos.map((video, index) => (
                <video  src={video.url} controls key={video._id}/>
                
              ))
            ) : (
              <div className="col-span-full text-center py-20">
                <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center shadow-2xl animate-float">
                  <Play size={48} className="text-white ml-2" />
                </div>
                <h3 className="text-4xl font-bold text-yellow-200 mb-4 animate-pulse">
                  No Sacred Videos Yet
                </h3>
                <p className="text-xl text-orange-300">
                  Share your cultural performances with our community
                </p>
              </div>
            )}
          </div> */}
          {/* Video Grid with Cultural Layout */}
          {/* Video Grid with Smart Centering */}
          <div
            className={`grid gap-12 ${videos.length === 1
                ? "grid-cols-1 justify-center" // one centered
                : videos.length === 2
                  ? "grid-cols-1 sm:grid-cols-2 justify-center" // stack on mobile, side by side on desktop
                  : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              }`}
          >
            {loading ? (
              Array(8)
                .fill(0)
                .map((_, index) => (
                  <div key={index} className="animate-pulse flex justify-center">
                    <div className="aspect-video w-[320px] bg-gradient-to-br from-orange-100 to-red-100 rounded-3xl"></div>
                  </div>
                ))
            ) : videos.length > 0 ? (
              videos.map((video) => (
                <div key={video._id} className="flex justify-center">
                  <div
                    className="group relative rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transform transition-all duration-500 hover:scale-105 hover:-rotate-1 cursor-pointer w-[320px]"
                    onClick={() => setSelectedVideo(video)}
                  >
                    {/* Thumbnail */}
                    <div className="relative">
                      <video
                        src={video.url}
                        poster={video.thumbnail}
                        muted
                        loop
                        playsInline
                        className="w-full h-72 object-cover rounded-2xl transition-all duration-700 group-hover:brightness-110 group-hover:scale-105"
                        onMouseEnter={(e) => e.target.play()}
                        onMouseLeave={(e) => {
                          e.target.pause();
                          e.target.currentTime = 0;
                        }}
                      />
                      {/* Play Button */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg transition-all duration-500 transform group-hover:scale-125 animate-pulse">
                          <Play size={26} className="text-white ml-1" />
                        </div>
                      </div>
                      {/* Duration */}
                      <div className="absolute top-3 right-3 px-2 py-1 bg-black/70 rounded-lg text-white text-xs font-bold backdrop-blur-sm">
                        {video.duration}
                      </div>
                    </div>

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-between px-4 py-3">
                      <div>
                        <h3 className="text-lg font-bold text-yellow-200 drop-shadow-md mb-1">
                          {video.name}
                        </h3>
                        <div className="flex items-center gap-3 text-sm text-orange-200">
                          <span className="flex items-center gap-1">
                            <Heart size={14} className="text-red-400" />
                            {video.likes || 0}
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye size={14} className="text-blue-400" />
                            {video.views || 0}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        {/* Like Button */}
                        <button
                          onClick={(e) => e.stopPropagation()}
                          className="p-2 bg-gradient-to-r from-pink-400 to-red-500 rounded-full hover:scale-110 transition-all duration-300 shadow-lg"
                        >
                          <Heart size={18} className="text-white" />
                        </button>
                        {/* Delete Button */}
                        {isLoggedIn && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteVideo(video._id);
                            }}
                            className="p-2 bg-gradient-to-r from-red-500 to-pink-600 rounded-full hover:scale-110 transition-all duration-300 shadow-lg"
                          >
                            <Trash2 size={16} className="text-white" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-20">
                <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center shadow-2xl animate-float">
                  <Play size={48} className="text-white ml-2" />
                </div>
                <h3 className="text-4xl font-bold text-yellow-200 mb-4 animate-pulse">
                  No Sacred Videos Yet
                </h3>
                <p className="text-xl text-orange-300">
                  Share your cultural performances with our community
                </p>
              </div>
            )}
          </div>




        </div>

        {/* Modal for video preview with ornate design */}
        {selectedVideo && (
          <div
            className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedVideo(null)}
          >
            <div
              className="relative w-full max-w-4xl max-h-[80vh] bg-gradient-to-r from-yellow-500 to-orange-500 p-3 rounded-3xl shadow-2xl animate-zoomIn"
              onClick={(e) => e.stopPropagation()}
            >
              <video
                src={selectedVideo.url}
                poster={selectedVideo.thumbnail}
                controls
                autoPlay
                className="w-full h-auto max-h-[70vh] rounded-2xl shadow-2xl"
              />
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-6 right-6 p-3 bg-red-500/90 backdrop-blur-md rounded-full text-white hover:bg-red-600/90 transition-all duration-200 transform hover:scale-110 shadow-lg border-2 border-white/30"
              >
                <X size={24} />
              </button>

              {/* Video info overlay */}
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-xl font-bold mb-2">{selectedVideo.name}</h3>
                <div className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1">
                    <Heart size={14} className="text-red-400" />
                    {selectedVideo.likes || 0}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye size={14} className="text-blue-400" />
                    {selectedVideo.views || 0}
                  </span>
                  <span>{selectedVideo.duration}</span>
                </div>
              </div>

              {/* Ornate corner decorations */}
              <div className="absolute top-0 left-0 w-12 h-12 border-l-8 border-t-8 border-yellow-300 rounded-tl-2xl"></div>
              <div className="absolute top-0 right-0 w-12 h-12 border-r-8 border-t-8 border-red-300 rounded-tr-2xl"></div>
              <div className="absolute bottom-0 left-0 w-12 h-12 border-l-8 border-b-8 border-orange-300 rounded-bl-2xl"></div>
              <div className="absolute bottom-0 right-0 w-12 h-12 border-r-8 border-b-8 border-pink-300 rounded-br-2xl"></div>
            </div>
          </div>
        )}
      </section>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes zoomIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-slideInUp {
          animation: slideInUp 1s ease-out forwards;
          animation-delay: 0.5s;
        }
        
        .animate-fadeIn {
          animation: fadeIn 1.5s ease-out forwards;
          animation-delay: 1s;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-zoomIn {
          animation: zoomIn 0.3s ease-out;
        }
        
        .border-3 {
          border-width: 3px;
        }
      `}</style>
    </>
  );
};

export default VideoGallery;