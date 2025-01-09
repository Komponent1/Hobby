/* eslint-disable react/no-danger */
import React from 'react';
import { Information } from './dto/informations';

type Props = {
  information: Information;
  content: string;
};
const InformationsPidPage: React.FC<Props> = ({information, content}) => (
  <div>
    <h1>{information.title}</h1>
    <div dangerouslySetInnerHTML={{__html: content}} />
  </div>
);
export default InformationsPidPage;
