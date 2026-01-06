import React, {ReactNode} from 'react';
import {Card, Typography} from '@seolim/designsystem';
import { Icon } from '../../common/common.components';

/**
 * iconBackground: tailwindcss class
 * - bg-lime-600
 */
type Props = {
  title: string;
  description: string;
  onLink: () => void;
  icon?: string;
  iconBackground?: string;
  etc?: ReactNode;
};
export const SimpleCard: React.FC<Props> = ({
  title, description, onLink, etc, icon, iconBackground = 'bg-lime-600',
}) => (
  <Card type="content" hoverType="lift" size="lg">
    <div onClick={onLink} className="flex flex-col justify-between p-6 cursor-pointer h-74">
      <div>
        {icon && (
        <div className="flex justify-end">
          <div className={`rounded-sm w-10 h-10 flex justify-center items-center ${iconBackground}`}>
            <Icon name={icon} size={24} color="white" />
          </div>
        </div>
        )}
        <div className="mb-2">
          <Typography element="p" type="primary" size="3xl" weight="bold">{title}</Typography>
        </div>
        <Typography element="p" type="secondary" size="md">{description}</Typography>
      </div>

      <div className="mt-4">
        {etc}
      </div>
    </div>
  </Card>
);
