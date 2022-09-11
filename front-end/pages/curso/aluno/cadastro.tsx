import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Link from "@mui/material/Link";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Head from "next/head";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import { useRouter } from "next/router";
import React, { useState, ChangeEvent, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import apiRequest from "../../../util/apiRequest";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import FormHelperText from "@mui/material/FormHelperText";
const theme = createTheme();

export default function CadastroAlunosEmCursos({
  listaAlunos: listaAlunos,
  error,
}) {
  const [data, setData] = useState<any>({});
  const [errors, setErrors] = useState<any>({});
  const router = useRouter();
  const [aluno, setAluno] = useState<any>([]);
  const [open, setOpen] = useState(false);
  const [close, setClose] = useState(false);
  const [errorMessage, setErrorMessage] = useState<any>("");
  
  useEffect(() => {
    if (listaAlunos) {
      setAluno(listaAlunos);
    }
    setData(router.query);
    console.log(router.query.id);
    //erros
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (handleCheckData()) {
      setClose(true);
      return;
    }
    apiRequest
      .post("curso/" + router.query.id, {...data, curso_id: data.id})
      .then((result) => {
        setOpen(true);
        router.push("/curso/portal");
        console.log("ok");
        console.log(data)
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message);
        setClose(true);
      });
  };
  const handleText = (e: ChangeEvent<HTMLInputElement>) => {
    setData({...data,[e.target.name]: e.target.value});
  };

  const handleCheckData = () => {
    const { aluno_id } = data;
    let emptyFields: any = {};
    if (!aluno_id || aluno_id.length === 0) {
      emptyFields.aluno_id = "Aluno Inválido";
    }
    if (Object.keys(emptyFields).length > 0) {
      setErrors(emptyFields);
      return 1;
    }
    return 0;
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div>
            <Head>
              <title>Galdi</title>
              <meta name="description" content="Generated by meio a meio" />
            </Head>
          </div>
          <Typography component="h1" variant="h5">
            Cadastro de Alunos
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
            <Grid item xs={4}>
                <FormControl sx={{ m: 0, minWidth: 150 }}>
                  <InputLabel id="aluno_id" required>
                    Aluno
                  </InputLabel>
                  <Select
                    required
                    fullWidth
                    error={errors.aluno_id ? true : false}
                    onChange={(e) =>
                      setData({ ...data, aluno_id: e.target.value })
                    }
                    label={"Aluno"}
                    value={data ? data.aluno_id : ""}
                  >
                    {aluno.map((i, index) => (
                      <MenuItem key={index} value={i.id}>
                        {i.nome_completo}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText error>
                  {errors.aluno_id}
                </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
              <TextField
                  disabled
                  fullWidth
                  id="nome"
                  label="Curso"
                  name="nome"
                  autoComplete="nome"
                  onChange={handleText}
                  value= {data?data.nome:""}
                />
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Cadastrar Aluno
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
                Cadastro realizado com sucesso!
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
              <Grid container justifyContent="center">
                <Grid item>
                  <Link href="/curso/portal" variant="body2">
                    Retornar ao Menu Principal
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
export async function getServerSideProps() {
  const resAluno = await apiRequest.get("aluno");
  if (!resAluno ||!resAluno.data) {
    return { props: { error: "Falha ao carregar conteúdo" } };
  }

  return {
    props: {
      listaAlunos: resAluno.data,
      error: null,
    },
  };
}