import React, {ReactNode} from 'react';

type Props = {
  front: ReactNode;
  back: ReactNode;
  onClick?: () => void;
};
const FlipCard: React.FC<Props> = ({front, back, onClick}) => (
  <button
    type="button"
    className="group w-48 h-48 [perspective:800px]"
    onClick={() => onClick && onClick()}
  >
    <div className="relative h-full w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
      <div className="absolute inset-0 h-full w-full rounded-xl bg-slate-500 [backface-visibility:hidden] p-6">
        {front}
      </div>
      <div className="absolute inset-0 h-full w-full rounded-xl bg-black/80 px-12 text-center text-slate-200 [transform:rotateY(180deg)] [backface-visibility:hidden] p-6">
        {back}
      </div>
    </div>
  </button>
);
export default FlipCard;
