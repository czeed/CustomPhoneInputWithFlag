import { Typography } from "@mui/material";
import "./App.css";
import PhoneInputWithFlag from "./components/PhoneInputWithFlag";
import { useCallback, useState } from "react";

function App() {
  const [phone, setPhone] = useState<string | undefined>("");

  const HandlePhoneChange = useCallback((newPhone?: string) => {
    setPhone(newPhone);
  }, []);
  return (
    <>
      <PhoneInputWithFlag label="Phone" onChange={HandlePhoneChange} />
      <Typography sx={{ marginTop: "2px" }}>{phone}</Typography>
    </>
  );
}

export default App;
