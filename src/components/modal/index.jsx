import React, { useState } from "react";
import { GridComponent, InputField } from "./index.style";
import { TextField, Stack, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

export const ModalComponent = ({ onAddClient }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [location, setLocation] = useState("");
  const [openAlert, setOpenAlert] = useState(false);

  const handleSubmit = () => {
    const formData = {
      lastName: lastName,
      firstName: firstName,
      location: location,
    };

    onAddClient(formData);
    setFirstName("");
    setLastName("");
    setLocation("");
    setOpenAlert(true);
    // setTimeout(() => {
    //   setOpenAlert(true);
    // }, 8000);
  };
  return (
    <>
      <GridComponent>
        <Typography marginBottom={5}>
          Fill details to add appointment for new client.
        </Typography>
        <Stack spacing={4}>
          <InputField
            id="outlined-basic"
            label="First Name"
            variant="outlined"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <InputField
            id="outlined-basic"
            label="Last Name"
            variant="outlined"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <InputField
            id="outlined-basic"
            label="Location"
            variant="outlined"
            required
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </Stack>
        <Button
          disabled={firstName === "" || lastName === "" || location === ""}
          sx={{ width: "100px", marginTop: "10px" }}
          variant="contained"
          onClick={handleSubmit}
        >
          Submit
        </Button>
        {/* <Snackbar
          open={openAlert}
          autoHideDuration={4000}
          onClose={() => setOpenAlert(false)}
        >
          <Alert
            onClose={() => setOpenAlert(false)}
            severity="success"
            sx={{ width: "100%" }}
          >
            Client added successfully!
          </Alert>
        </Snackbar> */}
      </GridComponent>
    </>
  );
};
