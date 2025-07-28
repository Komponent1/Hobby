/* eslint-disable prefer-destructuring */
import {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { getAllTextInImage, getSentencesWithWord, sentenceSimilarity } from '../utils/maple.utils.ocr';

export const useCapture = (
  videoRef: React.RefObject<HTMLVideoElement>,
  notify: (title: string, options?: NotificationOptions) => void,
) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeId = useRef<NodeJS.Timeout | null>(null);
  const [box, setBox] = useState({
    x: 0, y: 0, width: 0, height: 0,
  });
  const setBoxPosition = useCallback((x: number, y: number, width: number, height: number) => {
    setBox({
      x, y, width, height,
    });
  }, []);
  const capture = useCallback(() => {
    if (videoRef.current === null || canvasRef.current === null) return;
    const {
      x, y, width, height,
    } = box;
    const scale = videoRef.current.videoWidth / videoRef.current.width;
    canvasRef.current!.width = box.width * scale;
    canvasRef.current!.height = box.height * scale;
    const ctx = canvasRef.current.getContext('2d');
    ctx!.drawImage(
      videoRef.current,
      x * scale,
      y * scale,
      width * scale,
      height * scale,
      0,
      0,
      width * scale,
      height * scale,
    );
  }, [box, videoRef]);
  const lastSentence = useRef<string>('');
  const getText = useCallback(async () => {
    if (!window) return;
    capture();
    const dataUrl = canvasRef.current!.toDataURL('image/png');
    const text = await getAllTextInImage(dataUrl);
    const sentences = getSentencesWithWord(text, '경뿌');
    if (sentenceSimilarity(lastSentence.current, sentences[0]) < 0.5) {
      notify('Word Detected', {
        body: '새로운 경뿌가 등장한것 같아요',
      });
      lastSentence.current = sentences[0];
    }
  }, [capture, notify, lastSentence]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.onmousedown = (e) => {
        setBoxPosition(e.offsetX, e.offsetY, 0, 0);
      };
      containerRef.current.onmousemove = (e) => {
        if (e.buttons !== 1) return;
        const w = e.offsetX - box.x;
        const h = e.offsetY - box.y;
        setBoxPosition(box.x, box.y, w, h);
      };

      containerRef.current.onmouseup = (e) => {
        const w = e.offsetX - box.x;
        const h = e.offsetY - box.y;
        setBoxPosition(box.x, box.y, w, h);
        if (timeId.current) {
          clearInterval(timeId.current);
        }
        timeId.current = setInterval(getText, 5000);
      };
    }
  }, [setBoxPosition, box, getText]);

  return {
    containerRef,
    canvasRef,
    box,
  };
};
