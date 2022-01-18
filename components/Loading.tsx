import styles from "../styles/Loading.module.css";

const Loading = () => {
  return (
    <div className={styles.loadingArea}>
      <div className={styles.loading}></div>
    </div>
  );
};
export default Loading;
