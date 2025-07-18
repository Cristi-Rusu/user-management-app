import type { ReactElement } from "react";
import { Box, Typography } from "@mui/material";
import SignalWifiStatusbarNotConnectedTwoToneIcon from "@mui/icons-material/SignalWifiStatusbarNotConnectedTwoTone";
import SignalWifiStatusbarConnectedNoInternetTwoToneIcon from "@mui/icons-material/SignalWifiStatusbarConnectedNoInternetTwoTone";
import SignalWifiStatusbar3BarTwoToneIcon from "@mui/icons-material/SignalWifiStatusbar3BarTwoTone";

import { useUsersConnection } from "../hooks/useUsersConnection";
import type { ConnectionStatus } from "../types/socket";

const connectionText: Record<ConnectionStatus, string> = {
  connecting: "Connecting",
  connected: "Connected",
  disconnected: "Disconnected",
  reconnecting: "Reconnecting",
};

const connectionIcon: Record<ConnectionStatus, ReactElement> = {
  connecting: <SignalWifiStatusbarNotConnectedTwoToneIcon color="warning" />,
  connected: <SignalWifiStatusbar3BarTwoToneIcon color="success" />,
  disconnected: (
    <SignalWifiStatusbarConnectedNoInternetTwoToneIcon color="error" />
  ),
  reconnecting: <SignalWifiStatusbarNotConnectedTwoToneIcon color="warning" />,
};

function ConnectionStatusUI() {
  const { connectionStatus } = useUsersConnection();

  return (
    <Box alignItems="center" display="flex">
      <Typography sx={{ mr: 1 }}>{connectionText[connectionStatus]}</Typography>
      {connectionIcon[connectionStatus]}
    </Box>
  );
}

export { ConnectionStatusUI };
