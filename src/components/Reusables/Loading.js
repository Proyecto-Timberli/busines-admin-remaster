import React from "react";
import { Spinner } from "react-activity";
import "react-activity/dist/library.css";

const Loading =({color = "#0a234be7"})=>{
  return (
    <div className="container flex justify-center items-center">
      <Spinner size={50} color={color} speed={1}/>
    </div>  
  )
}
export default Loading

