import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import Link from 'next/link'


const Inicio: NextPage = () => {
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
            Bem vindo(a) ao <a href="http://localhost:3000/">Galdi!</a>
          </h1>
  
          <p className={styles.description}>
            O site de gestão de alunos e docentes de medicina{' '}
            {/* <code className={styles.code}>pages/index.tsx</code> */}
          </p>
  
          <div className={styles.grid}>
          <Link href="/aluno/cadastro">
            <a
              className={styles.card}
            >
              <h2>Alunos &rarr;</h2>
              <p>
                Cadastre novos alunos por meio desta opção
              </p>
            </a>
            </Link>
            <Link href="/turma/cadastro">
            <a
              className={styles.card}
            >
              <h2>Turmas &rarr;</h2>
              <p>
                Cadastre novas turmas por meio desta opção
              </p>
            </a>
            </Link>
            <Link href="/curso/cadastro">
            <a
              className={styles.card}
            >
              <h2>Cursos &rarr;</h2>
              <p>
                Cadastre novos cursos por meio desta opção
              </p>
            </a>
            </Link>
            <Link href="/disciplina/cadastro">
            <a
              className={styles.card}
            >
              <h2>Disciplinas &rarr;</h2>
              <p>Cadastre novas disciplinas por meio desta opção</p>
            </a>
            </Link>
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

export default Inicio    
