import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
//import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import PersonIcon from "@mui/icons-material/Person";
//import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
const Signin = () => {
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  let navigate = useNavigate();

  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(Username, Password);
    if (!error && !isLoading) {
      navigate("/");
    }
  };
  const PaperStyle = {
    padding: 20,
    height: "65vh",
    width: 280,
    margin: "20px auto",
  };
  const btnstyle = { margin: "8px " };
  return (
    <Grid>
      <Paper elevation={10} style={PaperStyle}>
        <Stack direction="column" spacing={2}>
          <Grid align="center">
            <Avatar>
              <PersonIcon></PersonIcon>
            </Avatar>
            <h2>Sign in</h2>
          </Grid>
          <TextField
            required
            id="outlined-required"
            label="Username"
            defaultValue="Hello World"
            onChange={(e) => setUsername(e.target.value)}
            value={Username}
            fullWidth
          />
          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
            value={Password}
            fullWidth
          />
          <Button
            variant="contained"
            disabled={isLoading}
            onClick={handleSubmit}
            style={btnstyle}
          >
            Login
          </Button>
        </Stack>

        <Typography>
          <Link href="/forgotpassword"> Forgot Password?</Link>
        </Typography>

        <Typography>Do you have an acount?
          <Link href='/signup'>Sign up </Link>
        </Typography>

        {error && <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>}

      </Paper>

    </Grid>
  )
}
export default Signin