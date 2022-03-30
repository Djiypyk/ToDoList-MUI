import React, {useCallback, useEffect} from 'react';
import './App.css';
import {AppBar, Button, CircularProgress, Container, IconButton, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {AppRootStateType, useAppSelector} from "./store";
import {initializedAppTC, RequestStatusType} from "./app-reducer";
import LinearProgress from '@mui/material/LinearProgress';
import {ErrorSnackbar} from "../Components/ErrorSnackbar/ErrorSnackbar";
import {TodoListsList} from "../Features/TodoListsList/TodoListsList";
import {Navigate, NavLink, Route, Routes} from 'react-router-dom';
import {Login} from "../Features/Login/Login";
import {useDispatch, useSelector} from "react-redux";
import {logOutTC} from '../Features/Login/auth-reducer';

function AppWithRedux({demo = false}: PropsType) {
    const status = useAppSelector<RequestStatusType>((state) => state.app.status)
    const isInitialized = useAppSelector<boolean>((state) => state.app.isInitialized)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializedAppTC())
    }, [dispatch])

    const logoutHandler = useCallback(() => {
        dispatch(logOutTC())
    }, [dispatch])

    //UI:
    if (!isInitialized) {
        return <div style={{width: '100%', position: 'fixed', top: '40%', left: '50%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                        <Typography variant="h6">
                            Menu
                        </Typography>
                    </IconButton>
                    <Typography variant="h6">
                        <NavLink className='todolist_link' to={'/'}>TodoLists</NavLink>
                    </Typography>
                    {isLoggedIn
                        ? <Button color="inherit" variant={"outlined"} onClick={logoutHandler}>
                            Log Out
                        </Button>
                        : <Button color="inherit" variant={"outlined"} onClick={logoutHandler}>
                            Log In
                        </Button>}
                </Toolbar>
            </AppBar>
            {status === 'loading' && <LinearProgress color={'secondary'}/>}
            <Container fixed>
                <Routes>
                    <Route path="/" element={<TodoListsList demo={demo}/>}/>
                    <Route path="login" element={<Login/>}/>
                    <Route path="404"
                           element={<h1 style={{width: '100%', textAlign: 'center'}}>404: PAGE NOT FOUND</h1>}/>
                    <Route path="*" element={<Navigate to='404'/>}/>
                </Routes>
            </Container>
            <ErrorSnackbar/>
        </div>
    )
}

export default AppWithRedux;

type PropsType = {
    demo?: boolean
}
