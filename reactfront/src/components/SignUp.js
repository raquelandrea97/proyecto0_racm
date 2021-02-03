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

export default function SignUp() {
  const correoRef = useRef();
  const passwRef = useRef();
 
  const handleSubmit = (e) => {
    instance
      .post(
        '/sign-auth/',
        {
          //username: 'test3@test.com',
          //password: 'test123',
          username: correoRef.current.children[1].children[0].value,
          password: passwRef.current.children[1].children[0].value,
        },
        {
          headers: {
            'Content-Type': `application/json`,
          },
        }
      )
      .then((resp) => {
        console.log(resp.data.token);

        setToken(resp.data.token);
      })
      .catch((e) => {
        alert("Credenciales incorrectas.")
      });
  };
  const token = useToken();
  const setToken = useUpdateToken();
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
                title='Registrarse'
                subheader='y observa tus eventos'
              />
              <CardContent>
                <TextField
                  label='Correo personal'
                  type='mail'
                  margin='dense'
                  variant='outlined'
                  ref={correoRef}
                  fullWidth
                  required
                />
                <TextField
                  label='Contraseña'
                  type='password'
                  margin='dense'
                  variant='outlined'
                  ref={passwRef}
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
                  Regístrate
              </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}