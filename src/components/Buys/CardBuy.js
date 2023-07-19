import React from "react";
import PropTypes from "prop-types";
import { formatDate, financial } from '@/apiFunctions/apiFunctions';
export default function CardStats({
  id,
  date,
  total,
  provider,
  resume,
}) {
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-slate-300 rounded  xl:mb-0 shadow-lg dark:bg-stone-700 py-1 ">
        <div className="flex flex-wrap justify-around items-center">
          <h5 className="text-blueGray-700 dark:text-slate-300 uppercase font-bold text-xs lg:w-1/4">
            {id}  
          </h5>
          <span className="font-bold text-xs text-blueGray-700 dark:text-slate-300 lg:w-1/4">
            {financial(total)}
          </span>      
          <p className="text-sm text-blueGray-700 dark:text-slate-300 mt-4 lg:w-1/4" >
          <span className="text-blueGray-700 dark:text-slate-300 uppercase font-bold text-xs lg:w-1/4">
            {provider?provider:"No asignado"}
          </span>
          </p>
          <span className="text-blueGray-700 dark:text-slate-300 uppercase font-bold text-xs lg:w-1/4">{formatDate(date).formatDate+" / "+formatDate(date).hora}</span>
          
        </div>
      </div>
    </>
  );
}

CardStats.defaultProps = {
  statSubtitle: "Traffic",
  statTitle: "350,897",
  statArrow: "up",
  statPercent: "3.48",
  statPercentColor: "text-emerald-500",
  statDescripiron: "Since last month",
  statIconName: "far fa-chart-bar",
  statIconColor: "bg-red-500",
};

CardStats.propTypes = {
  statSubtitle: PropTypes.string,
  statTitle: PropTypes.string,
  statArrow: PropTypes.oneOf(["up", "down"]),
  statPercent: PropTypes.string,
  // can be any of the text color utilities
  // from tailwindcss
  statPercentColor: PropTypes.string,
  statDescripiron: PropTypes.string,
  statIconName: PropTypes.string,
  // can be any of the background color utilities
  // from tailwindcss
  statIconColor: PropTypes.string,
};
