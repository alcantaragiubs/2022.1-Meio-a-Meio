import React, { useState, ChangeEvent, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Image from "next/image";
import Head from "next/head";
import { useRouter } from "next/router";
import apiRequest from "../../util/apiRequest";
import IconButton from '@mui/material/IconButton';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import CloseIcon from "@mui/icons-material/Close";
import {
  Select,
  MenuItem,
  SelectChangeEvent,
  FormHelperText,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
const theme = createTheme();

export default function Cadastro({
  listaDisciplinas: listaDisciplinas,
  listaProfessores: listaProfessores,
  listaCursos: listaCursos,
  error,
}) {
  const [data, setData] = useState<any>({});
  const [errors, setErrors] = useState<any>({});
  const [professor, setProfessor] = useState<any>([]);
  const [disciplina, setDisciplina] = useState<any>([]);
  const [curso, setCurso] = useState<any>([]);
  const [open, setOpen] = useState(false);
  const [close, setClose] = useState(false);
  const [errorMessage, setErrorMessage] = useState<any>("");
  const router = useRouter();

  useEffect(() => {
    if (listaDisciplinas) {
      setDisciplina(listaDisciplinas);
    }
    if (listaProfessores) {
      setProfessor(listaProfessores);
    }
    if (listaCursos) {
      setCurso(listaCursos);
    }
    //erros
  }, []);
  useEffect(() => {
    if (Object.keys(router.query).length === 0) {
      router.push("/disciplina/portal");
    }
    setData(router.query);
  }, []);
  const handleDate = (e: SelectChangeEvent<HTMLInputElement>) => {
    console.log(e);
    const formatedData = Moment(e).format("yyyy/MM/DD");
    setData({ ...data, data_de_nascimento: formatedData });
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(data);
    if (handleCheckData()) {
      return;
    }
    apiRequest
      .put("turma/" + router.query.id, { ...data })
      .then((result) => {
        router.push("/turma/portal");
        console.log("ok");
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message);
        setClose(true);
        console.log("errado", err);
      });
  };
  const handleText = (e: ChangeEvent<HTMLInputElement>) => {
    const clearText = e.target.value.replace(/\d/, "");
    setData({ ...data, [e.target.name]: clearText });
    let tempErrors = errors;
    delete tempErrors[e.target.name];
    setErrors(tempErrors);
  };

  const handleNumber = (e: ChangeEvent<HTMLInputElement>) => {
    const clearNumber = e.target.value.replace(/\D/, "");
    setData({ ...data, [e.target.name]: clearNumber });
  };

  const handleCheckData = () => {
    const { nome_turma, curso } = data;
    let emptyFields: any = {};

    if (!nome_turma || nome_turma.length === 0) {
      emptyFields.nome_turma = "Nome Vazio";
    }
    if (!curso || curso.length === 0) {
      emptyFields.curso = "Curso Vazio";
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
            {/* <Image src= "/images/logo.jpeg" width= '600px' height= '150px'/> */}
          </div>
          <Typography component="h1" variant="h5">
            Edite a turma aqui:
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  error={errors.nome_turma ? true : false}
                  helperText={errors.nome_turma || null}
                  fullWidth
                  id="nome_turma"
                  label="Nome da Turma"
                  name="nome_turma"
                  autoComplete="nome_turma"
                  onChange={handleText}
                  value={data ? data.nome_turma : ""}
                />
              </Grid>
              <Grid item xs={3}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Data"
                    name="data"
                    inputFormat="dd/MM/yyyy"
                    value={data ? data.data : ""}
                    onChange={handleDate}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12}>
                <InputLabel id="professor">Professor</InputLabel>
                <Select
                  fullWidth
                  onChange={(e) =>
                    setData({ ...data, professor: e.target.value })
                  }
                  label={"Professor"}
                  value={data ? data.professor : ""}
                >
                  {professor.map((i, index) => (
                    <MenuItem key={index} value={i.id}>
                      {i.nome_completo}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={12}>
                <InputLabel id="disciplina">Disciplina</InputLabel>
                <Select
                  fullWidth
                  onChange={(e) =>
                    setData({ ...data, disciplina: e.target.value })
                  }
                  label={"Disciplina"}
                  value={data ? data.disciplina : ""}
                >
                  {disciplina.map((i, index) => (
                    <MenuItem key={index} value={i.id}>
                      {i.nome_disciplina}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={12}>
                <InputLabel id="curso" required>
                  Curso
                </InputLabel>
                <Select
                  required
                  fullWidth
                  error={errors.curso ? true : false}
                  onChange={(e) => setData({ ...data, curso: e.target.value })}
                  label={"Curso"}
                  value={data ? data.curso : ""}
                >
                  {curso.map((i, index) => (
                    <MenuItem key={index} value={i.id}>
                      {i.nome}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText error>
                  {errors.curso}
                </FormHelperText>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Editar Turma
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
                <Link href="/turma/portal" variant="body2">
                  Retornar ao Menu Principal
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export async function getServerSideProps() {
  const resProfessor = await apiRequest.get("professor"); //lista de professores
  const resDisciplina = await apiRequest.get("disciplina"); //lista de disciplinas
  const resCursos = await apiRequest.get("curso");
  console.log("aaa", resDisciplina);
  if (
    !resProfessor ||
    !resDisciplina ||
    !resCursos ||
    !resProfessor.data ||
    !resDisciplina.data ||
    !resCursos.data
  ) {
    return { props: { error: "Falha ao carregar conteúdo" } };
  }

  return {
    props: {
      listaProfessores: resProfessor.data,
      listaDisciplinas: resDisciplina.data,
      listaCursos: resCursos.data,
      error: null,
    },
  };
}
