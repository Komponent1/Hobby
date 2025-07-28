import { useCallback, useRef, useState } from 'react';

export const useStream = () => {
  const [isCapture, setIsCapture] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);

  const startRecording = useCallback(async () => {
    if (isCapture) return;
    const stream = await navigator.mediaDevices.getDisplayMedia({video: true});
    recorderRef.current = new MediaRecorder(stream, {
      mimeType: 'video/webm; codecs=vp9',
      videoBitsPerSecond: 5000000,
    });
    videoRef.current!.srcObject = stream;
    recorderRef.current.start();
    setIsCapture(true);
  }, [isCapture]);
  const stopRecording = useCallback(() => {
    if (recorderRef.current) {
      recorderRef.current.stop();
      recorderRef.current = null;
    }
  }, []);

  return {
    videoRef,
    startRecording,
    stopRecording,
  };
};
