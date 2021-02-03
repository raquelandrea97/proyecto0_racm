import React, { useRef, useEffect, useState } from 'react';
import instance from '../helpers/axios-requests';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import CreateEvent from './CreateEvent'


const columns = [
  { id: 'event_name', label: 'Nombre Evento', minWidth: 170 },
  { id: 'event_category', label: 'Categoría', minWidth: 100 },
  {
    id: 'event_place',
    label: 'Lugar',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'event_address',
    label: 'Dirección',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'event_start_date',
    label: 'Fecha Inicio',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'event_end_date',
    label: 'Fecha Fin',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'event_type',
    label: 'Tipo',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

export default function StickyHeadTable() {
  const classes = useStyles();
  const [eventos, setEventos] = useState([]);
  useEffect(() => {
    instance
      .get('/events')
      .then((res) => {
        console.log(res.data);
        setEventos(res.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {eventos.map((evento) => (
                <TableRow>
                    <TableCell align={evento.align}>
                        {evento.event_name}
                    </TableCell>
                    <TableCell align={evento.align}>
                        {evento.event_category}
                    </TableCell>
                    <TableCell align={evento.align}>
                        {evento.event_place}
                    </TableCell>
                    <TableCell align={evento.align}>
                        {evento.event_address}
                    </TableCell>
                    <TableCell align={evento.align}>
                        {evento.event_start_date}
                    </TableCell>
                    <TableCell align={evento.align}>
                        {evento.event_end_date}
                    </TableCell>
                    <TableCell align={evento.align}>
                        {evento.event_type}
                    </TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
    <CreateEvent>
    </CreateEvent>
    </>
  );
}