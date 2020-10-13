import React from "react";
import "./Switch.css";
import Propstype from "prop-types";

function Switch({active ,onHandelChange}) {
  return (
    <label className="switch" >
      <input type="checkbox" checked={active ? true : false} />
      <span className="slider round" onClick={onHandelChange}></span>
    </label>
  );
}
Switch.default={
  active:false,
  onHandelChange:()=>{}
}
Switch.prototype={
  active:Propstype.bool.isRequired,
  onHandelChange:Propstype.func
}
export default Switch;
