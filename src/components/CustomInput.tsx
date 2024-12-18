import { FormControl, InputLabel, OutlinedInput, Tooltip } from "@mui/material";
import { useMemo, useState } from "react";

export interface CustomInputProps {
  id: string;
  label: string;
  customSx?: any;
  defaultValue?: string | number | null;
  value?: string | number | null;
  onChange?: (event: any) => void;
  disabled?: boolean;
  disableReason?: string;
  placeholder?: string;
  minRows?: number;
  required?: boolean;
  autoFocus?: boolean;
  error?: boolean;
  endAdornment?: any;
  type?: string;
  onCut?: (event: any) => void;
  onPaste?: (event: any) => void;
  inputProps?: any;
  removeLeftBorder?: boolean;
}

const CustomInput = ({
  id,
  label,
  customSx,
  defaultValue,
  value,
  onChange = () => {},
  disabled = false,
  disableReason,
  placeholder,
  minRows,
  required,
  autoFocus,
  error,
  endAdornment,
  type = "text",
  onCut = () => {},
  onPaste = () => {},
  inputProps,
  removeLeftBorder = false,
}: CustomInputProps) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const newInputProps = useMemo(() => {
    return { ...inputProps, autoComplete: "off" };
  }, [inputProps]);
  return (
    <FormControl
      sx={{
        width: "100%",
        ...customSx,
      }}
      variant="outlined"
    >
      <InputLabel
        id={id}
        sx={{
          fontSize: "14px",
          fontWeight: 500,
          lineHeight: "20px",
          "&.MuiInputLabel-root": {
            color: "#626262",
          },
        }}
        shrink
      >
        {label} {required ? <i style={{ color: "red" }}>*</i> : null}
      </InputLabel>
      <Tooltip title={disabled && disableReason ? disableReason : ""} open={tooltipOpen} arrow>
        <OutlinedInput
          sx={{
            backgroundColor: disabled ? "#f9f9f9" : null,
            height: minRows ? "auto" : "48px",
            fontSize: "14px",
            fontWeight: 400,
            lineHeight: "20px",
            color: error ? "#e75113" : "#263039",
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: (error ? "#e75113" : "#626262") + " !important",
              borderWidth: "1px !important",
            },
            "&.Mui-error .MuiOutlinedInput-notchedOutline": {
              borderColor: (error ? "#e75113" : "#626262") + " !important",
              borderWidth: "1px !important",
            },
            "&.Mui-error.Mui-disabled .MuiOutlinedInput-notchedOutline": {
              borderColor: "#e75113" + " !important",
              borderWidth: "1px !important",
            },
            ...(removeLeftBorder && {
              "& .MuiOutlinedInput-notchedOutline": {
                borderLeft: "none",
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
              },
            }),
          }}
          type={type}
          autoFocus={autoFocus}
          defaultValue={defaultValue}
          value={value}
          label={label + (required ? "*" : "")}
          disabled={disabled}
          placeholder={placeholder}
          onChange={onChange}
          notched
          minRows={minRows}
          multiline={!!minRows}
          error={error}
          endAdornment={endAdornment}
          onCut={onCut}
          onPaste={onPaste}
          onMouseOver={() => setTooltipOpen(true)}
          onMouseLeave={() => setTooltipOpen(false)}
          inputProps={newInputProps}
        />
      </Tooltip>
    </FormControl>
  );
};

export default CustomInput;
