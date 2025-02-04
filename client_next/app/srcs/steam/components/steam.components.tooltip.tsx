import React, { useState } from 'react';

enum TooltipState {
  HIDE = 'HIDE',
  SHOW = 'SHOW',
}
type Props = {
  tooltipText: string;
};
const Tooltip: React.FC<Props> = ({tooltipText}) => {
  const [state, setState] = useState<TooltipState>(TooltipState.HIDE);

  return (
    <div>
      <button
        data-tooltip-target="tooltip-default"
        type="button"
        className="border-2 rounded-full text-slate-300 bg-opacity-0 font-extrabold border-slate-300 text-center w-5 h-5 flex justify-center items-center text-xs hover:bg-slate-300 hover:text-slate-900"
        onClick={
          () => setState(state === TooltipState.SHOW ? TooltipState.HIDE : TooltipState.SHOW)
        }
      >
        ?
      </button>
      {state === TooltipState.SHOW && (
      <div id="tooltip-default" role="tooltip" className="absolute z-50 inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm tooltip">
        {tooltipText}
        <div className="tooltip-arrow" data-popper-arrow />
      </div>
      )}
    </div>
  );
};

export default Tooltip;
