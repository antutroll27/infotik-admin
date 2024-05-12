import React, { useState, useContext, useEffect } from 'react';
import { Context } from '@/contextapi/ContextProvider';
import { useRouter } from 'next/navigation';
import { uploadVideo } from '@/http'; // Assuming you have an uploadVideo function in your HTTP utility

const DashboardPage = () => {
  const { isAuth } = useContext(Context);
  const router = useRouter();

  const [videoFile, setVideoFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (event) => {
    setVideoFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!videoFile) {
      alert('Please select a video file to upload.');
      return;
    }

    setUploading(true);

    try {
      // Call your HTTP utility function to upload the video
      await uploadVideo(videoFile);

      // Handle success
      alert('Video uploaded successfully!');
    } catch (error) {
      // Handle error
      console.error('Error uploading video:', error);
      alert('Error uploading video. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    if (!isAuth) {
      router.push('/login');
    }
  }, [isAuth, router]);

  return (
    <section className="w-full h-screen pt-28 bg-primary">
      <div className="max-w-[40rem] mx-auto bg-black rounded-md p-14">
        <h2 className="text-white text-2xl mb-6">Dashboard</h2>
        <div>
          <input type="file" onChange={handleFileChange} accept="video/*" />
          <button
            className="py-2 w-full my-3 text-white bg-gradient-infitik rounded-md"
            onClick={handleUpload}
            disabled={uploading}
          >
            {uploading ? 'Uploading...' : 'Upload Video'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default DashboardPage;
