import React, {ReactNode} from 'react';
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
  <button
    type="button"
    className="flex shadow-lg p-4 bg-neutral-900 w-full h-96 flex-col hover:transition-transform hover:-translate-y-1 text-left overflow-hidden"
    onClick={() => onLink()}
  >
    {icon && (
    <div className="flex justify-end">
      <div className={`rounded-sm w-10 h-10 flex justify-center items-center ${iconBackground}`}>
        <Icon name={icon} size={24} color="white" />
      </div>
    </div>
    )}
    <h2 className="text-3xl font-bold mb-2 text-white">{title}</h2>
    <p className="text-neutral-300">{description}</p>
    <div className="h-full" />
    <div>
      {etc}
    </div>
    <div className="bottom-0 flex justify-end">
      <Icon name="arrow_down_right" size={24} color="white" />
    </div>
  </button>
);
