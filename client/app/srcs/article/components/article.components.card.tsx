import {Card, Badge, useTheme} from '@seolim/designsystem';
import React, {useCallback, useMemo} from 'react';
import {useRouter} from 'next/router';

type Props = {
  id: number;
  photo?: string;
  title: string;
  tags: string[];
};
const ArticleCard: React.FC<Props> = ({
  id, photo, title, tags,
}) => {
  const { color } = useTheme().theme;
  const router = useRouter();
  const onLink = useCallback(() => {
    router.push(`/article/${id}`);
  }, [id, router]);
  const colors = useMemo(() => ([
    color.primary.main,
    color.warning.main,
  ]), [color]);
  return (
    <div onClick={onLink} className="cursor-pointer h-full">
      <Card
        type="image-content"
        src={photo || 'logo.png'}
        alt={title}
        hoverType="lift"
        size="md"
        autoPadding={false}
      >
        <div className="p-2 h-32 border-t border-t-gray-200 dark:border-t-gray-700">
          <div className="font-semibold text-lg mb-2">
            {title}
          </div>
          <div className="flex gap-2 flex-wrap">
            {tags.map((tag, index) => (
              <Badge variant="hard" size="sm" corner="square" color={colors[index % colors.length]} key={`${title}_badge_${tag}`} text={tag} />
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ArticleCard;
