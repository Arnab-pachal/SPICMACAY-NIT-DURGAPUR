import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getItemWithExpiry } from '../Utils/storage';

function Pixels() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [albums, setAlbums] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    department: '',
    college: '',
    year: '',
    category: 'others',
    mediaType: 'photo',
    description: '',
    media: null
  });

  useEffect(() => {
    // Check if user is logged in
    const user = getItemWithExpiry("s-id");
    setIsLoggedIn(!!user);
    
    // Fetch albums data from backend
    const fetchAlbums = async () => {
      try {
        const response = await fetch('https://spicmacay-nit-durgapur.onrender.com/aditi/aditiget');
        const data = await response.json();
        console.log(data)
        if (response.ok) {
          const albumsData = data.reduce((acc, album) => {
            const { year, category, mediaType, mediaUrl, ...rest } = album;
            if (!acc[year]) acc[year] = {};
            if (!acc[year][category]) acc[year][category] = { image: [], video: [] };
            if (!acc[year][category][mediaType]) acc[year][category][mediaType] = [];
            console.log(mediaType)
            console.log(acc)
            acc[year][category][mediaType].push({ ...rest, mediaUrl });
            console.log(acc)
            return acc;
          }, {});
          setAlbums(albumsData);
        } else {
          console.error('Failed to fetch albums:', data.message);
        }
      } catch (error) {
        console.error('Error fetching albums:', error.message);
      }
    };

    fetchAlbums();
  },[]);
  console.log("album is " +{...albums[2023]})

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMediaChange = (e) => {
    if (e.target.files[0]) {
      const fileURL = URL.createObjectURL(e.target.files[0]);
      console.log(e.target.files[0]);
      setFormData({ ...formData, media: e.target.files[0] });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("department", formData.department);
    formDataToSend.append("college", formData.college);
    formDataToSend.append("year", formData.year);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("mediaType", formData.mediaType);
    formDataToSend.append("description", formData.description);
    if (formData.media) {
      formDataToSend.append("file", formData.media);
    }

    try {
      const response = await fetch('https://spicmacay-nit-durgapur.onrender.com/aditi/aditiupload', {
        method: 'POST',
        body: formDataToSend,
        
      });
      const data = await response.json();
      if (response.ok) {
        alert('Media uploaded successfully!');
        setAlbums(prev => {
          const updated = { ...prev };
          const { year, category, mediaType } = formData;
          if (!updated[year]) updated[year] = {};
          if (!updated[year][category]) updated[year][category] = { photo: [], video: [] };
          updated[year][category][mediaType].unshift(data.mediaUrl);
          return updated;
        });
      } else {
        alert('Error uploading media: ' + data.message);
      }
    } catch (error) {
      alert('Error uploading media: ' + error.message);
    }

    setFormData({
      name: '',
      department: '',
      college: '',
      year: '',
      category: 'others',
      mediaType: 'image',
      description: '',
      media: null
    });
  };

  const handleCheer = (year, category, mediaType, id) => {
    setAlbums(prev => {
      const updated = { ...prev };
      updated[year][category][mediaType] = updated[year][category][mediaType].map(post =>
        post.id === id ? { ...post, cheers: post.cheers + 1 } : post
      );
      return updated;
    });
  };

  return (
    <div className="p-6 bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-blue-700">🏆 Aditi Event Album</h1>
        <p className="text-gray-600">Celebrate winners, runner-ups, and amazing moments year by year!</p>
      </div>

      {isLoggedIn && (
        <form onSubmit={handleSubmit} className="bg-white shadow-md p-6 rounded-lg max-w-3xl mx-auto space-y-4 text-black">
          <input name="name" type="text" placeholder="Participant Name" required value={formData.name} onChange={handleInputChange} className="w-full border p-3 rounded" />
          <input name="department" type="text" placeholder="Department" required value={formData.department} onChange={handleInputChange} className="w-full border p-3 rounded" />
          <input name="college" type="text" placeholder="College" required value={formData.college} onChange={handleInputChange} className="w-full border p-3 rounded" />
          <input name="year" type="text" placeholder="Year (e.g. 2024)" required value={formData.year} onChange={handleInputChange} className="w-full border p-3 rounded" />
          
          <select name="category" value={formData.category} onChange={handleInputChange} className="w-full border p-3 rounded">
            <option value="winner">Winner</option>
            <option value="runnerup">Runner-Up</option>
            <option value="others">Others</option>
          </select>

          <select name="mediaType" value={formData.mediaType} onChange={handleInputChange} className="w-full border p-3 rounded">
            <option value="photo">Photography</option>
            <option value="video">Videography</option>
          </select>

          <textarea name="description" placeholder="Describe the moment..." required value={formData.description} onChange={handleInputChange} className="w-full border p-3 rounded" />
          <input type="file" accept="image/*,video/*" onChange={handleMediaChange} className="w-full border p-3 rounded" required />

          <button type="submit" className="bg-blue-600 text-white w-full py-3 rounded hover:bg-blue-700">Add to Album</button>
        </form>
      )}

     
{Object.keys(albums).reverse().map(year => (
  <div key={year} className="max-w-5xl mx-auto mt-12" style={{color:"black"}}>
    <h2 className="text-3xl font-semibold mb-4 text-blue-800 border-b pb-2">{year} Album</h2>

    {['winner', 'runnerup', 'others'].map(category => (
      albums[year][category] && (
        <div key={category} className="mb-10">
          <h3 className="text-2xl font-bold text-purple-700 capitalize mb-4">
            {category === 'others' ? 'Participants' : category}
          </h3>

          {['image', 'video'].map(mediaType => (
            albums[year][category][mediaType] && albums[year][category][mediaType].length > 0 && (
              <div key={mediaType} className="mb-6">
                <h4 className="text-xl font-semibold text-gray-700 mb-2 capitalize">{mediaType}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {albums[year][category][mediaType].map((item, idx) => (
                    <div key={item._id || idx} className="bg-white rounded shadow p-4">
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-gray-600">{item.department} - {item.college}</p>
                      <p className="mt-2">{item.description}</p>
                      {mediaType === 'image' ? (
                        <img src={item.mediaUrl} alt={item.description} className="mt-3 rounded" />
                      ) : (
                        <video controls className="mt-3 rounded">
                          <source src={item.mediaUrl} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      )}
                      <button
                        className="mt-3 text-blue-600 hover:underline"
                        onClick={() => handleCheer(year, category, mediaType, item.id)}
                      >
                        👏 {item.cheers || 0} Cheers
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )
          ))}
        </div>
      )
    ))}
  </div>
))}
    </div>
  );
}

export default Pixels;
