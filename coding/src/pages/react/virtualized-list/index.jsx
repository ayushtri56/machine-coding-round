import { useState } from "react";
import styles from "./styles.module.css";

const items = Array.from({ length: 100000 }, (_, index) => `Item ${index + 1}`);

const containerHeight = 400;
const containerWidth = 300;
const itemHeight = 35;

export default function VirtualizedList() {
  const [indices, setIndices] = useState([
    0,
    Math.floor(containerHeight / itemHeight),
  ]);

  const visibleList = items.slice(indices[0], indices[1]);

  function onScrollList(e) {
    const { scrollTop } = e.target;
    const newStartIndex = Math.floor(scrollTop/itemHeight);
    const newEndIndex = newStartIndex +  Math.floor(containerHeight / itemHeight);
    setIndices([newStartIndex, newEndIndex])
  }

  return (
    <div
      className={styles.container}
      style={{ width: containerWidth, height: containerHeight }}
      onScroll={onScrollList}
    >
      <div style={{ height: items.length * itemHeight,  }}>
        {visibleList.map((item, i) => {
          return (
            <div key={i} className={styles.item} style={{ height: itemHeight }}>
              {item}
            </div>
          );
        })}
      </div>
    </div>
  );
}


