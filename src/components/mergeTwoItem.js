import * as images from './Images';
import _ from 'lodash';
// Array chua cac item moi khi merge
const listNewItems = [
  {
    id: 3,
    name: 'airearth',
    url: images.Dust,
  },
  {
    id: 4,
    name: 'airfire',
    url: images.Energy,
  },
  {
    id: 5,
    name: 'earthfire',
    url: images.Lava,
  },
  {
    id: 6,
    name: 'airlava',
    url: images.Stone,
  },
  {
    id: 7,
    name: 'airairfire',
    url: images.Wind,
  },
  {
    id: 8,
    name: 'earthairfire',
    url: images.Earthquake,
  },
  {
    id: 9,
    name: 'earthearthfire',
    url: images.Volcano,
  },
  {
    id: 10,
    name: 'fireairearth',
    url: images.Gunpowder,
  },
];

// ham sap nhap 2 item trung nhau
export default function mergeTwoItem(nameDraging, nameDroped) {
  const newName = nameDraging + nameDroped;
  const lengthNewName = newName.length;
  const index = _.findIndex(listNewItems, function(item) {
    return _.includes(item.name, nameDraging) && _.includes(item.name, nameDroped) && lengthNewName === item.name.length;
  });
  const newItem = listNewItems[index];
  if (newItem !== undefined) {
    return newItem;
  }
  return null;
}