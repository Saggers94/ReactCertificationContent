import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Classes from "./SideDrawer.module.css";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Aux from "../../../hoc/Auxilliary/Auxiliary";

const SideDrawer = (props) => {
  let attachedClasses = [Classes.SideDrawer, Classes.Close];
  if (props.open) {
    attachedClasses = [Classes.SideDrawer, Classes.Open];
  }
  return (
    <Aux>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={attachedClasses.join(" ")}>
        {/* <Logo height="11%" /> */}
        <div className={Classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Aux>
  );
};

export default SideDrawer;
