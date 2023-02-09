const data = require("./dictonary.json");
data.sort();

const generateWord = (level) => {
  function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1));
  }

  const dictonary = data.filter((word) => {
    if (level === "easy") {
      return word.length <= 4;
    } else if (level === "medium") {
      return (word.length > 4 && word.length <= 8)
    } else if (level === "hard") {
      return word.length > 8;
    }else{
      return "NO LEVEL"
    }
  });

  const word = dictonary[random(0 , dictonary.length-1)]
  return word.toUpperCase();
};

export default generateWord;
