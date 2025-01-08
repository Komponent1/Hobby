/* eslint-disable react/no-danger */
import React, { useEffect } from 'react';
import "highlight.js/styles/a11y-dark.css";
import { InformationList } from './dto/informations';
import Navbar from "../common/common.components/common.components.navbar";
import { useInformation } from "./store/informtaions.store.information";

type Props = {
  informations: InformationList[];
};
const InformationsPage: React.FC<Props> = ({informations}) => {
  const {openId, informationList, actions} = useInformation();
  const {open, close, init} = actions;

  useEffect(() => {
    init(informations);
  }, [informations, init]);

  return (
    <div>
      <Navbar />
      <main className="mx-7 lg:mx-6 mt-32 mb-32 flex-grow">
        <div id="accordion-collapse" data-accordion="collapse">
          {informationList.map((information) => (
            <div key={information.information.id}>
              <h2 id={`accordion-collapse-heading-${information.information.id}`}>
                <button
                  type="button"
                  className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
                  data-accordion-target={`#accordion-collapse-body-${information.information.id}`}
                  aria-expanded={openId === information.information.id}
                  aria-controls={`accordion-collapse-body-${information.information.id}`}
                  onClick={
                    () => (
                      openId === information.information.id
                        ? close() : open(information.information.id)
                    )
                  }
                >
                  <span>{information.information.title}</span>
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
          ))}
        </div>
      </main>
    </div>
  );
};
export default InformationsPage;
