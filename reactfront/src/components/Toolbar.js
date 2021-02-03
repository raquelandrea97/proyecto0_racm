import React, { useState, useEffect } from 'react';
import Tooly from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
  } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));

const Toolbar = (props) => {const classes = useStyles(); 
    return (
        <div className={classes.root}>
          <AppBar position="static">
            <Tooly>
              <IconButton edge="start" className={classes.menuButton} color="deepPurple" aria-label="menu">
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Tus eventos
              </Typography>
              <Button color="deepPurple"><Link class='nav-link' to='/login'>
                        LOGIN{' '}
                      </Link>
                        {' '}</Button>
              <Button color="deepPurple"><Link class='nav-link' to='/signup'>
                        SIGNUP{' '}
                      </Link>
                        {' '}</Button>
            </Tooly>
          </AppBar>
        </div>
      );
    }
export default Toolbar;