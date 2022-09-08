import * as React from "react";
import Head from "next/head";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";

interface Column {
  id: "numeroChamada" | "code" | "sobrenome";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: "numeroChamada", label: "Nº", minWidth: 200, align: "left"},
  { id: "primeiroNome", label: "Nome", minWidth: 200 , align: "center"},
  { id: "sobrenome", label: "Sobrenome", minWidth: 200, align: "right"},
];

interface Data {
  numeroChamada: string;
  primeiroNome: string;
  sobrenome: string;
}

function createData(
  numeroChamada: string,
  primeiroNome: string,
  sobrenome: string,
): Data {
  return { numeroChamada, primeiroNome, sobrenome };
}

const rows = [
  createData("1", "Amanda", 'Ribeiro'),
  createData("2", "Bruna", 'Silva'),
  createData("3", "Carlos", 'Alcantara'),
  createData("4", "Davi", 'Godoy'),
  createData("5", "Eduarda", 'Sales'),
  createData("6", "Fábio", 'Silveira'),
  createData("7", "Gabriela", 'Nogueira'),
  createData("8", "Heitor", 'Domingues'),
  createData("9", "Maria", 'Ferreira'),
  createData("10", "Pedro", 'Cucco'),
];
interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  orderBy: string;
  rowCount: number;
}
export default function VisualizarListaPresenca(props: EnhancedTableProps) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { onSelectAllClick, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div>
      <div
        style={{
          height: 1,
          width: "100%",
          alignItems: "center",
          display: "flex",
          marginRight: "auto",
          marginLeft: "auto",
        }}
      >
        <Head>
          <title>Galdi</title>
          <meta name="description" content="Generated by meio a meio" />
        </Head>
      </div>
      <div>
        <Paper>
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" colSpan={1}>
                    Professor: Giulia
                  </TableCell>
                  <TableCell align="center" colSpan={1}>
                    Curso: Ortopedia
                  </TableCell>
                  <TableCell align="center" colSpan={1}>
                    Disciplina: Sei lá
                  </TableCell>
                  <TableCell align="center" colSpan={1}>
                    Turma: A
                  </TableCell>
                  <TableCell align="center" colSpan={2}>
                    Data: 01/09/2022
                  </TableCell>
                </TableRow>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ top: 57, minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow role="checkbox" tabIndex={-1} key={row.sobrenome}>
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </div>
  );
}
