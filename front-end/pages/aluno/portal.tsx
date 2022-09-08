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

export default function PortalDoAluno({ listaAlunos: listaAlunos, error }) {
  const [aluno, setAluno] = useState<any>([]);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (listaAlunos) {
      setAluno(listaAlunos);
    }
    console.log(listaAlunos);
    console.log(error);
    //erros
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Galdi</title>
        <meta name="description" content="Generated by meio a meio" />
      </Head>
      <Layout>
        <main className={styles.main}>
          <p className={styles.description}>Alunos</p>
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
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell align="center">Nome</TableCell>
                  <TableCell align="center">Matricula</TableCell>
                  <TableCell align="center">Especialização</TableCell>
                  {/* <TableCell align="center">Status</TableCell> */}
                  <TableCell align="center">Opções</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {aluno.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                      >
                        {open ? (
                          <KeyboardArrowUpIcon />
                        ) : (
                          <KeyboardArrowDownIcon />
                        )}
                      </IconButton>
                      {row.nome_completo}
                    </TableCell>
                    <TableCell align="center">{row.matricula || ""}</TableCell>
                    <TableCell align="center">
                      {row.especializacao || ""}
                    </TableCell>
                    {/* <TableCell align="center">{row.status_financeira}</TableCell> */}
                    <TableCell align="center">
                      <IconButton
                        color="primary"
                        aria-label="edit"
                        component="label"
                        onClick={() => router.push({pathname: "/aluno/editar", query: {...row}})}
                      >
                        <ModeEditIcon />
                      </IconButton>
                      <IconButton
                        color="primary"
                        aria-label="delete"
                        component="label"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Button
              variant="outlined"
              onClick={() => router.push("/aluno/cadastro")}
              sx={{ alignSelf: "center" }}
            >
              Cadastrar
            </Button>
          </div>
        </main>
      </Layout>
    </div>
  );
}
export async function getServerSideProps() {
  const resAlunos = await apiRequest.get("aluno");
  if (!resAlunos || !resAlunos.data) {
    return { props: { error: "Falha ao carregar conteúdo" } };
  }

  return {
    props: {
      listaAlunos: resAlunos.data,
      error: null,
    },
  };
}
