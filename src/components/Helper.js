export const ingredientFoodHelper = (foodDetails) => {
  const ingMax = 15;
  const ingredientsKeys = foodDetails && (
    Object.keys(foodDetails.meals[0]).filter((key) => key.includes('ngredient')));
  const measureKeys = foodDetails && (
    Object.keys(foodDetails.meals[0]).filter((key) => key.includes('easure')));
  const ingredientMap = ingredientsKeys && ingredientsKeys
    .filter((value) => foodDetails.meals[0][value])
    .map((ing, i) => (
      `- ${foodDetails.meals[0][ing]} - ${foodDetails.meals[0][measureKeys[i]]}`
    )).slice(0, ingMax);
  const ingredientFilter = ingredientMap && ingredientMap
    .filter((value) => value !== 'null-null' && value !== '-');
  return ingredientFilter;
};

export const ingredientDrinkHelper = (drinkDetails) => {
  const ingMax = 15;
  const ingredientsKeys = drinkDetails && (
    Object.keys(drinkDetails.drinks[0]).filter((key) => key.includes('ngredient')));
  const measureKeys = drinkDetails && (
    Object.keys(drinkDetails.drinks[0]).filter((key) => key.includes('easure')));
  const ingredientMap = ingredientsKeys && ingredientsKeys
    .filter((value) => drinkDetails.drinks[0][value])
    .map((ing, i) => (
      `- ${drinkDetails.drinks[0][ing]} - ${drinkDetails.drinks[0][measureKeys[i]]}`
    )).slice(0, ingMax);
  const ingredientFilter = ingredientMap && ingredientMap
    .filter((value) => value !== 'null-null' && value !== '-');
  return ingredientFilter;
};
