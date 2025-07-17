import SignalWifiStatusbarNotConnectedTwoToneIcon from "@mui/icons-material/SignalWifiStatusbarNotConnectedTwoTone";
import SignalWifiStatusbarConnectedNoInternetTwoToneIcon from "@mui/icons-material/SignalWifiStatusbarConnectedNoInternetTwoTone";
import SignalWifiStatusbar3BarTwoToneIcon from "@mui/icons-material/SignalWifiStatusbar3BarTwoTone";

import { useUsersConnection } from "../hooks/useUsersConnection";
import { Box, Typography } from "@mui/material";
import { ReadyState } from "react-use-websocket";

function getConnectionText(readyState: ReadyState) {
  if (readyState === ReadyState.OPEN) {
    return "Connected";
  }
  if (readyState === ReadyState.CONNECTING) {
    return "Connecting";
  }
  return "Disconnected";
}

function getConnectionIcon(readyState: ReadyState) {
  if (readyState === ReadyState.OPEN) {
    return <SignalWifiStatusbar3BarTwoToneIcon color="success" />;
  }
  if (readyState === ReadyState.CONNECTING) {
    return <SignalWifiStatusbarNotConnectedTwoToneIcon color="warning" />;
  }
  return <SignalWifiStatusbarConnectedNoInternetTwoToneIcon color="error" />;
}

function ConnectionStatus() {
  const { readyState } = useUsersConnection();

  return (
    <Box alignItems="center" display="flex">
      <Typography sx={{ mr: 1 }}>{getConnectionText(readyState)}</Typography>
      {getConnectionIcon(readyState)}
    </Box>
  );
}

export { ConnectionStatus };
