import React from "react";
const handleThemes = (event) => {
  if (event) {
    const parentDiv = event.target.parentElement;
    parentDiv.className = "App " + event.target.value;
  }
};

function Themes() {
  return (
    <select className="theme_btn" onChange={handleThemes}>
      <option value="theme1">Theme-1</option>
      <option value="theme2">Theme-2</option>
    </select>
  );
}

export default Themes;
