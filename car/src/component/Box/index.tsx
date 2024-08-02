import styles from "./index.less";

export interface BoxProps {
  index: number;
  product_id: number;
  product_img: string;
  product_name: number;
  quantity_in_stock: any;
  unit_price: any;
}

const Box = (props: BoxProps) => {
  const { product_img, product_name, unit_price, index } = props;

  return (
    <div className={styles.box} data-index={index}>
      <div className={styles.boxLeft}>
        <img src={"https://www.partechgss.com/" + product_img} alt="" />
      </div>
      <div className={styles.boxRight}>
        <div>{product_name}</div>
        <div className={styles.price}>${unit_price}</div>
      </div>
    </div>
  );
};

export default Box;
