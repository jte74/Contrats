// import React from 'react';
// import logo from './assets/BlueDistrib.jpg';
// import './App.css';
// import video from './assets/DeltaVideo.mp4';

// const HomePage = () => {
//   return (
//     <div className="home-container">
//       {/* Logo */}
//       <img 
//         src={logo} 
//         alt="Logo Delta Concept" 
//         className="home-logo"
//       />

//       {/* Conteneur Vidéo */}
//       <div className="video-wrapper">
//         <video 
//           autoPlay
//           loop
//           muted
//           playsInline
//           className="presentation-video"
//           poster="/images/video-poster.jpg"
//         >
//           <source src={video} type="video/mp4" />
//           Votre navigateur ne supporte pas les vidéos HTML5.
//         </video>
//       </div>

//       {/* Texte de présentation */}
//       <div className="presentation-text">
//         <h2>Concours Opération Excellence 2024</h2>
//         <p>
//           Plongez au cœur de la performance opérationnelle ! Ce concours récompense 
//           les meilleures initiatives et les équipes les plus engagées dans 
//           l'amélioration continue de nos processus.
//         </p>
//         <div className="stats-grid">
//           <div className="stat-item">
//             <div className="stat-number">15</div>
//             <div className="stat-label">Équipes</div>
//           </div>
//           <div className="stat-item">
//             <div className="stat-number">127</div>
//             <div className="stat-label">Participants</div>
//           </div>
//           <div className="stat-item">
//             <div className="stat-number">4</div>
//             <div className="stat-label">Mois</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HomePage;

import React, { useState, useRef } from 'react';
import logo from './assets/BlueDistrib.jpg';
import './App.css';
import video from './assets/DeltaVideo.mp4';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

const HomePage = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);


  
  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(!isMuted);
  };

  const handleProgress = () => {
    const duration = videoRef.current.duration;
    const currentTime = videoRef.current.currentTime;
    setProgress((currentTime / duration) * 100);
  };

  return (
    <div className="home-container">
      <img 
        src={logo} 
        alt="Logo Delta Concept" 
        className="home-logo"
      />

      <div className="video-wrapper">
        <video 
          ref={videoRef}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="presentation-video"
          poster="/images/video-poster.jpg"
          onTimeUpdate={handleProgress}
          onClick={togglePlay}
        >
          <source src={video} type="video/mp4" />
          Votre navigateur ne supporte pas les vidéos HTML5.
        </video>

        {/* Contrôles personnalisés */}
        <div className="video-controls">
          <button 
            className="control-btn play-pause"
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }}
            />
          </div>
          
          <button 
            className="control-btn volume"
            onClick={toggleMute}
            aria-label={isMuted ? 'Activer le son' : 'Couper le son'}
          >
            {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
          </button>
        </div>
      </div>

      <div className="presentation-text">
        <h2>Concours Opération Excellence 2024</h2>
        <p>
          Plongez au cœur de la performance opérationnelle ! Ce concours récompense 
          les meilleures initiatives et les équipes les plus engagées dans 
          l'amélioration continue de nos processus.
        </p>
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-number">15</div>
            <div className="stat-label">Équipes</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">127</div>
            <div className="stat-label">Participants</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">4</div>
            <div className="stat-label">Mois</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;