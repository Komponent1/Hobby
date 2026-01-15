import { Progress } from "@seolim/designsystem";
import React from "react";

type Props = {
  range: number;
};
/**
 * range: % string ex> '50%'
 * backgroundColor: tailwind bg color
 * barColor: tailwind bg color
 */
const ProgressBar: React.FC<Props> = ({ range = 0.5 }) => (
  <Progress size="lg" progress={range} />
);

export default ProgressBar;
