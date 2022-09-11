import Head from "next/head";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useState, ChangeEvent } from "react";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useRouter } from "next/router";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";

const theme = createTheme();

export default function Home() {
  const [data, setData] = useState<any>({});
  const [errors, setErrors] = useState<any>({});
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [close, setClose] = useState(false);
  const [errorMessage, setErrorMessage] = useState<any>("");
  const handleText = (e: ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
    let tempErrors = errors;
    delete tempErrors[e.target.name];
    setErrors(tempErrors);
  };
  const handleCheckData = () => {
    const { email, senha } = data;
    let emptyFields: any = {};

    if (!email || email.length === 0) {
      emptyFields.email = "O campo de e-mail não pode ser vazio";
    }
    if (!senha || senha.length === 0) {
      emptyFields.senha = "O campo de senha não pode ser vazio";
    }
    if (Object.keys(emptyFields).length > 0) {
      setErrors(emptyFields);
      return 1;
    }
    return 0;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (handleCheckData()) {
      setClose(true);
      return;
    }
    // apiRequest
    //   .post("administrador", { ...data})
    //   .then((result) => {
    //     setOpen(true);
    //     router.push("/docente/portal");
    //     console.log("ok");
    //   })
    //   .catch((err) => {
    //     setErrorMessage(err.response.data.message);
    //     setClose(true);
    //     console.log("errado", err);
    //   });
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
          <Box
            sx={{
              marginTop: 20,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Head>
              <title>Galdi</title>
              <meta name="description" content="Generated by meio a meio" />
              <link rel="icon" type="image/png" href="/favicon.ico" />
            </Head>
            <Typography component="h1" variant="h5">
              Administrador, entrar no sistema:
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="matricula"
                label="Matrícula"
                name="matricula"
                autoComplete="matricula"
                value={data ? data.matricula : ""}
                error={errors.matricula ? true : false}
                helperText={errors.matricula || null}
                onChange={handleText}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="senha"
                label="Senha"
                type="password"
                id="senha"
                autoComplete="current-password"
                value={data ? data.senha : ""}
                error={errors.senha ? true : false}
                helperText={errors.senha || null}
                onChange={handleText}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Lembre-se de mim"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Entrar
              </Button>
              <Collapse in={open}>
              <Alert
              severity="success"
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
                sx={{ mb: 2 }}
              >
                Login realizado com sucesso!
              </Alert>
            </Collapse>
            <Collapse in={close}>
              <Alert
              severity="error"
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setClose(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
                sx={{ mb: 2 }}
                >
                  {errorMessage}
              </Alert>
            </Collapse>
              <Grid container>
                <Grid item xs>
                  <Link href="/administrador/esqueceuASenha" variant="body2">
                    Esqueceu a senha?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/administrador/cadastro" variant="body2">
                    {"Não possui uma conta? Inscreva-se"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
      </Container>
    </ThemeProvider>
  );
};