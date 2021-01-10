import React from "react";
import Classes from "./Burger.module.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const Burger = (props) => {
  // This would give an aray of object keys but values are not part of the array
  let transformedIngredients = Object.keys(props.ingredients)
    .map((igKey) => {
      return [...Array(props.ingredients[igKey])].map((_, i) => {
        return <BurgerIngredient key={igKey + i} type={igKey} />;
      });
    })
    // This is how we flattened the array
    .reduce((prevarr, currarr) => {
      return prevarr.concat(currarr);
    }, []);

  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please Start adding ingredients!</p>;
  }
  console.log(transformedIngredients);
  // We are passing the props ingredients which is an object
  // and on object we can't use the functions of an array
  // so we would need to convert the object into an array
  // which is not that difficult in the javascript
  return (
    <div className={Classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default Burger;
