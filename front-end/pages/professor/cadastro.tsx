import * as React from 'react';
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

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/mdsreq-fga-unb/2022.1-Meio-a-Meio">
        Meio a Meio
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function Cadastro() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      senha: data.get('senha'),
    });
  };

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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Dados Cadastrais
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
          <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="nomeCompleto"
                  label="Nome Completo"
                  name="nomeCompleto"
                  autoComplete="nomeCompleto"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="matricula"
                  required
                  fullWidth
                  id="matricula"
                  label="Matrícula"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="dataNascimento"
                  label="Data de Nascimento"
                  name="dataNascimento"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="cpf"
                  label="CPF"
                  type="cpf"
                  id="cpf"
                />
              </Grid><Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="especialista"
                  label="Especialista"
                  type="especialista"
                  id="especialista"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="rg"
                  label="RG"
                  type="rg"
                  id="rg"
                />
              </Grid>
              <Grid item xs={2} >
                <TextField
                  required
                  fullWidth
                  name="uf_rg"
                  label="UF RG"
                  type="uf_rg"
                  id="uf_rg"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="emissor_rg"
                  label="Emissor RG"
                  type="emissor_rg"
                  id="emissor_rg"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="telefone"
                  label="Telefone"
                  type="telefone"
                  id="telefone"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="crm"
                  label="CRM"
                  type="crm"
                  id="crm"
                 
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="uf_crm"
                  label="UF CRM"
                  type="uf_crm"
                  id="uf_crm"
                 
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="sexo"
                  label="Sexo"
                  type="sexo"
                  id="sexo"
                 
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="especializacao"
                  label="Especialização"
                  type="especializacao"
                  id="especializacao"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="email"
                  label="E-mail"
                  type="email"
                  id="email"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Cadastrar Professor
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
              
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}

/* 
nome completo
matrciula
data de nascimento
cpf
rg
emissora_rg
uf_rg
ddd+telefone
crm
uf_crm
sexo
especializacao
email
*/