import React, { useState, useEffect } from "react";
import { Upload, X, Trash2, Heart, Eye, Camera, Star } from "lucide-react";

const PhotoGallery = ({ isLoggedIn = true }) => {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragOver, setDragOver] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // ✅ Fetch photos from backend on mount
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://spicmacay-nit-durgapur.onrender.com/gallery/photoget");
        // adjust backend URL
        const data = await response.json();
        console.log(data)
        let arr = [...data];
        console.log("The array is: ", arr);
        setPhotos([...data]);
        console.log(photos);
      } catch (err) {
        console.error("Error fetching photos:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPhotos();
  }, []);

  // ✅ Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  // ✅ Handle drag/drop
  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith("image/")) {
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
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("photo", file);

    try {
      setLoading(true);
      const res = await fetch("https://spicmacay-nit-durgapur.onrender.com/gallery/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");
      const newPhoto = await res.json();

      setPhotos((prev) => [newPhoto, ...prev]);
      alert("File uploaded successfully!");
      setFile(null);
      setPreview(null);
      setUploadProgress(0);
    } catch (err) {
      console.error("Upload error:", err);
      alert("Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete photo from backend
  const deleteRoute = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/gallery/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setPhotos((prev) => prev.filter((photo) => photo._id !== id));
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // ✅ PhotoCard (unchanged styles)
  const PhotoCard = ({ photo, index }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [liked, setLiked] = useState(false);

    return (
      <div
        className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-100 via-yellow-50 to-red-100 shadow-xl hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-3 hover:rotate-1 hover:scale-105 animate-slideInUp"
        style={{
          animationDelay: `${index * 150}ms`,
          animation: "fadeInUp 0.8s ease-out forwards",
          border: "3px solid transparent",
          backgroundImage:
            "linear-gradient(45deg, #ff6b35, #f7931e, #ffcc02, #c1272d)",
          backgroundClip: "padding-box",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* ... keep your full PhotoCard JSX unchanged ... */}
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
              <Camera size={24} className="text-yellow-300 animate-spin" />
              <span className="bg-gradient-to-r from-yellow-200 to-orange-200 bg-clip-text text-transparent animate-pulse">
                SPIC MACAY Photo Gallery
              </span>
              <Star size={20} className="text-yellow-300 animate-pulse" />
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight animate-pulse">
              <span className="bg-gradient-to-r from-yellow-200 via-orange-200 to-red-200 bg-clip-text text-transparent drop-shadow-2xl inline-block transform hover:scale-105 transition-transform duration-500">
                Journey through some
              </span>
              <br />
              <span className="bg-gradient-to-r from-red-300 via-pink-300 to-orange-300 bg-clip-text text-transparent drop-shadow-2xl inline-block transform hover:scale-105 transition-transform duration-700">
                auspicious moments
              </span>
              <br />
              <span className="bg-gradient-to-r from-orange-200 via-yellow-200 to-red-200 bg-clip-text text-transparent drop-shadow-2xl inline-block transform hover:scale-105 transition-transform duration-900">
                captured in lenses
              </span>
            </h1>

            <p className="text-lg md:text-xl text-orange-100 max-w-3xl mx-auto leading-relaxed font-medium transform translate-y-4 opacity-0 animate-slideInUp">
              Embark on a visual journey through our captivating photo gallery, celebrating the rich tapestry of Indian classical arts and culture.
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
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />

                    <div className="space-y-6">
                      <div className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center transition-all duration-500 shadow-lg ${dragOver ? 'scale-125 rotate-12' : 'hover:scale-110'}`}>
                        <Upload className="text-white" size={28} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-yellow-200 mb-3">
                          Share Your Cultural Moments
                        </h3>
                        <p className="text-lg font-medium text-orange-200 mb-2">
                          Drop your images here or click to browse
                        </p>
                        <p className="text-orange-300">
                          Support for JPG, PNG, GIF up to 10MB
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
                      <img
                        src={preview}
                        alt="Preview"
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
                        <span>Uploading Sacred Moment... {uploadProgress}%</span>
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

          {/* Photo Grid with Cultural Layout */}
          {/* Photo Grid with Cultural Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
            {photos.length > 0 ? (
              photos.map((photo, index) => (
                <div
                  key={photo._id}
                  className="group relative overflow-hidden rounded-3xl shadow-2xl transform transition-all duration-700 hover:scale-110 hover:rotate-1"
                  style={{
                    animationDelay: `${index * 150}ms`,
                    animation: "fadeInUp 1s ease-out forwards",
                  }}
                  onClick={() => setSelectedPhoto(photo)}
                >
                  {/* Image with gradient border + transition */}
                  <div className="relative rounded-3xl border-4 border-gradient-to-r from-yellow-400 via-orange-500 to-red-500 p-[2px]">
                    <img
                      src={photo.url}
                      alt={photo.name}
                      className="w-full h-72 object-cover rounded-2xl shadow-lg transition-all duration-700 group-hover:brightness-110 group-hover:scale-105"
                    />
                  </div>

                  {/* Hover Overlay with Icons */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-between px-6 py-4">
                    <h3 className="text-lg font-bold text-yellow-200 drop-shadow-md">
                      {photo.name || "Sacred Moment"}
                    </h3>
                    <div className="flex gap-4">
                      <button className="p-2 bg-yellow-400/90 rounded-full hover:bg-yellow-500 transition-all duration-300 shadow-lg">
                        <Heart size={18} className="text-red-700" />
                      </button>
                      <button className="p-2 bg-white/80 rounded-full hover:bg-white transition-all duration-300 shadow-lg">
                        <Eye size={18} className="text-gray-900" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-20">
                <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center shadow-2xl animate-float">
                  <Camera size={48} className="text-white" />
                </div>
                <h3 className="text-4xl font-bold text-yellow-200 mb-4 animate-pulse">
                  No Sacred Moments Yet
                </h3>
                <p className="text-xl text-orange-300">
                  Share your cultural heritage with our community
                </p>
              </div>
            )}
          </div>

        </div>

        {/* Modal for photo preview with ornate design */}
        {/* Modal for photo preview with ornate design */}
        {selectedPhoto && (
          <div
            className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <div
              className="relative w-full max-w-3xl max-h-[80vh] bg-gradient-to-r from-yellow-500 to-orange-500 p-3 rounded-3xl shadow-2xl animate-zoomIn"
              onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
            >
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.name}
                className="w-full h-auto max-h-[70vh] object-contain rounded-2xl shadow-2xl"
              />
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-6 right-6 p-3 bg-red-500/90 backdrop-blur-md rounded-full text-white hover:bg-red-600/90 transition-all duration-200 transform hover:scale-110 shadow-lg border-2 border-white/30"
              >
                <X size={24} />
              </button>

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
        
        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(255, 193, 7, 0.5);
          }
          50% {
            box-shadow: 0 0 40px rgba(255, 193, 7, 0.8);
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
        
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
        
        .border-3 {
          border-width: 3px;
        }
      `}</style>
    </>
  );
};

export default PhotoGallery;

