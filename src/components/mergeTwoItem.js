import * as images from './Images';
import { find, isEqual } from 'lodash';
// Array chua cac item moi khi merge
const listNewItems = [
  {
    id: 3,
    components: ['air', 'earth'],
    name: 'dust',
    url: images.Dust,
  },
  {
    id: 4,
    components: ['air', 'fire'],
    name: 'energy',
    url: images.Energy,
  },
  {
    id: 5,
    components: ['earth', 'fire'],
    name: 'lava',
    url: images.Lava,
  },
  {
    id: 6,
    components: ['air', 'lava'],
    name: 'stone',
    url: images.Stone,
  },
  {
    id: 7,
    components: ['air', 'energy'],
    name: 'wind',
    url: images.Wind,
  },
  {
    id: 8,
    components: ['earth', 'energy'],
    name: 'earthquake',
    url: images.Earthquake,
  },
  {
    id: 9,
    components: ['earth', 'lava'],
    name: 'volcano',
    url: images.Volcano,
  },
  {
    id: 10,
    components: ['fire', 'dust'],
    name: 'gunpowder',
    url: images.Gunpowder,
  },
];

// ham sap nhap 2 item trung nhau
export default function mergeTwoItem(nameDraging, nameDroped) {
  const newComponents = [nameDraging, nameDroped];
  const newItem = find(listNewItems, (item) => isEqual(newComponents.sort(), item.components.sort()));
  if (newItem !== undefined) {
    return newItem;
  }
  return null;
}