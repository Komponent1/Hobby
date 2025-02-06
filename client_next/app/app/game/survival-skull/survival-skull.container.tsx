'use client';

/* eslint-disable no-param-reassign */
import { forwardRef, useLayoutEffect, useRef } from 'react';
import { RefPhaserGame } from './dto/game.dto.ref';
import {gameConfig} from './config/game.config';

const SurvivalSkullContainer = forwardRef<RefPhaserGame, {}>((_, ref) => {
  const game = useRef<Phaser.Game | null>(null);

  useLayoutEffect(() => {
    if (game.current === null) {
      game.current = new Phaser.Game(gameConfig);
    }

    return () => {
      game.current?.destroy(true);
      if (game.current !== null) {
        game.current = null;
      }
    };
  }, []);

  useLayoutEffect(() => {
    if (typeof ref === 'function') {
      ref({ game: game.current, scene: null });
    } else if (ref) {
      ref.current = { game: game.current, scene: null };
    }
  }, [ref]);

  return (
    <div id="game-container" />
  );
});

SurvivalSkullContainer.displayName = 'Game';

export default SurvivalSkullContainer;
