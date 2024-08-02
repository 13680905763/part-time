import { BoxProps } from "@/component/Box";
import styles from "./index.less";

const Car = (
  props: BoxProps & {
    setCarArr: (carArr: BoxProps[]) => void;
    carArr: BoxProps[];
  }
) => {
  const { product_img, product_name, unit_price, index, carArr, setCarArr } =
    props;
  const remove = (e) => {
    const newCarArr = carArr.filter((item, i) => i !== index);
    setCarArr(newCarArr);
  };

  return (
    <div className={styles.car} data-index={index}>
      <div className={styles.boxLeft}>
        <img src={"https://www.partechgss.com/" + product_img} alt="" />
      </div>
      <div className={styles.boxCenter}>
        <div>{product_name}</div>
        {/* <div className={styles.price}>${unit_price}</div> */}
      </div>
      <div className={styles.boxRight}>
        <div
          className={styles.btn}
          data-index={index}
          onClick={(e) => remove(e)}
        >
          Remove
        </div>
        <div className={styles.price}>${unit_price}</div>
      </div>
    </div>
  );
};

export default Car;
