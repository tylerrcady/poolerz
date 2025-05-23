import React, { ReactNode, useState } from "react";
import ErrorText from "./error-text";
import keyboardScroll from "@lib/keyboard-scroll";

interface Props {
    label?: ReactNode;
    disabled?: boolean;
    onChange?: (value: string) => void;
    formValue?: { name?: string; [key: string]: string | undefined };
    currentValue?: string;
    placeholder?: string;
    error?: string;
    inputType?: string;
    key?: string;
    required?: boolean;
}

export default function TextInput({
    label = "",
    disabled = false,
    onChange,
    formValue = {},
    currentValue = "",
    placeholder = "",
    error = "",
    inputType = "text",
    key = "",
    required = false,
}: Props) {
    const [value, setValue] = useState(currentValue);

    return (
        <div className="flex flex-col w-full">
            {label && (
                <label
                    className="text-black text-base font-normal leading-normal"
                    htmlFor={formValue ? formValue.name : undefined}
                >
                    {label}
                    {required && (
                        <span className="text-asterisks-red text-sm">*</span>
                    )}
                </label>
            )}
            <input
                key={key}
                type={inputType}
                onFocus={(e) => keyboardScroll(e)}
                {...formValue}
                className={`w-full py-2.5 px-2 bg-lightgray items-center border rounded ${
                    disabled ? "!bg-black" : "!bg-secondary-background"
                } ${
                    error ? "border-error-red" : "border-black"
                } text-black focus:outline-none focus:border-2 focus:border-blue`}
                onClick={(event) => {
                    event.stopPropagation();
                }}
                onChange={(event) => {
                    setValue(event.target.value);
                    if (onChange) {
                        onChange(event.target.value);
                    }
                }}
                placeholder={placeholder}
                value={value}
            />
            <ErrorText error={error} />
        </div>
    );
}
