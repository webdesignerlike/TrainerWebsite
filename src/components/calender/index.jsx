import React, { useState } from "react";
import { DateCalendar } from "@mui/x-date-pickers";
import { Container, Paper, Typography } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import dayjs from "dayjs";
export const CalendarView = ({ clients, selectedDates }) => {
  const events = clients.flatMap((client) =>
    (selectedDates[client.id] || []).map((appointment) => ({
      title: ` ${client.firstName} ${client.lastName}`,
      start: dayjs(appointment).toDate(),
      color: "green",
    }))
  );
  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      events={events}
    />
  );
};
