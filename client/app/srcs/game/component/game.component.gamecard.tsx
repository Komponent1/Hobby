import React from "react";
import { Card, Typography, useTheme } from "@seolim/designsystem";
import type { GameConfig } from "../game.page";

type Props = GameConfig[string] & {
  onLink: () => void;
};
const GameCard: React.FC<Props> = ({
  title,
  description,
  thumbnail,
  onLink,
}) => {
  const { theme } = useTheme();
  return (
    <div>
      <Card
        type="image-content"
        hoverType="lift"
        src={thumbnail}
        autoPadding={false}
      >
        <div
          style={{ backgroundColor: theme.color.neutral[400] }}
          className="h-full p-4"
        >
          <Typography type="primary" size="2xl" weight="bold" onClick={onLink}>
            {title}
          </Typography>
          <Typography element="p" type="secondary" size="md">
            {description}
          </Typography>
        </div>
      </Card>
    </div>
  );
};
export default GameCard;
