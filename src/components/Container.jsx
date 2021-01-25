import React, { useState } from "react";
import Dustbin from "./Dustbin";
import InitialBox from "./InitialBox";
import Air from "./../img/air.png";
import Fire from "./../img/fire.png";
import Earth from "./../img/earth.png";
import WorkspaceBg from "./../img/workspace-background.png";
import LibraryBg from "./../img/library-background.png";
// import update from 'immutability-helper';

// CSS container
const style = {
  overflow: "hidden",
  clear: "both",
  width: "100vw",
  height: "100vh",
  display: "flex",
  justifyContent: "space-between",
  backgroundImage: "url(" + WorkspaceBg + ")",
};

export const Container = () => {
  // Cac phan tu khoi tao o cot ben phai
  const [initialItems, setInitialItems] = useState({
    air: { id: 0, name: "air", url: Air },
    fire: { id: 1, name: "fire", url: Fire },
    earth: { id: 2, name: "earth", url: Earth },
  });

  // Them item moi vao phan tu khoi tao
  const addNewItem = (newItem) => {
    if (newItem) {
      setInitialItems(
        Object.assign({}, initialItems, {
          [newItem.name]: {
            id: newItem.id,
            name: newItem.name,
            url: newItem.url,
          },
        })
      );
    }
  };

  // Tao phan cac phan tu khoi tao
  const itemElements = Object.keys(initialItems).map((item, index) => {
    const { id, name, url } = initialItems[item];
    return <InitialBox key={index} id={id} name={name} url={url} />;
  });

  return (
    <div style={style}>
      <div style={{ width: "80%", borderRight: "5px solid gray" }}>
        <Dustbin addNewItem={addNewItem} />
      </div>

      <div
        style={{
          overflowY: "auto",
          clear: "both",
          width: "20%",
          display: "flex",
          flexDirection: "column",
          backgroundImage: "url(" + LibraryBg + ")",
        }}
      >
        {itemElements}
      </div>
    </div>
  );
};
