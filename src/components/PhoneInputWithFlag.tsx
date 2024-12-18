import { Box, MenuItem, Select, styled, Typography } from "@mui/material";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import CustomInput from "./CustomInput";
import { CountryIso2, defaultCountries, FlagImage, parseCountry, usePhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { useMemo } from "react";
import { PhoneUtils } from "../Utils/PhoneUtils";

export interface PhoneInputProps {
  label: string;
  defaultValue?: string;
  required?: boolean;
  disabled?: boolean;
  onChange: (phone?: string) => void;
}

const cleanPhoneNumber = (phone: string, countryCode: string): string => {
  phone = phone.replace(/\s+/g, "");

  if (countryCode === "fr" && phone.startsWith("0")) {
    return phone.substring(1);
  }

  return phone;
};

const PhoneInputWithFlag = ({ label, defaultValue, required = false, disabled = false, onChange }: PhoneInputProps) => {
  const defaultCountry = "fr";

  const value = cleanPhoneNumber(defaultValue ?? "", defaultCountry);

  const { phone, inputValue, handlePhoneValueChange, country, setCountry } = usePhoneInput({
    defaultCountry: "fr",
    value,
    countries: defaultCountries,
    onChange: (data) => {
      let phone = "";
      if (data && data.inputValue.length == 0) {
        onChange(phone);
      } else {
        if (country.iso2 === "fr") {
          phone = cleanPhoneNumber(data.phone, "fr");
        } else {
          phone = data.phone;
        }

        onChange(phone);
      }
    },
    disableDialCodeAndPrefix: true,
  });

  const SmallArrowDownIcon = styled(ExpandMoreRoundedIcon)(() => ({
    fontSize: "18px",
  }));

  const error = useMemo(() => {
    return !PhoneUtils.isPhoneValid(phone);
  }, [phone]);

  return (
    <Box
      className="phone-field-country-Box"
      sx={{
        display: "flex",
        flexGrow: 1,
        "&:hover": {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: (error ? "#e75113" : "#626262") + "!important",
          },
          borderColor: (error ? "#e75113" : "#626262") + "!important", // Change border color of input on hover
        },
        "&:focus-within": {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: (error ? "#e75113" : "#626262") + "!important",
          },
          borderColor: (error ? "#e75113" : "#626262") + "!important", // Change border color of input on focus
        },
      }}
    >
      <Select
        sx={{
          display: "flex",
          px: "8px",
          alignItems: "center",
          gap: "8px",
          background: "#e8e8e8",
          height: "48px",
          p: 0,
          borderRadius: "4px 0 0 4px",
          borderRight: "none",
          ".MuiSelect-select": {
            paddingRight: "20px !important",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: (error ? "#e75113" : "#c9c9c9") + "!important",
            borderRight: "none !important",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: (error ? "#e75113" : "#626262") + "!important",
          },
        }}
        defaultValue={country.iso2}
        aria-hidden="false"
        IconComponent={SmallArrowDownIcon}
        renderValue={(value) => (
          <Box
            sx={{
              display: "flex",
              px: "8px",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <FlagImage iso2={value ?? "fr"} style={{ display: "flex" }} />
            <Typography>+{country.dialCode}</Typography>
          </Box>
        )}
        inputProps={{
          sx: {
            display: "flex",
            px: 0,
            py: 0,
            alignItems: "center",
            gap: "8px",
            borderRight: "none !important",
            "&.MuiOutlinedInput-notchedOutline": {
              borderRight: "none !important",
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
            },
          },
        }}
        onChange={(value) => {
          setCountry(value.target.value as CountryIso2);
        }}
      >
        {defaultCountries.map((option, index) => {
          const country = parseCountry(option);
          return (
            <MenuItem value={country.iso2} key={index}>
              <Box
                sx={{
                  display: "flex",
                  px: "8px",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <FlagImage iso2={country.iso2} style={{ marginRight: "8px" }} />
                <Typography marginRight="8px">{country.name}</Typography>
                <Typography color="gray">+{country.dialCode}</Typography>
              </Box>
            </MenuItem>
          );
        })}
      </Select>
      <CustomInput
        id="outlined-adornment-mobile"
        label={label}
        value={inputValue}
        error={error}
        removeLeftBorder
        inputProps={{ maxLength: 14 }}
        placeholder="6 12 34 56 78"
        required={required}
        disabled={disabled}
        onChange={handlePhoneValueChange}
      />
    </Box>
  );
};

export default PhoneInputWithFlag;
