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
import Checkbox from "@mui/material/Checkbox";
import apiRequest from "../../util/apiRequest";

const theme = createTheme();

export default function CadastroDiarioDeAula(
  {listaTurmas: listaTurmas,
  error,}
) {
  const [data, setData] = useState<any>({});
  const [errors, setErrors] = useState<any>({});
  const router = useRouter();''
  const [professor, setProfessor] = React.useState("");
  const [turma, setTurma] = useState<any>([]);

  useEffect(() => {
    if (listaTurmas) {
      setTurma(listaTurmas);
    }
    console.log(listaTurmas);
    console.log(error);
    //erros
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (handleCheckData()) {
      return;
    }
    router.push("/turma/listar");
  };
  const handleText = (e: ChangeEvent<HTMLInputElement>) => {
    const clearText = e.target.value.replace(/\d/, "");
    setData({ ...data, [e.target.name]: clearText });
    let tempErrors = errors;
    delete tempErrors[e.target.name];
    setErrors(tempErrors);
  };
  const handleChange = (event: SelectChangeEvent) => {
    setProfessor(event.target.value);
  };
  const handleCheckData = () => {
    const {
      date,
    } = data;
    let emptyFields: any = {};
    if (!date || date.length === 0) {
      emptyFields.date = "Atividade Inválida";
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
            Cadastro de Diário de Aula
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={1.5}>
              <Grid item xs={2}>
                <TextField
                  required
                  error={errors.date ? true : false}
                  helperText={errors.date || null}
                  fullWidth
                  id="date"
                  label="Data"
                  name="date"
                  autoComplete="date"
                  onChange={handleText}
                  value={data ? data.date : ""}
                />
              </Grid>
              <Grid item xs={3}>
                <FormControl sx={{ m: 0, minWidth: 150 }}>
                  <InputLabel id="turma" required>
                    Turma
                  </InputLabel>
                  <Select
                     required
                     fullWidth
                     error={errors.turma ? true : false}
                     onChange={(e) =>
                       setData({ ...data, turma: e.target.value })
                     }
                     label={"Turma"}
                     value={data ? data.turma : ""}
                  >
                    {turma.map((i, index) => (
                    <MenuItem key={index} value={i.id}>
                      {i.nomeTurma}
                    </MenuItem>
                  ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl sx={{ m: 0, minWidth: 150 }}>
                  <InputLabel id="id_professor" required>
                    Professor
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={data ? data.id_professor : ""}
                    onChange={handleChange}
                    error={errors.id_professor ? true : false}
                  >
                    <MenuItem value={1}>Guilherme</MenuItem>
                    <MenuItem value={2}>Bruna</MenuItem>
                    <MenuItem value={3}>Samuel</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  required
                  error={errors.materia ? true : false}
                  helperText={errors.materia || null}
                  fullWidth
                  id="materia"
                  label="Matéria (Diga aqui o tema central da aula)"
                  name="materia"
                  autoComplete="materia"
                  onChange={handleText}
                  value={data ? data.materia : ""}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  error={errors.materia ? true : false}
                  helperText={errors.materia || null}
                  fullWidth
                  id="conteúdo"
                  label="Conteúdo (Descreva aqui o que foi passado durante a aula)"
                  name="conteudo"
                  autoComplete="conteudo"
                  onChange={handleText}
                  value={data ? data.materia : ""}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="observacoes"
                  label="Observações (Notas extras caso queira-se registrar)"
                  name="observacoes"
                  autoComplete="observacoes"
                  onChange={handleText}
                  value={data ? data.observacoes : ""}
                />
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Cadastrar Atividade
              </Button>
              <Grid container justifyContent="center">
                <Grid item>
                  <Link href="/atividade/portal" variant="body2">
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
  const resTurma = await apiRequest.get("turma"); //lista de disciplinas
  console.log("aaa", resTurma);
  if(!resTurma || !resTurma.data){
    return {props: {error: 'Falha ao carregar conteúdo'}}
  }

  return {
    props: {
      listaTurmas: resTurma.data,
      error: null,
    },
  };
}