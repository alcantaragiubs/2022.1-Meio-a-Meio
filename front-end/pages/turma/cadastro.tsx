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
import { Select, MenuItem, SelectChangeEvent } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";

const theme = createTheme();

export default function Cadastro({
  listaDisciplinas,
  listaProfessores,
  error,
}) {
  const [data, setData] = useState<any>({});
  const [errors, setErrors] = useState<any>({});
  const [professor, setProfessor] = useState<any>([]);
  const [disciplina, setDisciplina] = useState<any>([]);
  const router = useRouter();

  useEffect(() => {
    if (listaDisciplinas) {
      setDisciplina(listaDisciplinas);
    }
    if (listaProfessores) {
      setProfessor(listaProfessores);
    }
    console.log(listaDisciplinas);
    console.log(listaProfessores);
    console.log(error);
    //erros
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(data);
    if (handleCheckData()) {
      return;
    }
    apiRequest
      .post("turma/", { ...data })
      .then((result) => {
        router.push("/turma/listar");
        console.log("ok");
      })
      .catch((err) => {
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
    const { nomeTurma, horarios, dias, professor, disciplina } = data;
    let emptyFields: any = {};

    if (!nomeTurma || nomeTurma.length === 0) {
      emptyFields.nomeTurma = "Nome Vazio";
    }
    if (!horarios || horarios.length === 0) {
      emptyFields.horarios = "Horário Vazio";
    }
    if (!dias || dias.length === 0) {
      emptyFields.dias = "Dia Vazio";
    }
    if (!professor || professor.length === 0) {
      emptyFields.professor = "Professor Vazio";
    }
    if (!disciplina || disciplina.length === 0) {
      emptyFields.disciplina = "Disciplina Vazio";
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
              <link rel="icon" href="/images/icon.png" />
            </Head>
            {/* <Image src= "/images/logo.jpeg" width= '600px' height= '150px'/> */}
          </div>
          <Typography component="h1" variant="h5">
            Insira os dados cadastrais da turma
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
                  error={errors.nomeTurma ? true : false}
                  helperText={errors.nomeTurma || null}
                  fullWidth
                  id="nomeTurma"
                  label="Nome da Turma"
                  name="nomeTurma"
                  autoComplete="nomeTurma"
                  onChange={handleText}
                  value={data ? data.nomeTurma : ""}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  error={errors.horarios ? true : false}
                  helperText={errors.horarios || null}
                  fullWidth
                  id="horarios"
                  label="Horário"
                  name="horarios"
                  onChange={handleText}
                  value={data ? data.horarios : ""}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  error={errors.dias ? true : false}
                  helperText={errors.dias || null}
                  fullWidth
                  id="dias"
                  label="Dia"
                  name="dias"
                  onChange={handleNumber}
                  value={data ? data.dias : ""}
                />
              </Grid>
              {/* terminar */}
              <Grid item xs={12}>
              <InputLabel id="4" required>
                  Professor
                </InputLabel>
                <Select
                  fullWidth
                  error={errors.professor ? true : false}
                  onChange={(e) =>
                    setData({ ...data, professor: e.target.value })
                  }
                  label={"Professor"}
                  value={data ? data.professor : ""}
                >
                  {professor.map((i, index) => (
                    <MenuItem key={index} value={i.id}>
                      {i.nome}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={12}>
                <InputLabel id="disciplina" required>
                  Disciplina
                </InputLabel>
                <Select
                  required
                  fullWidth
                  error={errors.disciplina ? true : false}
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
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Cadastrar Turma
            </Button>
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
  const resProfessor = await apiRequest.get('professor') //lista de professores
  const resDisciplina = await apiRequest.get("disciplina"); //lista de disciplinas
  console.log("aaa", resDisciplina);
  if(!resProfessor || !resDisciplina || !resProfessor.data || !resDisciplina.data){
    return {props: {error: 'Falha ao carregar conteúdo'}}
  }

  return {
    props: {
      listaProfessores: resProfessor.data,
      listaDisciplinas: resDisciplina.data,
      error: null,
    },
  };
}
