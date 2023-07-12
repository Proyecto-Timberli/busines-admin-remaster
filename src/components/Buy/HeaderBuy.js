import React from "react";
import CardButton from "./CardButton";
import SelectProvider from './SelectProvider';
import SelectWayToPay from "./SelectWayToPay";


export default function  Header({
  setWayToPay, 
  wayToPay,
  addProduct,
  productInStore,
  setProductInStore,
  clean,
  setProvider,
  provider,
  register,
}) {

  return (
    <>
      <div className="relative bg-fuchsia-500 dark:bg-fuchsia-950 md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            <div className="flex flex-wrap justify-center">
              <CardButton
                statSubtitle="Add product"
                statTitle="Add"
                statIconName="cart"
                statIconColor="bg-orange-500"
                onPress={addProduct}
              />
               <CardButton
                statSubtitle="Clean car"
                statTitle="Clean"
                statIconName="clean"
                statIconColor="bg-red-500"
                onPress={clean}
              />
               <CardButton
                statSubtitle="Register buy"
                statTitle="Register"
                statIconName="register"
                statIconColor="bg-green-500"
                onPress={register}
              />
            </div>
            <div className="flex flex-wrap justify-center">
            <SelectWayToPay setState={setWayToPay} state={wayToPay}/>
            <SelectProvider setState={setProvider} state={provider}/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}