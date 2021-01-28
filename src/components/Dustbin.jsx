/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import NewBox from './NewBox';
import { ItemTypes } from './../constants/ItemTypes';
import { forEach, findIndex, remove } from 'lodash';
import mergeTwoItem from './mergeTwoItem';

// CSS Block chua cac item duoc tha vao
const style = {
  height: '100%',
  width: '100%',
  color: 'white',
  textAlign: 'center',
  fontSize: '1rem',
  position: 'relative',
};

const Dustbin = ({ addNewItem }) => {
  const [list, setList] = useState({
    items: [],
    stt: 0
  });

  // Xua ly drop
  var [, drop] = useDrop({
    accept: ItemTypes.BOX,
    drop(item, monitor) {
      // Lay chieu rong cua khung chua cac item
      const parentWidth = document.getElementById('div').offsetWidth;
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
        addItem(list.stt, item.id, item.name, item.url, leftItem, topItem);
      } else {
        // Di chuyen cac item trong khung
        moveBox(item.stt, leftItem, topItem);
      }

      // Sap nhap 2 item thanh item moi
      mergeItem(item.stt, item.name, leftItem, topItem);
      // debugger;
      return undefined;
    }
  });

  // Ham them item moi vao khung
  const addItem = (stt, idItem, nameItem, urlItem, leftItem, topItem) => {
    setList({
      items: list.items.concat({
        stt: stt,
        id: idItem,
        name: nameItem,
        url: urlItem,
        left: leftItem,
        top: topItem
      }),
      stt: list.stt + 1
    });
  };

  // Ham di chuyen cac item trong khung
  const moveBox = (sttItem, leftItem, topItem) => {
    var listItemCopy = list.items.slice(0);
    const indexFind = findIndex(listItemCopy, (item) => item.stt === sttItem );
    listItemCopy[indexFind].left = leftItem;
    listItemCopy[indexFind].top = topItem;
    setList({
      items: listItemCopy,
      stt: list.stt
    });
  };

  // Delete Item when x > 80% window width
  const deleteItem = (sttDel) => {
    var listItemCopy = list.items.slice(0);
    remove(listItemCopy, (item) => item.stt === sttDel );
    setList({
      items : listItemCopy,
      stt : list.stt
    });
  };

  // Ham sap nhap 2 item
  const mergeItem = (sttPicked, namePicked, leftPicked, topPicked) => {
    forEach(list.items, (item) => {
      const intItemLeft = parseInt(item.left.slice(0, item.left.length - 1));
      const intLeftPick = parseInt(leftPicked.slice(0, leftPicked.length));
      const checkLeft = intItemLeft - 10 <= intLeftPick && intLeftPick <= intItemLeft + 10;
      const checkTop = item.top - 10 <= topPicked && topPicked <= item.top + 10;
      if (checkLeft && checkTop) {
        const newItem = mergeTwoItem(namePicked, item.name);
        if (newItem) {   
          replace(item.stt, newItem.id, newItem.name, newItem.url);
          // Gui item moi sang cho Container
          addNewItem(newItem);
          deleteItem(sttPicked);
        }
      }
    });
  };
  const replace = (stt, id, name, url) => {
    var listItemCopy = list.items.slice(0);
    forEach(listItemCopy, function(value) {
      if (value.stt === stt) {
        value.id = id;
        value.name = name;
        value.url = url;
      }
    });
    setList({
      items : listItemCopy,
      stt: list.stt
    });
  };

  // Tao cac item de hien thi ra man hinh
  const createElement = list.items.map((item, index) => {
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
