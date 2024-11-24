import React, { ReactNode } from 'react';

import Checkbox from '@mui/material/Checkbox/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel/FormControlLabel';
import clsx from 'clsx';

import styles from './check-box.module.scss';
export enum CheckboxVARIANT {
  CIRCLE = 'circle',
  SQUARED = 'squared'
}

export enum CheckboxSIZES {
  L = 'sizeL',
  M = 'sizeM'
}
interface Props {
  label?: string | ReactNode;
  labelClassName?: string;
  className?: string;
  value?: number | string | boolean;
  checked?: boolean;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void;
  name?: string;
  variant?: CheckboxVARIANT;
  size?: CheckboxSIZES;
  indeterminate?: boolean;
  id?: string;
  disabled?: boolean;
  helperText?: string;
  disabledInfo?: string;
}
const CheckBox = ({
  label,
  labelClassName,
  id,
  className,
  variant = CheckboxVARIANT.SQUARED,
  value,
  checked,
  name,
  size = CheckboxSIZES.L,
  indeterminate,
  onChange,
  disabled
}: Props) => {
  return (
    <FormControlLabel
      disabled={disabled}
      className={clsx(styles.root, className)}
      control={
        <div style={{ display: 'flex' }}>
          <Checkbox
            id={id}
            disabled={disabled}
            checkedIcon={
              <span
                className={clsx(
                  styles.icon,
                  styles.checkedIcon,
                  styles[variant],
                  styles[size]
                )}
              />
            }
            indeterminate={indeterminate}
            indeterminateIcon={
              <span
                className={clsx(
                  styles.icon,
                  styles.indeterminateIcon,
                  styles[variant],
                  styles[size]
                )}
              />
            }
            icon={
              <span
                className={clsx(styles.icon, styles[variant], styles[size])}
              />
            }
            className={clsx(styles.checkbox, disabled && styles.disabled)}
            checked={checked}
            onChange={onChange}
            value={value}
            color={'primary'}
            disableRipple
            name={name}
          />
        </div>
      }
      label={<div className={clsx(styles.label, labelClassName)}>{label}</div>}
    />
  );
};
export default CheckBox;
