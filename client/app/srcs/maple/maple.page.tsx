/* eslint-disable consistent-return */
import React from 'react';

import { useStream } from './hooks/maple.hooks.useStream';
import { useCapture } from './hooks/maple.hooks.useCapture';
import { useNotification } from './hooks/maple.hooks.useNotification';

const MaplePage: React.FC = () => {
  const {notify} = useNotification();
  const {videoRef, startRecording, stopRecording} = useStream();
  const {canvasRef, containerRef, box} = useCapture(videoRef, notify);

  return (
    <div>
      <h1>Maple Page</h1>
      <div ref={containerRef} className="relative">
        <div style={{
          position: 'absolute',
          left: box.x,
          top: box.y,
          width: box.width,
          height: box.height,
          border: '2px solid red',
        }}
        />
        <video ref={videoRef} autoPlay width={1280}>
          <track kind="captions" />
        </video>
      </div>
      <button type="button" onClick={startRecording}>Start Recording</button>
      <button type="button" onClick={stopRecording}>Stop Recording</button>
      <canvas ref={canvasRef} className="block" />
    </div>
  );
};

export default MaplePage;
