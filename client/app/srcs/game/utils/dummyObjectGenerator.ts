export const genTestRectangle = ({
  scene,
  w,
  h,
  x,
  y,
  color = 0x00ff00,
  isStatic = false,
}: {
  scene: Phaser.Scene;
  w: number;
  h: number;
  x: number;
  y: number;
  color?: number;
  isStatic?: boolean;
}) => {
  // 동적 그래픽 생성
  const graphics = scene.make.graphics({ x: 0, y: 0 });
  graphics.fillStyle(color, 1);
  graphics.fillRect(0, 0, w, h);

  // 그래픽을 텍스처로 변환
  const key = `rect_${Date.now()}_${Math.random()}`;
  graphics.generateTexture(key, w, h);
  graphics.destroy();

  // physics.add.sprite으로 생성 (physics body 자동 추가)
  const sprite = scene.physics.add.sprite(x, y, key);

  // static 설정
  if (isStatic) {
    sprite.body.setImmovable(true);
  }

  return sprite as Phaser.Physics.Arcade.Sprite;
};

export const genTestCircle = ({
  scene,
  radius,
  x,
  y,
  color = 0x00ff00,
  isStatic = false,
}: {
  scene: Phaser.Scene;
  radius: number;
  x: number;
  y: number;
  color?: number;
  isStatic?: boolean;
}) => {
  // 동적 그래픽 생성
  const graphics = scene.make.graphics({ x: 0, y: 0 });
  graphics.fillStyle(color, 1);
  graphics.fillCircle(radius, radius, radius);

  // 그래픽을 텍스처로 변환
  const key = `circle_${Date.now()}_${Math.random()}`;
  graphics.generateTexture(key, radius * 2, radius * 2);
  graphics.destroy();

  // physics.add.sprite으로 생성 (physics body 자동 추가)
  const sprite = scene.physics.add.sprite(x, y, key);

  // static 설정
  if (isStatic) {
    sprite.body.setImmovable(true);
  }

  return sprite as Phaser.Physics.Arcade.Sprite;
};
