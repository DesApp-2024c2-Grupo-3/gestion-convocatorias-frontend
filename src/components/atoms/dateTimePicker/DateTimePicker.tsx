import React from "react";
import { DateTimePicker as MuiDateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

interface DateTimePickerProps {
    value: any;
    onChange: (value: any) => void;
    minutesStep?: number;
    minDateTime?: any;
    maxDateTime?: any;
    desktopModeMediaQuery?: string;
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({ 
    value, 
    onChange, 
    minutesStep = 1,
    minDateTime = dayjs(new Date()),
    maxDateTime,
    desktopModeMediaQuery = "(min-width: 600px)",
}) => (
    <>
        <MuiDateTimePicker
            value={value}
            onChange={onChange}
            minutesStep={minutesStep}
            minDateTime={minDateTime}
            maxDateTime={maxDateTime}
            desktopModeMediaQuery={desktopModeMediaQuery}
            slotProps={{
                textField: {
                    size: "small",
                    sx: { minWidth: 200 },
                },
                popper: {
                    container: document.querySelector('.MuiDialog-root') as HTMLElement,
                    placement: "right-start",
                },
            }}
        />
    </>
)

export default DateTimePicker;