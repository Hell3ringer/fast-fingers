import { useEffect, useState } from "react";

function random(min, max) {
  return Math.floor(Math.random() * max - min + 1);
}

export default function useWord(params) {
  const dictonaryEasy = [
    "GOOD",
    "NICE",
    "DAY",
    "SAD",
    "SIT",
    "Bake",
    "Word",
    "List",
    "Four",
    "Five",
    "Nine",
    "Good",
    "Best",
    "Cute",
    "Zero",
    "Huge",
    "Cool",
    "Tree",
    "Race",
    "Rice",
    "Keep",
    "Lace",
    "Beam",
    "Game",
    "Mars",
    "Tide",
    "Ride",
    "Hide",
    "Exit",
    "Hope",
    "Cold",
    "From",
    "Need",
    "Stay",
    "Come",
  ];

  const dictonaryMedium = [
    "SPLIT",
    "SPEED",
    "OPTION",
    "HAPPY",
    "Gateway",
    "General",
    "Genetic",
    "Genuine",
    "Gigabit",
    "Greater",
    "Hanging",
    "Heading",
    "Healthy",
    "Hearing",
    "Heavily",
    "ENERGY",
    "Better",
    "Beyond",
    "Bishop",
    "Border",
    "Bottle",
    "Liberty",
    "Library",
    "License",
    "Limited",
    "Listing",
    "Logical",
    "Loyalty",
    "Machine",
    "Manager",
    "Married",
    "Massive",
    "Maximum",
    "Meaning",
    "Measure",
    "Medical",
    "Meeting",
    "Mention",
    "Message",
  ];

  const dictonaryHard = [
    "CONGRATULATIONS",
    "HELLICOPTER",
    "TABLETENNIS",
    "PRAGMATICPLAY",
    "EXTENSION",
    "Adolescent",
    "Adoptively",
    "Adorningly",
    "Adrenaline",
    "Adrenergic",

    "Pickaback",
    "Pipsqueak",
    "Publicize",
    "Quaffable",
    "Quantizer",
    "Quickfire",
  ];
  const [word, setWord] = useState("");
  useEffect(() => {
    switch (params.level) {
      case "easy":
        // console.log("d", random(0, 4));
        setWord(dictonaryEasy[random(0, dictonaryEasy.length - 1)]);
        break;

      case "medium":
        setWord(dictonaryMedium[random(0, dictonaryMedium.length - 1)]);
        break;

      case "hard":
        setWord(dictonaryHard[random(0, dictonaryHard.length - 1)]);
        break;
      default:
        setWord("No LEVEL");
        break;
    }
    //   console.log("word", word);

    //   return () => word.toUpperCase();
  }, [params.level, params.wonCount]);
  return word.toUpperCase();
}

// export  {dictonaryEasy , dictonaryMedium , dictonaryHard}
