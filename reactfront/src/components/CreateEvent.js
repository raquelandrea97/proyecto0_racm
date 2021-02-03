import React from 'react';
import { useState, useEffect, useRef } from 'react';
import instance from '../helpers/axios-requests';
import { useToken, useUpdateToken } from '../store/TokenContext';

import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export default function CreateEvent() {
  const nameRef = useRef();
  const categoryRef = useRef();
  const placeRef = useRef();
  const addressRef = useRef();
  const startDateRef = useRef();
  const endDateRef = useRef();
  const typeRef = useRef();

  const handleSubmit = (e) => {
    instance
      .post(
        '/events',
        {
          //username: 'test3@test.com',
          //password: 'test123',
          event_name: nameRef.current.children[1].children[0].value,
          event_category: categoryRef.current.children[1].children[0].value,
          event_category: placeRef.current.children[1].children[0].value,
          event_place: addressRef.current.children[1].children[0].value,
          event_start_date: startDateRef.current.children[1].children[0].value,
          event_end_date: endDateRef.current.children[1].children[0].value,
          event_type: typeRef.current.children[1].children[0].value,
        },
        {
          headers: {
            'Content-Type': `application/json`,
          },
        }
      )
      .then((resp) => {
        console.log(resp.data);
      })
      .catch((e) => {
        alert("Credenciales incorrectas.")
      });
  };
  return (
    <div>
      <Container maxWidth='md'>
        <Grid container
          direction="row"
          justify="center"
          alignItems="center">
          <Grid item xs={10} sm={5}>
            <Card>
              <CardHeader
                title='Crear evento'
              />
              <CardContent>
                <TextField
                  label='Nombre del evento'
                  margin='dense'
                  variant='outlined'
                  ref={nameRef}
                  fullWidth
                  required
                />
                <TextField
                  label='Categoría del evento'
                  margin='dense'
                  variant='outlined'
                  ref={categoryRef}
                  fullWidth
                  required
                />
                <TextField
                  label='Lugar del evento'
                  margin='dense'
                  variant='outlined'
                  ref={placeRef}
                  fullWidth
                  required
                />
                <TextField
                  label='Dirección del evento'
                  margin='dense'
                  variant='outlined'
                  ref={addressRef}
                  fullWidth
                  required
                />
                <TextField
                  label='Inicio del evento'
                  margin='dense'
                  variant='outlined'
                  ref={startDateRef}
                  fullWidth
                  required
                />
                <TextField
                  label='Fin del evento'
                  margin='dense'
                  variant='outlined'
                  ref={endDateRef}
                  fullWidth
                  required
                />
                <TextField
                  label='Tipo de evento'
                  margin='dense'
                  variant='outlined'
                  ref={typeRef}
                  fullWidth
                  required
                />
              </CardContent>
              <CardActions style={{ justifyContent: 'space-between' }}>
                <Button
                  type='submit'
                  color='primary'
                  onClick={() => handleSubmit()}
                  variant='contained'
                  raised
                >
                  Crea Evento
              </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}