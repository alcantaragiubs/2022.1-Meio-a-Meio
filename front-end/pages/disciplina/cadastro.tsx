import React, { useState, ChangeEvent, useEffect } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Head from "next/head";
import { useRouter } from "next/router";
import apiRequest from "../../util/apiRequest";
import { Select, MenuItem, SelectChangeEvent } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";

const theme = createTheme();

export default function Cadastro({listaProfessores, error}) {
  const [data, setData] = useState<any>({});
  const [errors, setErrors] = useState<any>({});
  const router = useRouter();
  const [professor, setProfessor] = useState<any>([]);

  useEffect(() => {
    if (listaProfessores) {
      setProfessor(listaProfessores);
    }
    console.log(listaProfessores);
    console.log(error);
    //erros
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    console.log(data);
    event.preventDefault();
    if (handleCheckData()) {
      return;
    }
    apiRequest
      .post("disciplina", { ...data })
      .then((result) => {
        router.push("/disciplina/listar");
        console.log("ok");
      })
      .catch((err) => {
        console.log("errado", err.message);
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
    const stringToNumber = parseInt(clearNumber);
    setData({ ...data, [e.target.name]: stringToNumber});
  };

  const handleCheckData = () => {
    const { nome_disciplina, carga_horaria, professor } = data;
    let emptyFields: any = {};

    if (!nome_disciplina || nome_disciplina.length === 0) {
      emptyFields.nome_disciplina = "Nome Vazio";
    }
    if (!carga_horaria || carga_horaria.length === 0) {
      emptyFields.carga_horaria = "Carga Horaria Vazia";
    }
    if (!professor || professor.length === 0) {
      emptyFields.professor = "Professor Vazio";
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
            Insira os dados cadastrais da disciplina
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
                  error={errors.nome_disciplina ? true : false}
                  helperText={errors.nome_disciplina || null}
                  fullWidth
                  id="nome_disciplina"
                  label="Nome da Disciplina"
                  name="nome_disciplina"
                  autoComplete="nome_disciplina"
                  onChange={handleText}
                  value={data ? data.nome_disciplina : ""}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  error={errors.carga_horaria ? true : false}
                  helperText={errors.carga_horaria || null}
                  fullWidth
                  id="carga_horaria"
                  label="Carga Horária"
                  name="carga_horaria"
                  onChange={handleNumber}
                  value={data ? data.carga_horaria : ""}
                  type="number"
                />
              </Grid>
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
                  value={data ? data.professor : null}
                >
                  {professor.map((i, index) => (
                    <MenuItem key={index} value={i.id}>
                      {i.nome_completo}
                      {console.log('DIEFHOHIFE', i.nome_completo)}
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
              Cadastrar Disciplina
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link href="/disciplina/portal" variant="body2">
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
  const resProfessor = await apiRequest.get('professor') //lista de professoress
  if(!resProfessor || !resProfessor.data){
    return {props: {error: 'Falha ao carregar conteúdo'}}
  }

  return {
    props: {
      listaProfessores: resProfessor.data,
      error: null,
    },
  };
}