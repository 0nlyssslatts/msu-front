import classNames from "classnames";
import React, { forwardRef, useCallback, useState } from "react";

import styles from "./Input.module.scss";

export type InputProps = Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "value"
> & {
    /** Значение поля */
    value?: string;
    /** Callback, вызываемый при вводе данных в поле */
    onChange?: (value: string) => void;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ value, onChange, disabled, className, ...props }, ref) => {
        const [isFocused, setIsFocused] = useState(false);

        const handleChange = useCallback(
            (ev: React.ChangeEvent<HTMLInputElement>): void => {
                onChange?.(ev.target.value);
            },
            [onChange]
        );

        return (
            <div
                className={classNames(
                    styles.content,
                    isFocused && styles.focus,
                    className
                )}
            >
                <input
                    disabled={disabled}
                    type="text"
                    className={styles.input}
                    value={value}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => {
                        setIsFocused(false);
                    }}
                    onChange={handleChange}
                    {...props}
                    ref={ref}
                ></input>
            </div>
        );
    }
);

Input.displayName = "Input";

export default Input;
