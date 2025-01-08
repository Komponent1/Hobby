import React from 'react';
import {Information} from '../dto/informations';

type AccordionItemProps = {
  information: Information;
};
const AccordionItem: React.FC<AccordionItemProps> = ({information}) => (
  <div className="border border-gray-200 dark:border-gray-700">
    {information.title}
  </div>
);

type Props = {
  informations: Information[];
};
const Accordion: React.FC<Props> = ({informations}) => (
  <div id="accordion-collapse" data-accordion="collapse">
    {informations.map((information) => (
      <AccordionItem key={`info_${information.id}`} information={information} />
    ))}
  </div>
);

export default Accordion;
