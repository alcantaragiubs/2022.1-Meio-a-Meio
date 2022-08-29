import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import Link from 'next/link'
import Grid from '@mui/material/Grid';


const PortalDoCurso: NextPage = () => {
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
            Bem vindo(a) ao Portal do Curso
          </h1>
  
          <p className={styles.description}>
            Verifique aqui todo tipo de informação sobre os cursos do Galdi
            {/* <code className={styles.code}>pages/index.tsx</code> */}
          </p>
  
          <div className={styles.grid}>
          <Link href="/curso/cadastro">
            <a
              className={styles.card}
            >
              <h2>Cadastrar &rarr;</h2>
              <p>
                Cadastre novos cursos por meio desta opção
              </p>
            </a>
            </Link>
            <Link href="/curso/listar">
            <a
              className={styles.card}
            >
              <h2>Listar &rarr;</h2>
              <p>
                Verifique aqui todos os cursos já cadastrados
              </p>
            </a>
            </Link>
            <Grid container justifyContent="center" sx={{ mt: 4 }}>
              <Grid item>
                <Link href="/docente/portal" >
                  {"Retornar ao Portal do Docente"}
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

export default PortalDoCurso    
