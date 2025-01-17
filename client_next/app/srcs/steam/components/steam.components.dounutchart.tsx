import React, {useMemo } from 'react';
import dynamic from "next/dynamic";
import type { ApexOptions } from "apexcharts";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const COLOR_MAP = [
  "#b30000", "#7c1158", "#4421af", "#1a53ff", "#0d88e6", "#00b7c7", "#5ad45a", "#8be04e", "#ebdc78",
].reverse();
const MAX_VIEW_COUNT = 8;

type Props<T> = {
  datas: T[];
  nameKey: keyof T;
  totalLabel: string;
};
const Dounutchart = <T extends {count: number}>({datas, nameKey, totalLabel}: Props<T>) => {
  const series = useMemo(
    () => datas.map((data) => data.count).slice(0, MAX_VIEW_COUNT).reverse(),
    [datas],
  );
  const chartOptions: ApexOptions = useMemo(() => ({
    colors: COLOR_MAP.slice(0, MAX_VIEW_COUNT),
    stroke: {
      colors: ["transparent"],
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              show: true,
              fontFamily: "Inter, sans-serif",
              offsetY: 20,
            },
            total: {
              showAlways: true,
              show: true,
              label: totalLabel,
              fontFamily: "Inter, sans-serif",
              color: "#fff",
              formatter() {
                return datas[0][nameKey] as string;
              },
            },
            value: {
              show: true,
              fontFamily: "Inter, sans-serif",
              offsetY: -20,
              color: "#fff",
              formatter(value: string) {
                return `${value}`;
              },
            },
          },
          size: "80%",
        },
      },
    },
    grid: {
      padding: {
        top: -2,
      },
    },
    labels: [...datas.map((data) => data[nameKey] as string).slice(0, MAX_VIEW_COUNT).reverse()],
    dataLabels: {
      enabled: false,
    },
    legend: {
      position: "bottom",
      fontFamily: "Inter, sans-serif",
      labels: {
        colors: "#fff",
      },
    },
    yaxis: {
      labels: {
        style: {
          fontFamily: "Inter, sans-serif",
          colors: "#fff",
        },
        formatter(value: number) {
          return `${value}`;
        },
      },
    },
    xaxis: {
      labels: {
        style: {
          fontFamily: "Inter, sans-serif",
          colors: "#fff",
        },
        formatter(value: string) {
          return `${value}`;
        },
      },
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
    },
  }), [datas, nameKey, totalLabel]);

  return (
    <ApexChart
      options={chartOptions}
      series={series}
      type="donut"
      height={320}
      width="100%"
    />
  );
};

export default Dounutchart;
