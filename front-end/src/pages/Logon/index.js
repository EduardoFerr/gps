import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
// import { FiLogIn, FiHelpCircle } from 'react-icons/fi'

import { makeStyles, Avatar, Button, Typography, Box, Grid, CssBaseline, Paper, TextField, FormControlLabel, Checkbox } from '@material-ui/core/'
import { LockOutlined, HelpOutlined, InputOutlined } from '@material-ui/icons'

import './styles.css'

import api from '../../services/api'

// import logoImg from '../../assets/logo.svg'
// import heroesImg from '../../assets/heroes.png'

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <a color="inherit" href="https://material-ui.com/">
                Your Website
            </a>
            {' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    }
}))


function Logon() {
    const classes = useStyles()


    const [usuario, setUsuario] = useState('')
    const [password, setPassword] = useState('')
    const [mensagem, setMensagem] = useState(false || '')
    const history = useHistory()

    useEffect(() => {
        //     // Atualiza o titulo do documento usando a API do browser
        //     document.title = `Você clicou ${count} vezes`
        //     console.log(response)
        if (mensagem) {
            alert(mensagem)
            setMensagem('')
        }

    }, [mensagem])
    async function manipularLogon(e) {
        e.preventDefault()
        await api.post('/autenticar', { usuario, password })
            .then(response => {
                setMensagem(`Bem vindo ${response.data.usuario.usuario}`)
                localStorage.setItem('logon', JSON.stringify(response.data))
                history.push('/profile')
            })
            .catch(error => {
                setMensagem(`${error.response.data.error}`)
            })
    }

    return (
        <Grid container component="main" className={classes.container}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />

            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlined />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Acessar
                    </Typography>
                    <form id="formLogon" onSubmit={manipularLogon} className={classes.form} noValidate>
                        <TextField
                            value={usuario}
                            onChange={e => setUsuario(e.target.value)}
                            id="usuario"
                            label="Usuário"
                            name="usuario"
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            autoComplete="usuario"
                            autoFocus
                        />
                        <TextField
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            id="password"
                            label="Senha"
                            name="password"
                            type="password"
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            Acessar
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link to="/recuperar" variant="body2">
                                    <HelpOutlined fontSize="small" />
                                    Esqueceu sua senha?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link to="/registrar" variant="body2">
                                    <InputOutlined fontSize="small" />
                                    {"Não possui uma conta? Cadastre-se."}
                                </Link>
                            </Grid>
                        </Grid>
                        <Box mt={5}>
                            <Copyright />
                        </Box>
                    </form>
                </div>
            </Grid>
        </Grid>
    )
}



export default Logon