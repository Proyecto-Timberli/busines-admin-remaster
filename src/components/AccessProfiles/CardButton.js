import React from "react";
import Icon from '@mdi/react';
import { mdiPackageVariantClosedPlus } from '@mdi/js';
import { mdiLabel } from '@mdi/js';

export default function CardButton({
  statSubtitle,
  statTitle,
  statIconColor,
  statIconName,
  onPress
}) {

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg dark:bg-stone-700 mr-4"
        onClick={onPress}>
        <div className="flex-auto p-4">
          <div className="flex flex-wrap">
            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
              <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                {statSubtitle}
              </h5>
              <span className="font-semibold text-xl text-blueGray-700 dark:text-white">
                {statTitle}
              </span>
            </div>
            <div className="relative w-auto pl-4 flex-initial">
              <div
                className={
                  "text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full " +
                  statIconColor
                }
              >
                {statIconName === "print"?
                <Icon path={ mdiPackageVariantClosedPlus } size={1} />:
                <Icon path={ mdiLabel} size={1} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

