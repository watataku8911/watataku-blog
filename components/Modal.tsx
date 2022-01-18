import Link from "next/link";
import styles from "../styles/Modal.module.css";
import { Tags } from "../types/blog";
import IconTag from "../public/img/icon_tag_navy.svg";

type Props = {
  open: boolean;
  title: string;
  tags: Tags[];
  handleClose: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
};

const Modal = (props: Props) => {
  return (
    <>
      {props.open && (
        <div className={styles.overlay} onClick={props.handleClose}>
          <div className={styles.panel}>
            <h2>{props.title}</h2>

            <div className={styles.modalContents}>
              {props.tags.map((tag) => {
                return (
                  <div key={tag.id} className={styles.tag}>
                    <IconTag />
                    <Link href={`/search/${tag.id}`}>{tag.tag_name}</Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Modal;
