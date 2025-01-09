import React from 'react';
import {Typography} from '../../common/common.components';

type Props = {
  title: string;
  information: string;
};
const Infobox: React.FC<Props> = ({
  title,
  information,
}) => (
  <div className="group">
    <div className="rounded bg-white border border-gray-300 group-hover:shadow-lg group-hover:border-white h-full">
      <div className="p-6 flex flex-col">
        <Typography type="h5" color="text-black" customClass="mb-4">
          {title}
        </Typography>
        <Typography type="h3" color="text-black">
          {information}
        </Typography>
      </div>
    </div>
  </div>
);
export default Infobox;
