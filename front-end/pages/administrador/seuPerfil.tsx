import Head from "next/head";
import styles from "../../styles/Home.module.css";
import Layout from "../../component/layout";
import apiRequest from "../../util/apiRequest";
import { useRouter } from "next/router";
import React, { useState, ChangeEvent, useEffect } from "react";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

export default function PerfilAdministrador({ listaAdms: listaAdms, error }) {
  const [administrador, setAdm] = useState<any>([]);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  //   useEffect(() => {
  //     if (listaAdms) {
  //       setAdm(listaAdms);
  //     }
  //     console.log(listaAdms);
  //     console.log(error);
  //     //erros
  //   }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Galdi</title>
        <meta name="description" content="Generated by meio a meio" />
      </Head>
      <Layout>
        <main className={styles.main}>
          <p className={styles.description}>Seu Perfil</p>
          <div
            style={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow sx={{ display: "flex", flexDirection: "column" }}>
                  <TableCell align="left">Nome</TableCell>
                  <TableCell align="left">Matrícula</TableCell>
                  <TableCell align="left">Celular</TableCell>
                  <TableCell align="left">CPF</TableCell>
                  <TableCell align="left">Data de Nascimento</TableCell>
                  <TableCell align="left">RG/RNE</TableCell>
                  <TableCell align="left">Email</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {administrador.map((row, index) => (
                  <TableRow key={index} sx={{ display: "flex", flexDirection: "column" }}>
                    <TableCell component="th" scope="row" align="right">
                      {row.id}
                    </TableCell>
                    <TableCell align="right">{row.nome_completo}</TableCell>
                    <TableCell align="right">{row.matricula || ""}</TableCell>
                    <TableCell align="right">{row.celular}</TableCell>
                    <TableCell align="right">{row.cpf}</TableCell>
                    <TableCell align="right">
                      {row.data_de_nascimento}
                    </TableCell>
                    <TableCell align="right">{row.rg_rne}</TableCell>
                    <TableCell align="right">{row.email}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        color="primary"
                        aria-label="edit"
                        component="label"
                        onClick={() => router.push("/administrador/editar")}
                      >
                        <ModeEditIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </main>
      </Layout>
    </div>
  );
}
// export async function getServerSideProps() {
//   const resAdms = await apiRequest.get("administrador");
//   if (!resAdms || !resAdms.data) {
//     return { props: { error: "Falha ao carregar conteúdo" } };
//   }

//   return {
//     props: {
//       listaAdms: resAdms.data,
//       error: null,
//     },
//   };
// }
