/* eslint-disable react/no-danger */
import React from 'react';
import {InformationList} from '../dto/informations';

type AccordionItemProps = {
  information: InformationList;
  open: (id: number) => void;
  close: () => void;
  openId: number;
};
const AccordionItem: React.FC<AccordionItemProps> = ({
  information, open, close, openId,
}) => (
  <div key={information.information.id}>
    <h2 id={`accordion-collapse-heading-${information.information.id}`}>
      <button
        type="button"
        data-accordion-target={`#accordion-collapse-body-${information.information.id}`}
        className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-gray-200 focus:bg-gray-100 gap-3"
        aria-expanded={openId === information.information.id}
        aria-controls={`accordion-collapse-body-${information.information.id}`}
        onClick={
                    () => (
                      openId === information.information.id
                        ? close() : open(information.information.id)
                    )
                  }
      >
        <div>
          <span className="mr-5">{information.information.title}</span>
          {information.information.tags.map((tag) => (
            <span key={tag} className="rounded-md bg-slate-800 py-0.5 px-2.5 border border-transparent text-sm text-white transition-all shadow-sm mr-2">
              {`# ${tag}`}
            </span>
          ))}
        </div>
        <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5" />
        </svg>
      </button>
    </h2>
    <div id={`accordion-collapse-body-${information.information.id}`} className={openId === information.information.id ? 'block' : 'hidden'} aria-labelledby={`accordion-collapse-heading-${information.information.id}`}>
      <div className="p-5 border border-b-0 border-gray-200 bg-white">
        <div className="bg-white markdown-body" dangerouslySetInnerHTML={{__html: information.content}} />
      </div>
    </div>
  </div>
);

type Props = {
  informations: InformationList[];
  openId: number;
  open: (id: number) => void;
  close: () => void;
};
const Accordion: React.FC<Props> = ({
  informations, openId, open, close,
}) => (
  <div id="accordion-collapse" data-accordion="collapse">
    {informations.map((information) => (
      <AccordionItem
        key={`info_${information.information.id}`}
        information={information}
        openId={openId}
        open={open}
        close={close}
      />
    ))}
  </div>
);

export default Accordion;
