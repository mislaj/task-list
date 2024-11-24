/* eslint-disable @typescript-eslint/no-empty-object-type */
import IconBtn, {
  IconButtonProps as IconBtnProps
} from '@mui/material/IconButton';
import styles from './icon-button.module.scss';

interface IconButtonProps extends IconBtnProps {}

const IconButton = (props: IconButtonProps) => {
  return <IconBtn classes={{ root: styles.root }} {...props} />;
};
export default IconButton;
