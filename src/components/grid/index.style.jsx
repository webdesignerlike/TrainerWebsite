import styled from "styled-components";
import { DataGrid } from "@mui/x-data-grid";
import { lighten } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
export const StyledDataGrid = styled(DataGrid)(() => ({
  borderRadius: 5,
  border: 1,
  borderColor: " #BDC3C7",
  borderStyle: "solid",
  backgroundColor: "#fff",

  "& .grid-row": {
    borderRadius: 10,
    // marginTop: 10,
    overflow: " auto",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: 600,
    backgroundColor: "white",
    "&:hover": {
      backgroundColor: lighten("#27007B1A", 0.6),
      borderRadius: 0,
    },

    "&.Mui-selected": {
      backgroundColor: lighten("#27007B1A", 0.5),
      "&:hover": {
        backgroundColor: lighten("#27007B1A", 0.4),
      },
    },
  },
}));
export const ActionIcon = styled(Image)`
  margin-right: 10px;
  margin-left: 10px;
  height: 25px;
  width: 25px;
`;
