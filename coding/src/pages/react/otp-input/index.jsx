import { useRef } from 'react';
import { useState } from 'react';
import styles from './styles.module.css';
const OTP_INPUT_LENGTH = 6
export default function OTPInput() {
    const [otpFields, setOtpFields] = useState(Array(OTP_INPUT_LENGTH).fill(""));
    const inputRef = useRef([]);
    console.log(inputRef)
    function onChangeInputHandler(e, index) {
        const value = e.target.value;
        if (isNaN(value)) return;

        updateOtpFields(index, value);

        // Move to the next input field
        if (value && (index + 1) < OTP_INPUT_LENGTH) {
            inputRef.current[index + 1].focus();
        }
        console.log(value)
    }

    function updateOtpFields(index, value) {
        const newOtpFields = [...otpFields];
        newOtpFields[index] = value;
        setOtpFields(newOtpFields);
    }
    function onKeyDownInputHandler(e, index) {
        if (e.key === "Backspace" && otpFields[index] === "" && index > 0) {
            inputRef.current[index - 1].focus();
        }
    }
    return (
        <div className={styles.otp_input}>
            {otpFields.map((_, index) => {
                return <input
                    type="text"
                    maxLength={1}
                    key={index}
                    onChange={(e) => onChangeInputHandler(e, index)}
                    onKeyDown={(e) => onKeyDownInputHandler(e, index)}
                    value={otpFields[index]}
                    ref={el => inputRef.current[index] = el}
                />
            })}
        </div>
    )
}