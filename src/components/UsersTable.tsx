import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { useUsersConnection } from "../hooks/useUsersConnection";
import type { User } from "../types/users";
import { Avatar, Box, Typography } from "@mui/material";

const columns: GridColDef<User>[] = [
  { field: "email", headerName: "Email", flex: 1, minWidth: 250 },
  {
    field: "avatar",
    headerName: "Avatar",
    renderCell: (params) => {
      const { fullName } = params.row;
      const initials = `${fullName.split(" ")[0][0]}${fullName.split(" ")[1]?.[0] ?? ""}`;
      return (
        <Box
          sx={{
            height: "100%",
            alignItems: "center",
            justifyContent: "end",
            display: "flex",
          }}
        >
          <Avatar sx={{ width: 32, height: 32 }}>
            <Typography variant="body2">{initials}</Typography>
          </Avatar>
        </Box>
      );
    },
    width: 85,
    filterable: false,
    sortable: false,
    headerAlign: "right",
  },
  { field: "fullName", headerName: "Full Name", flex: 1, minWidth: 200 },
  { field: "role", headerName: "Role", flex: 1, minWidth: 140 },
  { field: "department", headerName: "Department", flex: 1, minWidth: 140 },
  { field: "createdAt", headerName: "Created", flex: 1, minWidth: 200 },
];

function UsersTable() {
  const { users } = useUsersConnection();

  return (
    <DataGrid<User>
      columns={columns}
      rows={users}
      getRowId={(user) => user.email}
    />
  );
}

export { UsersTable };
