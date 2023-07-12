import React from "react";

// components

import CardButton from "./CardButton.js";

export default function Header({deleted}) {
  return (
    <>
      {/* Header */}
      <div className="relative bg-fuchsia-500 dark:bg-fuchsia-950 md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardButton
                  statSubtitle="Delete product"
                  statTitle="Delete"
                  statIconName="delete"
                  statIconColor="bg-red-500"
                  onPress={deleted}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
