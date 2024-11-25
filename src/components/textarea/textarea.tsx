import { forwardRef } from 'react';
import clsx from 'clsx';

import styles from './textarea.module.scss';
import TextareaAutosize, {
  TextareaAutosizeProps
} from '@mui/material/TextareaAutosize';

interface TextAreaProps extends TextareaAutosizeProps {
  size?: 's' | 'm' | 'l' | 'xl';
  noStyle?: boolean;
  focusAuto?: boolean;
}

const TextAreaInput = (
  {
    className,
    size = 'm',
    noStyle,
    focusAuto = false,
    ...restProps
  }: TextAreaProps,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ref: any
) => {
  return (
    <TextareaAutosize
    style={{
      resize: "none",
    }}
      ref={ref}
      autoFocus={focusAuto}
      className={clsx(
        styles.textarea,
        className,
        styles[size],
        noStyle && styles.noStyle
      )}
      minRows={2}
      {...restProps}
    />
  );
};

export const Textarea = forwardRef(TextAreaInput);
