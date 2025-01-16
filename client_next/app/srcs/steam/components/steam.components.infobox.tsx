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
    <Typography type="h5" color="text-black" customClass="mb-4">
      {title}
    </Typography>
    <Typography type="h3" color="text-black">
      {information}
    </Typography>
  </>
);
export default Infobox;
