import { BlockType } from "../constant/ten-bricks.constant.stage";

export interface RefPhaserGame {
  game: Phaser.Game | null;
  scene: Phaser.Scene | null;
}
export type Block = {
  type: BlockType;
  value: number;
};
