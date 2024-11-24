import CloseIcon from '@mui/icons-material/Close';
import MuiDialog, { DialogProps as MuiDialogProps } from '@mui/material/Dialog';
import MuiDialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import clsx from 'clsx';
import * as React from 'react';
import { useEffect, useState } from 'react';
import styles from './dialog.module.scss';
import IconButton from './icon-button/icon-button';
export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
  hideUnderLine?: boolean;
}

export interface DialogProps extends MuiDialogProps {
  dialogTitle?: string;
  contentWrapperClass?: string;
  hideUnderLine?: boolean;
}

const DialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, hideUnderLine = false, ...other } = props;

  return (
    <MuiDialogTitle
      sx={{ m: 0, p: 2 }}
      {...other}
      classes={{
        root: clsx(
          styles.dialogTitle,
          children && styles.titleBorder,
          !children && styles.noTitleContainer,
          hideUnderLine && styles.hideUnderLine
        )
      }}
    >
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 4,
            top: 7,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            color: (theme:any) => theme.palette.grey[500]
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
};

const Dialog = ({
  open,
  onClose,
  maxWidth,
  hideUnderLine,
  dialogTitle,
  ...props
}: DialogProps) => {
  const breakpoint_xl = useMediaQuery('(min-width: 576px)', { noSsr: true });
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    setIsModalVisible(open);
  }, [open]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleClose = (e?: any) => {
    setIsModalVisible(false);
    onClose?.(e, 'escapeKeyDown');
  };

  return (
    <div>
      <MuiDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={isModalVisible}
        className={clsx(styles.dialog)}
        classes={{
          paper: clsx(
            styles.paper,
            maxWidth && styles[maxWidth],
            !breakpoint_xl ? styles.mobileView : ''
          )
        }}
        slotProps={{
          backdrop: { classes: { root: styles.backdropRoot } }
        }}
      >
        <DialogTitle
          id="customized-dialog-title"
          onClose={() => handleClose()}
          hideUnderLine={hideUnderLine}
        >
          {dialogTitle}
        </DialogTitle>

        <div className={clsx(styles.dialogContent, props.contentWrapperClass)}>
          {props.children}
        </div>
      </MuiDialog>
    </div>
  );
};

export default Dialog;
