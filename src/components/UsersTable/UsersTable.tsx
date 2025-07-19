import dayjs from "dayjs";
import {
  DataGrid,
  type GridColDef,
  type GridRowIdGetter,
} from "@mui/x-data-grid";

import { useUsersConnection } from "../../hooks/useUsersConnection";
import type { User } from "../../types/users";
import { DeleteCell } from "./DeleteCell";
import { AvatarCell } from "./AvatarCell";

const getRowId: GridRowIdGetter<User> = (user) => user.id;

const columns: GridColDef<User>[] = [
  {
    field: "actions",
    headerName: "Actions",
    renderCell: (params) => <DeleteCell user={params.row} />,
    width: 70,
    minWidth: 70,
    filterable: false,
    sortable: false,
    hideable: false,
    disableColumnMenu: true,
  },
  { field: "email", headerName: "Email", flex: 1, minWidth: 250 },
  {
    field: "avatar",
    headerName: "Avatar",
    renderCell: (params) => <AvatarCell user={params.row} />,
    width: 85,
    minWidth: 85,
    filterable: false,
    sortable: false,
    headerAlign: "right",
  },
  { field: "fullName", headerName: "Full Name", flex: 1, minWidth: 200 },
  { field: "role", headerName: "Role", flex: 1, minWidth: 140 },
  { field: "department", headerName: "Department", flex: 1, minWidth: 140 },
  {
    field: "createdAt",
    headerName: "Created",
    flex: 1,
    minWidth: 200,
    valueFormatter: (date: string | undefined) => {
      if (!date) return "";
      return dayjs().to(date);
    },
  },
];

function UsersTable() {
  const { users } = useUsersConnection();

  return (
    <DataGrid<User>
      columns={columns}
      rows={users}
      getRowId={getRowId}
      disableRowSelectionOnClick
      disableMultipleRowSelection
      showToolbar
      slotProps={{
        toolbar: {
          csvOptions: {
            disableToolbarButton: true,
          },
          printOptions: {
            disableToolbarButton: true,
          },
        },
      }}
    />
  );
}

export { UsersTable };
