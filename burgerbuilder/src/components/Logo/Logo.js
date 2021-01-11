import React from "react";

// when the project is deployed webpack build the whole project
// in the memory and than give us the project. However when we
// want to deploy our project on the server we would be able to
// build that folder and see that folder by running npm run build
// but this built project will not be aware of the path of the logo
// image. So to make webpack aware that this is the image and than
// webpack would optimize the image by itself we just have to import
// the image. So that burgerLogo would receive the path of the image
// and save that too.
import burgerLogo from "../../assets/images/burger-logo.png";
import Classes from "./Logo.module.css";

const Logo = (props) => (
  <div className={Classes.Logo}>
    <img src={burgerLogo} alt="MyBurger" style={{ height: props.height }} />
  </div>
);

export default Logo;
