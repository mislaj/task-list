import { LocationIcon } from "../../assets/icons/icons";
import styles from "./footer.module.scss";
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerWrap}>
        <div className={styles.title}>Task list</div>
        <div className={styles.locationWrap}>
          <LocationIcon />
          <div className={styles.locationInfo}>
            Lorem ipsum dolor sit amet consectetur. Morbi pharetra quis
            hendrerit amet et aenean. Consectetur.
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
