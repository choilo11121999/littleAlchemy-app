import { useDrag } from "react-dnd";
import { ItemTypes } from "./../constants/ItemTypes";

// CSS item
const style = {
  width: "100px",
  height: "60px",
  position: "relative",
  backgroundColor: "none",
  marginLeft: "20px",
  marginTop: "10px",
};

const InitialBox = ({ id, name, url }) => {
  // Xu ly Drag
  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.BOX, id, name, url },
    // end: (item, monitor) => {
    //     console.log(item);
    // },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.5 : 1;

  return (
    <div style={{ ...style, opacity }}>
      <img
        ref={drag}
        src={url}
        style={{
          width: "60px",
          height: "60px",
          position: "absolute",
          left: "0px",
          top: "0",
          cursor: "pointer",
        }}
        alt="img"
      />
      <span
        style={{
          position: "absolute",
          top: "40%",
          left: "60px",
          pointerEvents: "none",
        }}
      >
        {name}
      </span>
    </div>
  );
};

export default InitialBox;
