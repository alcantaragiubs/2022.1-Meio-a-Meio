import React, {useState, ChangeEvent, useEffect} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Image from 'next/image';
import Head from 'next/head';
import { useRouter } from 'next/router'
import apiRequest from "../../util/apiRequest";
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Alert from '@mui/material/Alert';
import CloseIcon from "@mui/icons-material/Close";


const theme = createTheme();

export default function Editar() {
  const [data, setData] = useState<any>({});
  const [errors , setErrors] = useState<any>({});
  const router = useRouter();
  console.log(router.query);
  const [open, setOpen] = useState(false);
  const [close, setClose] = useState(false);
  const [errorMessage, setErrorMessage] = useState<any>("");
  useEffect(() => {
    if (Object.keys(router.query).length === 0) {
      router.push("/curso/portal");
    }
    setData(router.query);
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("aaaa");
    if(handleCheckData()){
      console.log("bbbb");
      return;
    }
    apiRequest
      .put("curso/" + router.query.id, { ...data})
      .then((result) => {
        router.push('/curso/portal')
        console.log("ok");
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message);
        setClose(true);
        console.log("errado", err);
      });

    const date = new FormData(event.currentTarget);
  };
  const handleText = (e: ChangeEvent<HTMLInputElement>) => {
    const clearText = e.target.value.replace(/\d/,"");
    setData({...data,[e.target.name]: clearText});
    let tempErrors = errors
    delete tempErrors[e.target.name]
    setErrors(tempErrors);
  };

  const handleCheckData = () => {
    const {
        nome ,
    } = data;
    let emptyFields: any = {}

    if(!nome || nome.length === 0 || nome.length < 4 ) {
      emptyFields.nome = "Nome Inválido"
    } 
    if(Object.keys(emptyFields).length > 0){
      setErrors(emptyFields);
      return 1;
    }
    return 0;
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div>
          <Head>
            <title>Galdi</title>
            <meta name="description" content="Generated by meio a meio" />
          </Head>
        </div>
          <Typography component="h1" variant="h5">
            Edite os dados desejados do curso aqui:
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
          <Grid item xs={12}>
                <TextField
                  required
                  error={errors.nome?true:false}
                  helperText={errors.nome||null}
                  fullWidth
                  id="nome"
                  label="Nome do Curso"
                  name="nome"
                  autoComplete="nome"
                  onChange={handleText}
                  value= {data?data.nome:""}
                />
              </Grid>
              <Grid item xs={12} >
                <TextField
                  fullWidth
                  id="unidade"
                  label="Unidade"
                  name="unidade"
                  onChange={handleText}
                  value= {data?data.unidade:""}
                />
              </Grid>

              </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Editar Curso
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
                Alterações realizadas com sucesso!
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
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}