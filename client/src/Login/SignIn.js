import * as React from "react";
// import Avatar from '@mui/material/Avatar';
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
// import { createTheme } from "@mui/material/styles";
// import ExpenseImage from "../assets/expense_management0.jpg"
import Paper from "@mui/material/Paper";
import axios from "axios";
import ls from "local-storage";
import { useNavigate } from "react-router-dom";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      Expense App {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}


export default function SignIn() {
  const navigate = useNavigate();

  const [matches, setMatches] = React.useState(
    window.matchMedia("(min-width: 768px)").matches
  );
  React.useEffect(() => {
    window
      .matchMedia("(min-width: 768px)")
      .addEventListener("change", (e) => setMatches(e.matches));
  }, []);
  const signin = async (email, password) => {
    let userDetail = {
      email: email,
      password: password,
    };
    await axios
      .post("http://localhost:5001/auth/signin", userDetail)
      .then((res1) => {
        console.log(res1.data.token);
        ls.set("token", res1.data.token);
        ls.set("userID", res1.data.userId);

        if (res1.data.status === "Ok") {
          navigate("/dashboard/app", { replace: true });
        } else {
        }
        console.log(res1.data);
      })
      .catch((errr) => {
        // if (res) {
        //
        //     alert("Income has been updated Sucessfully!")
        //
        //     navigate('/dashboard/app', { replace: true })
        // }
        console.log("error");

        console.log(errr);
      });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get("email") !== null) {
      signin(data.get("email"), data.get("password"));
    }
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <Paper
      style={{
        width: "100%",
        minHeight: "100vh",
        "--color-1": "#227cf2",
        "--color-2": " #20d456 ",

        background: `
          linear-gradient(
            180deg,
            var(--color-1),
            var(--color-2) 80% ) `,
        // Unrelated styles:

        padding: 30,
        display: "flex",
        flexDirection: matches ? "row" : "column",

        justifyContent: "space-around",
      }}
    >
      <Container
        style={{
          textAlign: "left",

          margin: "6% 15% 0px  auto ",
        }}
      >
        <h1
          style={{ fontFamily: "Sans Serif", color: "#dfe9f3", fontSize: 80 }}
        >
          Expense Manager
        </h1>
        <p style={{ fontFamily: "Sans Serif", color: "#dfe9f3" }}>
          This applicaiton helps you to manage and track your day-to-day
          expenses in a organized place where you can manage and store your
          expense's history.
        </p>
      </Container>
      <Container
        style={{
          "--color-1": "#dfe9f3",
          "--color-2": " #c2e9fb ",

          background: `
            linear-gradient(
              180deg,
              var(--color-1),
              var(--color-2) 80%
            )
          `,
          border: "none",
          borderRadius: "15px",
        }}
        component="main"
        maxWidth="xs"
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography sx={{ mt: 3, mb: 3 }} component="h1" variant="h4">
            Sign In
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mb: 5 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              type="email"
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 5, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Paper>
  );
}
