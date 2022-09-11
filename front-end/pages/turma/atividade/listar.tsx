import Head from "next/head";
import styles from "../../../styles/Home.module.css";
import Layout from "../../../component/layout";
import apiRequest from "../../../util/apiRequest";
import { useRouter } from "next/router";
import React, { useState, ChangeEvent, useEffect } from "react";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

export default function PortalDaAtividadeTurma() {
  const [atividadeTurma, setAtividadeTurma] = useState<any>([]);
  const router = useRouter();
  async function getAtividadesTurma(){
    const resAtividadesTurma = await apiRequest.get("atividade");
    if (resAtividadesTurma.data) {
      setAtividadeTurma(resAtividadesTurma.data);
    }
  }
  useEffect(() => {
    getAtividadesTurma();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Galdi</title>
        <meta name="description" content="Generated by meio a meio" />
      </Head>
      <Layout>
        <main className={styles.main}>
          <p className={styles.description}>Lista de Atividades</p>
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
                  <TableCell align="center">Nome</TableCell>
                  <TableCell align="center">Prova?</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {atividadeTurma.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">
                      {row.nome}
                    </TableCell>
                    <TableCell align="center">
                      {row.isTest}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Button
              variant="outlined"
              onClick={() => router.push({pathname: "cadastro", query: turma})}
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
