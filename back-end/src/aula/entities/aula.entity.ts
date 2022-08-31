import { Aluno } from 'src/aluno/aluno.entity';
import { Turma } from 'src/turma/entities/turma.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Aula {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    data: Date;

    @ManyToOne(()=> Turma, (turma)=> turma.aulas)
    turma: Turma;

    @ManyToMany(()=> Aluno)
    @JoinTable()
    alunos: Aluno[];
}
