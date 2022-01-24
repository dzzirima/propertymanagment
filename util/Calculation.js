

export const returnTotal = (arrayOfElement, fieldToSum) => {
    let sum = 0;
    let targetField = fieldToSum;
    arrayOfElement.forEach((element) => {
      sum = sum + element[`${targetField}`];
    });
    
    return sum;
  };
  