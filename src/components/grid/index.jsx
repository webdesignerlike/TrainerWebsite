import React, { useState, useEffect } from "react";
import { StyledDataGrid } from "./index.style";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DeleteIcon from "@mui/icons-material/Delete";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { GridActionsCellItem, GridAlignment } from "@mui/x-data-grid";
import { ModalComponent } from "../modal";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { CalendarView } from "../calender";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Tooltip from "@mui/material/Tooltip";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const GridLayout = () => {
  const [selectedDates, setSelectedDates] = useState({});
  const [currentClientId, setCurrentClientId] = useState(null);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [newAppointmentDate, setNewAppointmentDate] = useState(null);
  const [openDateTimePicker, setOpenDateTimePicker] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState({});
  const [openCreate, setOpenCreate] = useState(false);
  const [clients, setClients] = useState([]);
  const [openAlert, setOpenAlert] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [appointmentAlert, setAppointmentAlert] = useState(false);

  const handleAddClient = (newClient) => {
    const uniqueId = Math.max(...clients.map((client) => client.id), 5) + 1;
    const clientWithId = { ...newClient, id: uniqueId };
    setClients((prevClients) => [...prevClients, clientWithId]);

    setOpenCreate(false);
    setOpenAlert(true);
  };

  const handleAddDialogOpen = () => {
    setOpenAddDialog(true);
  };

  const handleAddDialogClose = () => {
    setOpenAddDialog(false);
    setNewAppointmentDate(null);
  };
  const handleDeleteDialogOpen = () => {
    setOpenDeleteDialog(true);
  };

  const handleDeleteDialogClose = () => {
    setOpenDeleteDialog(false);
  };
  const handleDateChange = (clientId, newDate) => {
    setNewAppointmentDate(newDate);
  };

  const handleAccessTimeClick = (event, clientId) => {
    if (!newAppointmentDate) {
      setAppointmentAlert(true);
    }
    event.stopPropagation();
    if (currentClientId && newAppointmentDate) {
      setSelectedDates((prevSelectedDates) => {
        const updatedSelectedDates = {
          ...prevSelectedDates,
          [currentClientId]: [
            ...(prevSelectedDates[currentClientId] || []),
            newAppointmentDate,
          ],
        };
        return updatedSelectedDates;
      });

      setNewAppointmentDate(null);
    }
    setCurrentClientId(clientId);
    setOpenAddDialog(false);
  };

  const handleEdit = (clientId, date) => {
    setOpenDateTimePicker(!openDateTimePicker);
    setNewAppointmentDate(date);
    setCurrentClientId(clientId);
    setEditingAppointment({ clientId, date });
    console.log(date);
  };

  const handleDelete = (clientId, date) => {
    const updatedSelectedDates = { ...selectedDates };
    if (updatedSelectedDates[clientId]) {
      updatedSelectedDates[clientId] = updatedSelectedDates[clientId].filter(
        (selectedDate) => selectedDate !== date
      );
      if (updatedSelectedDates[clientId].length === 0) {
        delete updatedSelectedDates[clientId];
      }
      setSelectedDates(updatedSelectedDates);
    }
    setOpenDeleteDialog(false);
  };

  const handleDeleteRow = (idToDelete) => {
    const updatedRows = rows.filter((row) => row.id !== idToDelete);
    setRows(updatedRows);
    setOpenDialog(false);
    setDeleteAlert(true);
  };
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "firstName",
      headerName: "First name",
      width: 150,
      editable: true,
    },
    {
      field: "lastName",
      headerName: "Last name",
      width: 150,
      editable: true,
    },
    {
      field: "location",
      headerName: "Location",
      width: 150,
      editable: true,
    },
    {
      field: "appointments",
      headerName: "Appointments",
      width: 350,
      renderCell: (params) => {
        const selectedDatesForClient = selectedDates[params.row.id];
        const formattedAppointments =
          selectedDatesForClient &&
          selectedDatesForClient.map((date, i) => (
            <ListItemText key={i}>
              {currentClientId === params.row.id &&
              date === editingAppointment.date ? (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    value={newAppointmentDate}
                    onChange={(newDate) => {
                      console.log("DateTimePicker onChange:", newDate);

                      setNewAppointmentDate(newDate);
                      setSelectedDates((prevSelectedDates) => {
                        const updatedSelectedDates = {
                          ...prevSelectedDates,
                          [currentClientId]: (
                            prevSelectedDates[currentClientId] || []
                          ).map((prevDate) =>
                            prevDate === date ? newDate : prevDate
                          ),
                        };
                        return updatedSelectedDates;
                      });
                    }}
                    onClose={() => {
                      setOpenDateTimePicker(false);
                      setCurrentClientId(null);
                      setEditingAppointment({});
                    }}
                  />
                </LocalizationProvider>
              ) : (
                <>
                  {new Date(date).toLocaleString("en-US", {
                    timeZone: "Asia/Kolkata",
                  })}
                  <Tooltip title="Edit">
                    <ListItemIcon
                      sx={{ cursor: "pointer" }}
                      onClick={() => {
                        handleEdit(params.row.id, date);
                      }}
                    >
                      <EditIcon fontSize="small" />
                    </ListItemIcon>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <ListItemIcon
                      sx={{ cursor: "pointer" }}
                      onClick={handleDeleteDialogOpen}
                    >
                      <DeleteIcon fontSize="small" />
                    </ListItemIcon>
                  </Tooltip>
                  <Dialog
                    open={openDeleteDialog}
                    onClose={handleDeleteDialogClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        Are you sure want to delete this appointment?
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleDeleteDialogClose}>Cancel</Button>
                      <Button
                        onClick={() => {
                          handleDelete(params.row.id, date);
                        }}
                        autoFocus
                      >
                        Yes
                      </Button>
                    </DialogActions>
                  </Dialog>
                </>
              )}
            </ListItemText>
          ));

        return (
          <List>
            {formattedAppointments?.length ? (
              formattedAppointments
            ) : (
              <ListItem>Add Appointment</ListItem>
            )}
          </List>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,

      renderCell: (params) => (
        <div>
          <Tooltip title="Add Appointment">
            <IconButton
              onClick={(event) => {
                setCurrentClientId(params.row.id);
                handleAddDialogOpen();
              }}
            >
              <AddCircleIcon />
            </IconButton>
          </Tooltip>
          {currentClientId === params.row.id && (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Dialog
                open={openAddDialog}
                onClose={handleAddDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    <DateTimePicker
                      value={null}
                      onChange={(newDate) =>
                        handleDateChange(params.row.id, newDate)
                      }
                    />
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleAddDialogClose}>Cancel</Button>
                  <Button
                    onClick={(event) => {
                      handleAccessTimeClick(event, currentClientId);
                    }}
                    autoFocus
                  >
                    OK
                  </Button>
                </DialogActions>
              </Dialog>
            </LocalizationProvider>
          )}
          <Tooltip title="Delete row">
            <IconButton
              onClick={() => {
                setCurrentClientId(params.row.id);
                setOpenDialog(true);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <Dialog
            open={openDialog}
            onClose={() => setOpenDialog(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            BackdropProps={{
              style: {
                backgroundColor: "rgba(0, 0.5, 0, 0)",
              },
            }}
          >
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure want to delete this client's info?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
              <Button
                onClick={() => handleDeleteRow(currentClientId)}
                autoFocus
              >
                Yes
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      ),
    },
    {
      width: 150,
      sortable: false,
      disableColumnMenu: true,
      renderHeader: (params) => (
        <>
          <Button
            sx={{ textTransform: "capitalize" }}
            variant="contained"
            onClick={() => setOpenCreate(true)}
          >
            New Client
          </Button>
          <Modal
            open={openCreate}
            onClose={() => setOpenCreate(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <ModalComponent onAddClient={handleAddClient} />
          </Modal>
        </>
      ),
    },
  ];

  const data = [
    {
      id: 1,
      lastName: "Snow",
      firstName: "Jon",
      location: "New York",
    },
    { id: 2, lastName: "Lannister", firstName: "Cersei", location: "America" },
    {
      id: 3,
      lastName: "Lannister",
      firstName: "Jaime",
      location: "Rajasthan,India",
    },
    {
      id: 4,
      lastName: "Stark",
      firstName: "Arya",
      location: "Rajasthan,India",
    },
    {
      id: 5,
      lastName: "Targaryen",
      firstName: "Daenerys",
      location: "Rajasthan,India",
    },
  ];
  const [rows, setRows] = useState(data);
  const [showCalendar, setShowCalendar] = useState(false);
  return (
    <>
      <Typography sx={{ fontSize: "30px", marginBlock: "2vh" }}>
        {" "}
        Fitness Trainer Appointment Scheduling Website{" "}
      </Typography>
      <StyledDataGrid
        sx={{
          ".MuiDataGrid-withBorderColor": {
            outline: "none !important",
          },
          marginInline: "10vw",
          height: "74.2vh",
          width: "85vw",
          ".MuiDataGrid-columnHeaders": {
            background: "rgba(0, 0, 0, 0.05)",
          },
        }}
        getRowHeight={() => "auto"}
        rows={[...rows, ...clients]}
        getRowId={(row) => row.id}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 8,
            },
          },
        }}
        getRowClassName={(params) => "grid-row"}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />

      <Button
        variant="contained"
        onClick={() => {
          setShowCalendar(true);
          console.log("Appointments:", selectedDates[currentClientId]);
        }}
      >
        Show Calender
      </Button>
      <Dialog
        fullScreen
        open={showCalendar}
        onClose={() => setShowCalendar(false)}
        TransitionComponent={Transition}
      >
        {" "}
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => {
                setShowCalendar(false);
              }}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <CalendarView
          selectedDates={selectedDates}
          clients={[...rows, ...clients]}
        />
      </Dialog>
      <Snackbar
        open={openAlert}
        autoHideDuration={6000}
        onClose={() => setOpenAlert(false)}
      >
        <Alert
          onClose={() => setOpenAlert(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Client added successfully!
        </Alert>
      </Snackbar>
      <Snackbar
        open={deleteAlert}
        autoHideDuration={6000}
        onClose={() => setDeleteAlert(false)}
      >
        <Alert
          onClose={() => setDeleteAlert(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Client deleted successfully!
        </Alert>
      </Snackbar>
      <Snackbar
        open={appointmentAlert}
        autoHideDuration={6000}
        onClose={() => setAppointmentAlert(false)}
      >
        <Alert
          onClose={() => setAppointmentAlert(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          Empty Appointment!
        </Alert>
      </Snackbar>
    </>
  );
};
