/* eslint-disable no-param-reassign */
import Phaser from 'phaser';
import React, { forwardRef, useLayoutEffect, useRef } from 'react';
import { RefPhaserGame } from './dto/ten-bricks.dto.ref';
import {gameConfig} from './config/ten-bricks.config';

const TenGameContainer = forwardRef<RefPhaserGame, {}>((_, ref) => {
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

TenGameContainer.displayName = 'Game';

export default TenGameContainer;
