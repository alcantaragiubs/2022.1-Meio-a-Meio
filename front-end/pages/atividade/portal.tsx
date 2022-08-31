import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import Link from 'next/link'
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";


const PortalDaTurma: NextPage = () => {
    //acessa qualquer post que quiser no blog
    const router = useRouter()
    return (
      <div className={styles.container}>
        <Head>
          <title>Galdi</title>
          <meta name="description" content="Generated by meio a meio" />
          <link rel="icon" href="/images/icon.png" />
        </Head>
  
        <main className={styles.main}>
          <h1 className={styles.title}>
            Atividades
          </h1>

          <div className={styles.grid}>
            <Link href="/atividade/cadastroNotasAtividades">
            <a
              className={styles.card}
            >
              <h2>Cadastrar &rarr;</h2>
              <p>
              Cadastre novas atividades aqui
              </p>
            </a>
            </Link>
            <Link href="/atividade/visualizarNotasAtividades">
            <a
              className={styles.card}
            >
              <h2>Atividades &rarr;</h2>
              <p>
                Veja suas atividades registradas aqui
              </p>
            </a>
            </Link>
            <Link href="/atividade/visualizarNotasAvaliacoes">
            <a
              className={styles.card}
            >
              <h2>Avaliações &rarr;</h2>
              <p>
                Veja suas avaliações registradas aqui
              </p>
            </a>
            </Link>
            {/* <Stack spacing={35} direction="row">
            <Button variant="outlined" href="/disciplina/cadastro">
              Cadastrar
            </Button>
            <Button variant="outlined" href="/disciplina/editar">
              Editar
            </Button>
          </Stack> */}
            <Grid container justifyContent="center" sx={{ mt: 4 }}>
              <Grid item>
                <Link href="/disciplina/portal" >
                  {"Retornar ao Portal da Disciplina"}
                </Link>
              </Grid>
            </Grid>
          </div>
        </main>
  
        <footer className={styles.footer}>
          <a
            href="https://mdsreq-fga-unb.github.io/2022.1-Meio-a-Meio/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Copyright © Meio a Meio
          </a>
        </footer>
      </div>
    )
}

export default PortalDaTurma    
