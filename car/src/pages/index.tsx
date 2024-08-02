import { useEffect, useRef, useState } from "react";
import styles from "./index.less";
import Box, { BoxProps } from "@/component/Box";
import Car from "@/component/Car";
import Draggable, { DraggableData } from "react-draggable";
import { getData } from "@/services/UserController";
import { parseString } from "xml2js";

export default function HomePage() {
  const [x, setX] = useState(0);
  const [carArr, setCarArr] = useState<BoxProps[]>([]);
  const [boxArr, setBoxArr] = useState<BoxProps[]>([]);
  const getBox = async () => {
    // 请求后端拿数据
    let res = await getData();
    parseString(res?.data, (e: any, r: any) => {
      setBoxArr(
        r?.inventory?.product.map((item: any, index: number) => {
          return {
            index,
            product_id: item?.product_id?.[0],
            product_img: item?.product_img?.[0],
            product_name: item?.product_name?.[0],
            quantity_in_stock: item?.quantity_in_stock?.[0],
            unit_price: item?.unit_price?.[0],
          };
        })
      );
    });
  };
  const handleStop = (event: any, info: DraggableData) => {
    // 拿到拖拽元素的index
    const index = info.node.children[0]?.dataset?.index;
    if (info.lastX > x) {
      const newCarArr = [...carArr, boxArr[index]];
      setCarArr(newCarArr);
    }
  };
  useEffect(() => {
    getBox();
  }, []);
  useEffect(() => {
    const boxEle = document.querySelector(".box");
    const carEle = document.querySelector("#car");
    if (boxEle && carArr) {
      // 左边到右边的距离，判断左边拖拽的盒子是否完全进入右边
      const leftX = boxEle!.getBoundingClientRect().left;
      const rightX = carEle!.getBoundingClientRect().left;
      setX(rightX - leftX);
    }
  }, [boxArr]);
  return (
    <div>
      <div style={{ display: "flex" }}>
        <div className={styles.left}>
          <div className={styles.btn} onClick={getBox}>
            Retrieve New Inventory
          </div>
          {boxArr.map((item, index) => {
            return (
              <Draggable onStop={handleStop} position={{ x: 0, y: 0 }}>
                <div className="box">
                  <Box {...item} index={index} />;
                </div>
              </Draggable>
            );
          })}
        </div>
        <div className={styles.right} id="car">
          <h1>购物车</h1>
          <div className={styles.carWrapper}>
            {carArr.map((item, index) => {
              return (
                <Car
                  {...item}
                  index={index}
                  setCarArr={setCarArr}
                  carArr={carArr}
                />
              );
            })}
            <div className={styles.price}>
              Cart Total:
              <span>
                {carArr.reduce(
                  (acc, curr) => acc + parseInt(curr?.unit_price),
                  0
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
