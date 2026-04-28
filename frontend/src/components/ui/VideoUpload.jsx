import React, { useState, useRef } from 'react';
import './VideoUpload.css';

export default function VideoUpload({ onVideoSelect, initialVideo = null }) {
  const [videoFile, setVideoFile] = useState(initialVideo);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState(null);
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const streamRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 50 * 1024 * 1024) { // 50MB limit
        alert('La vidéo ne doit pas dépasser 50MB');
        return;
      }

      setVideoFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setRecordedBlob(null);

      if (onVideoSelect) {
        onVideoSelect(file);
      }
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.muted = true;
      }

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      const chunks = [];
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        setRecordedBlob(blob);
        setVideoFile(blob);
        const url = URL.createObjectURL(blob);
        setPreviewUrl(url);

        if (onVideoSelect) {
          onVideoSelect(blob);
        }

        // Stop all tracks
        stream.getTracks().forEach(track => track.stop());
        if (videoRef.current) {
          videoRef.current.srcObject = null;
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error('Error accessing camera:', err);
      alert('Impossible d\'accéder à la caméra. Vérifiez vos permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleRemoveVideo = () => {
    setVideoFile(null);
    setPreviewUrl(null);
    setRecordedBlob(null);

    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }

    if (onVideoSelect) {
      onVideoSelect(null);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="video-upload">
      {!previewUrl ? (
        <div className="video-upload-placeholder">
          <div className="video-upload-icon">🎥</div>
          <h3 className="video-upload-title">Vidéo de présentation</h3>
          <p className="video-upload-description">
            Présentez-vous en 1-2 minutes. Cette vidéo permettra aux recruteurs de mieux vous connaître.
          </p>

          <div className="video-upload-buttons">
            <button
              type="button"
              className="video-upload-button video-upload-button-primary"
              onClick={() => fileInputRef.current?.click()}
            >
              📁 Choisir un fichier
            </button>

            <button
              type="button"
              className="video-upload-button video-upload-button-secondary"
              onClick={startRecording}
            >
              🔴 Enregistrer
            </button>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            onChange={handleFileSelect}
            style={{ display: 'none' }}
          />

          <div className="video-upload-info">
            <div className="video-upload-info-item">
              <span className="video-upload-info-icon">📏</span>
              <span>Max 50MB</span>
            </div>
            <div className="video-upload-info-item">
              <span className="video-upload-info-icon">⏱️</span>
              <span>1-2 minutes recommandées</span>
            </div>
            <div className="video-upload-info-item">
              <span className="video-upload-info-icon">🎬</span>
              <span>MP4, WebM, MOV</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="video-upload-preview">
          <div className="video-upload-preview-header">
            <h3 className="video-upload-preview-title">Aperçu de la vidéo</h3>
            {videoFile && (
              <span className="video-upload-preview-size">
                {formatFileSize(videoFile.size)}
              </span>
            )}
          </div>

          <div className="video-upload-preview-video">
            <video
              ref={videoRef}
              src={previewUrl}
              controls
              className="video-upload-video-element"
            />
          </div>

          {isRecording && (
            <div className="video-upload-recording-indicator">
              <span className="video-upload-recording-dot"></span>
              Enregistrement en cours...
            </div>
          )}

          <div className="video-upload-preview-actions">
            {isRecording ? (
              <button
                type="button"
                className="video-upload-button video-upload-button-danger"
                onClick={stopRecording}
              >
                ⏹️ Arrêter l'enregistrement
              </button>
            ) : (
              <>
                <button
                  type="button"
                  className="video-upload-button video-upload-button-secondary"
                  onClick={() => fileInputRef.current?.click()}
                >
                  🔄 Changer de vidéo
                </button>
                <button
                  type="button"
                  className="video-upload-button video-upload-button-danger"
                  onClick={handleRemoveVideo}
                >
                  🗑️ Supprimer
                </button>
              </>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            onChange={handleFileSelect}
            style={{ display: 'none' }}
          />
        </div>
      )}
    </div>
  );
}
