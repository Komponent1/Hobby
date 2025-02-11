/* eslint-disable react/no-danger */
import React from 'react';
import "highlight.js/styles/a11y-dark.css";
import { Information } from './dto/informations';
import Navbar from "../common/common.components/common.components.navbar";

type Props = {
  information: Information;
  content: string;
};
const InformationsPidPage: React.FC<Props> = ({information, content}) => (
  <div>
    <Navbar />
    {information.title}
    <main className="mx-7 lg:mx-6 mt-32 mb-32 grow">
      <div dangerouslySetInnerHTML={{__html: content}} />
    </main>
  </div>
);
export default InformationsPidPage;
