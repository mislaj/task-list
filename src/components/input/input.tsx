import { InputBase, InputBaseProps } from '@mui/material';
import styles from './input.module.scss';
import clsx from 'clsx';

export interface InputProps extends Omit<InputBaseProps, 'size'> {
  size?: 'xs' | 's' | 'm' | 'l';
  label?: string;
  adormentEndClassName?: string;
  focusAuto?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  InputProps?: any;
  className?: string;
  classNameWrap?: string;
  status?: 'invalid' | boolean;
  noStyle?: boolean;
  enlargedField?: boolean;
  inputWrapClass?: string;
  isToggledInput?: boolean;
}

export const Input = ({
  size = 'l',
  focusAuto = false,
  inputProps,
  InputProps,
  classNameWrap,
  status,
  noStyle,
  enlargedField,
  inputWrapClass,
  isToggledInput,
  ...props
}: InputProps) => {
  const dynamicWidth = enlargedField && '50px';
  return (
    <div className={clsx(styles.inputRoot, inputWrapClass, classNameWrap)}>
      <InputBase
        sx={{ ml: 1, flex: 1, width: dynamicWidth }}
        placeholder="Search Google Maps"
        fullWidth
        autoFocus={focusAuto}
        autoComplete="off"
        classes={{
          root: clsx(
            styles.root,
            styles[`size-${size}`],
            status === 'invalid' ? styles.invalid : '',
            noStyle ? styles.noStyle : '',
            enlargedField ? styles.enlargedField : '',
            isToggledInput ? styles.toggledInput : ''
          ),
          formControl: '',
          focused: '',
          disabled: '',
          adornedStart: '',
          adornedEnd: '',
          error: '',
          sizeSmall: '',
          multiline: '',
          colorSecondary: '',
          fullWidth: '',
          hiddenLabel: '',
          readOnly: '',
          input: '',
          inputTypeSearch: '',
          inputAdornedStart: styles.cool,
          inputAdornedEnd: '',
          inputHiddenLabel: ''
        }}
        {...props}
        inputProps={Object.assign({}, inputProps, {})}
        {...InputProps}
      />
    </div>
  );
};
export default Input;
