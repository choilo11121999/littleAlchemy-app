/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { useDrag } from 'react-dnd';
import { ItemTypes } from './../constants/ItemTypes';

// CSS item trong khung duoc tha vao
const style = {
  width: '80px',
  height: '60px',
  cursor: 'pointer',
  position: 'absolute',
  // backgroundColor: 'red'
};

const NewBox = ({ stt, id, name, url, left, top, deleteItem }) => {
  // Xu ly Drag
  const [{ isDragging }, drag] = useDrag({
    item: { stt, name, type: ItemTypes.BOX, id, url },
    end: (item, monitor) => {
      // Lay stt item de xoa phan tu
      if (monitor.getSourceClientOffset()) {
        isDelete(item.stt);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // Tra ve stt item de xu ly xoa item
  const isDelete = (stt) => {
    return deleteItem(stt);
  };

  // Item goc se mat khi bi keo
  if (isDragging) {
    return <div ref={drag}></div>;
  }

  return (
    <div style={{ ...style, top, left }}>
      <img
        ref={drag}
        src={url}
        style={{ width: '60px', height: '60px' }}
        alt="img"
      />
    </div>
  );
};

export default NewBox;
