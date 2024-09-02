import Phaser from 'phaser';
import { forwardRef, useLayoutEffect, useRef } from 'react';
import { RefPhaserGame } from './game';

class Example extends Phaser.Scene {
  constructor() {
    super('example');
  }

  create() {
    this.add.rectangle(400, 300, 100, 100, 0x6666ff);
  }
}

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'game-container',
  backgroundColor: '#028af8',
  scene: Example,
};

export const Game = forwardRef<RefPhaserGame, {}>((_, ref) => {
  const game = useRef<Phaser.Game | null>(null);

  useLayoutEffect(() => {
    if (game.current === null) {
      game.current = new Phaser.Game({...config, parent: 'game-container'});

      if (typeof ref === 'function') {
        ref({ game: game.current, scene: null });
      } else if (ref) {
        ref.current = { game: game.current, scene: null };
      }
    }

    return () => {
      game.current?.destroy(true);
      if (game.current !== null) {
        game.current = null;
      }
    };
  }, [ref]);

  return (
    <div id="game-container" />
  );
});

// export const Gamet = () => {
//   const [game, setGame] = useState<Phaser.Game | null>(null);
//   const ref = useRef(null);
//   useEffect(() => {
//     if (!ref.current) return;

//     const newGame = new Phaser.Game({...config, parent: ref.current});
//     setGame(newGame);
    
//     return () => {
//       newGame?.destroy(true, true);
//     }
//   }, []);

//   return <div id="game-container" ref={ref} />;
// }

export default Game;
