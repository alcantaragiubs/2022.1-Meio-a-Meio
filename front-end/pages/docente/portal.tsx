import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';

const Docente: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Docente</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Portal do Docente
        </h1>

        <p className={styles.description}>
          Acesse aqui as informações desejadas{' '}
          {/* <code className={styles.code}>pages/index.tsx</code> */}
        </p>

        <div className={styles.grid}>
          <a
            href="http://localhost:3000/disciplina/cadastro"
            className={styles.card}
          >
            <h2>Disciplinas &rarr;</h2>
            <p>Cadastre novas turmas por meio desta opção</p>
          </a>

          <a
            href="http://localhost:3000/turma/cadastro"
            className={styles.card}
          >
            <h2>Turmas &rarr;</h2>
            <p>
              Cadastre novas turmas por meio desta opção
            </p>
          </a>
          <a>
          <Grid container>
              <Grid item>
                <Link href="http://localhost:3000/" variant="body2">
                  {"Retornar ao Menu Principal"}
                </Link>
              </Grid>
            </Grid>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://mdsreq-fga-unb.github.io/2022.1-Meio-a-Meio/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Copyright © Meio a Meio
          {/* <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span> */}
        </a>
      </footer>
    </div>
  )
}

export default Docente
