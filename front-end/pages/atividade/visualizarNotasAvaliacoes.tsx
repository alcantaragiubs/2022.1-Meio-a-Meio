import React, { useState, ChangeEvent } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Image from "next/image";
import Head from "next/head";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import apiRequest from "../../util/apiRequest";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import RadioGroup from "@mui/material/RadioGroup";
import FormLabel from "@mui/material/FormLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Radio from "@mui/material/Radio";
import Moment from "moment";
import { useRouter } from "next/router";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { FixedSizeList, ListChildComponentProps } from 'react-window';

const theme = createTheme();

function renderRow(props: ListChildComponentProps) {
  const { index, style } = props;

  return (
    <ListItem style={style} key={index} component="div" disablePadding>
      <ListItemButton>
        <ListItemText primary={`Avaliação ${index + 1} Semestre 1`} />
      </ListItemButton>
    </ListItem>
  );
}

export default function VisualizarNotas() {
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push("/avaliacao/portal");
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
          <Box
            sx={{
              width: "100%",
              height: 400,
              maxWidth: 360,
              bgcolor: "background.paper",
            }}
          >
            <Grid item xs={12} md={6}>
              <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                Lista de Provas Cadastradas
              </Typography>
              <FixedSizeList
                height={400}
                width={360}
                itemSize={46}
                itemCount={10}
                overscanCount={5}
              >
                {renderRow}
              </FixedSizeList>
            </Grid>
            <Grid container justifyContent="center" sx={{ mt: 4 }}>
              <Grid item>
                <Link href="/docente/portal" variant="body2" >
                  {"Retornar ao Menu de Avaliações"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
