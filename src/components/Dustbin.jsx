import React, { useState } from "react";
import { useDrop } from "react-dnd";
import NewBox from "./NewBox";
import { ItemTypes } from "./../constants/ItemTypes";

// Import Image
import Dust from "./../img/dust.png";
import Energy from "./../img/energy.png";
import Lava from "./../img/lava.png";
import Stone from "./../img/stone.png";
import Wind from "./../img/wind.png";
import Earthquake from "./../img/earthquake.png";
import Volcano from "./../img/volcano.png";
import Gunpowder from "./../img/gunpowder.png";

// CSS Block chua cac item duoc tha vao
const style = {
  height: "100%",
  width: "100%",
  color: "white",
  textAlign: "center",
  fontSize: "1rem",
  position: "relative",
};

// Array chua cac item duoc tha vao
const listItems = [];

// Array chua cac item moi khi merge
const listNewItems = {
  dust: {
    id: 3,
    name: "dust",
    url: Dust,
  },
  energy: {
    id: 4,
    name: "energy",
    url: Energy,
  },
  lava: {
    id: 5,
    name: "lava",
    url: Lava,
  },
  stone: {
    id: 6,
    name: "stone",
    url: Stone,
  },
  wind: {
    id: 7,
    name: "wind",
    url: Wind,
  },
  earthquake: {
    id: 8,
    name: "earthquake",
    url: Earthquake,
  },
  volcano: {
    id: 9,
    name: "volcano",
    url: Volcano,
  },
  gunpowder: {
    id: 10,
    name: "gunpowder",
    url: Gunpowder,
  },
};

const Dustbin = ({ addNewItem }) => {
  const [sttState, setSttState] = useState(0);

  // Xua ly drop
  var [{ canDrop, isOver }, drop] = useDrop({
    accept: ItemTypes.BOX,
    drop(item, monitor) {
      // Lay chieu rong cua khung chua cac item
      const parentWidth = document.getElementById("div").offsetWidth;
      // Lay left, top, cua item sau khi tha
      const leftItem = `${Math.round(
        (monitor.getSourceClientOffset().x / parentWidth) * 100
      )}%`;
      const topItem = Math.round(monitor.getSourceClientOffset().y);

      // Them Item moi vao khung
      if (
        monitor.getInitialSourceClientOffset().x >
        (window.innerWidth * 80) / 100
      ) {
        //Kiem tra xem item co nam o cot ben khoi tao k
        addItem(sttState, item.id, item.name, item.url, leftItem, topItem);
      } else {
        // Di chuyen cac item trong khung
        moveBox(item.stt, leftItem, topItem);
      }
      // Sap nhap 2 item thanh item moi
      if (item.stt !== undefined) {
        mergeItem(item.stt, item.name, leftItem, topItem);
      } else {
        var lengthList = listItems.length;
        mergeItem(listItems[lengthList - 1].stt, item.name, leftItem, topItem);
      }
      // debugger;
      return undefined;
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  // Ham them item moi vao khung
  var addItem = (stt, idItem, nameItem, urlItem, leftItem, topItem) => {
    listItems.push({
      stt: stt,
      id: idItem,
      name: nameItem,
      url: urlItem,
      left: leftItem,
      top: topItem,
    });
    setSttState(sttState + 1);
  };
  // Cap nhat lai state
  // var updateBoxes = () => {
  //     var i = 0;
  //     afterBox.boxes.forEach(box => {
  //         box.count = i;
  //         i++;
  //     });
  // }

  // Ham di chuyen cac item trong khung
  const moveBox = (sttItem, leftItem, topItem) => {
    listItems.forEach((item) => {
      if (item.stt === sttItem) {
        item.left = leftItem;
        item.top = topItem;
      }
    });
  };

  // Delete Item when x > 80% window width
  const deleteItem = (stt) => {
    var findItem = listItems.find((item) => item.stt === stt);
    var index = listItems.indexOf(findItem);
    if (index > -1) {
      listItems.splice(index, 1);
    }
  };

  // Ham sap nhap 2 item
  const mergeItem = (sttPicked, namePicked, leftPicked, topPicked) => {
    listItems.forEach((item) => {
      var intItemLeft = item.left.slice(0, item.left.length - 1);
      intItemLeft = parseInt(intItemLeft);
      var intLeftPick = parseInt(leftPicked.slice(0, leftPicked.length));
      if (item.stt !== sttPicked) {
        if (
          intItemLeft - 10 <= intLeftPick &&
          intLeftPick <= intItemLeft + 10
        ) {
          if (item.top - 10 <= topPicked && topPicked <= item.top + 10) {
            handleMerge(
              item.name,
              namePicked,
              item.stt,
              sttPicked,
              item.left,
              item.top
            );
          }
        }
      }
    });
  };
  const handleMerge = (
    nameItem,
    namePicked,
    sttItem,
    sttPicked,
    leftItem,
    topItem
  ) => {
    if (namePicked === "air") {
      switch (nameItem) {
        case "earth":
          handleSwitchCase(
            listNewItems.dust,
            leftItem,
            topItem,
            sttPicked,
            sttItem
          );
          break;
        case "fire":
          handleSwitchCase(
            listNewItems.energy,
            leftItem,
            topItem,
            sttPicked,
            sttItem
          );
          break;
        case "lava":
          handleSwitchCase(
            listNewItems.stone,
            leftItem,
            topItem,
            sttPicked,
            sttItem
          );
          break;
        case "energy":
          handleSwitchCase(
            listNewItems.wind,
            leftItem,
            topItem,
            sttPicked,
            sttItem
          );
          break;
        default:
          break;
      }
    } else if (namePicked === "earth") {
      switch (nameItem) {
        case "air":
          handleSwitchCase(
            listNewItems.dust,
            leftItem,
            topItem,
            sttPicked,
            sttItem
          );
          break;
        case "fire":
          handleSwitchCase(
            listNewItems.lava,
            leftItem,
            topItem,
            sttPicked,
            sttItem
          );
          break;
        case "energy":
          handleSwitchCase(
            listNewItems.earthquake,
            leftItem,
            topItem,
            sttPicked,
            sttItem
          );
          break;
        case "lava":
          handleSwitchCase(
            listNewItems.volcano,
            leftItem,
            topItem,
            sttPicked,
            sttItem
          );
          break;
        default:
          break;
      }
    } else if (namePicked === "fire") {
      switch (nameItem) {
        case "air":
          handleSwitchCase(
            listNewItems.energy,
            leftItem,
            topItem,
            sttPicked,
            sttItem
          );
          break;
        case "earth":
          handleSwitchCase(
            listNewItems.lava,
            leftItem,
            topItem,
            sttPicked,
            sttItem
          );
          break;
        case "dust":
          handleSwitchCase(
            listNewItems.gunpowder,
            leftItem,
            topItem,
            sttPicked,
            sttItem
          );
          break;
        default:
          break;
      }
    } else if (namePicked === "dust") {
      switch (nameItem) {
        case "fire":
          handleSwitchCase(
            listNewItems.gunpowder,
            leftItem,
            topItem,
            sttPicked,
            sttItem
          );
          break;
        default:
          break;
      }
    } else if (namePicked === "lava") {
      switch (nameItem) {
        case "air":
          handleSwitchCase(
            listNewItems.stone,
            leftItem,
            topItem,
            sttPicked,
            sttItem
          );
          break;
        case "earth":
          handleSwitchCase(
            listNewItems.volcano,
            leftItem,
            topItem,
            sttPicked,
            sttItem
          );
          break;
        default:
          break;
      }
    } else if (namePicked === "energy") {
      switch (nameItem) {
        case "air":
          handleSwitchCase(
            listNewItems.wind,
            leftItem,
            topItem,
            sttPicked,
            sttItem
          );
          break;
        case "earth":
          handleSwitchCase(
            listNewItems.earthquake,
            leftItem,
            topItem,
            sttPicked,
            sttItem
          );
          break;
        default:
          break;
      }
    }
  };
  const handleSwitchCase = (
    newNameItem,
    leftItem,
    topItem,
    sttPicked,
    sttItem
  ) => {
    addItem(
      sttState,
      newNameItem.id,
      newNameItem.name,
      newNameItem.url,
      leftItem,
      topItem
    );
    deleteItem(sttPicked);
    deleteItem(sttItem);
    addNewItem(newNameItem);
  };

  // Tao cac item de hien thi ra man hinh
  const createElement = listItems.map((item, index) => {
    return (
      <NewBox
        key={index}
        stt={item.stt}
        id={item.id}
        name={item.name}
        url={item.url}
        left={item.left}
        top={item.top}
        deleteItem={deleteItem}
        addNewItem={addNewItem}
      />
    );
  });

  return (
    <div id="div" ref={drop} style={style}>
      {createElement}
    </div>
  );
};

export default Dustbin;
