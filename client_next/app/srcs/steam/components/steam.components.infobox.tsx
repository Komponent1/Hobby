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
  <>
    <Typography type="h6" color="text-white" customClass="mb-4">
      {title}
    </Typography>
    <Typography type="h2" color="text-white" customClass="mb-0 md:text-center text-center opacity-100">
      {information}
    </Typography>
  </>
);
export default Infobox;
