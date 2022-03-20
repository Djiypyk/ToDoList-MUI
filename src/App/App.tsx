import React from 'react';
import './App.css';
import {AppBar, Button, Container, IconButton, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {useAppSelector} from "./store";
import {RequestStatusType} from "./app-reducer";
import LinearProgress from '@mui/material/LinearProgress';
import {ErrorSnackbar} from "../Components/ErrorSnackbar/ErrorSnackbar";
import {TodoListsList} from "../Features/TodoListsList/TodoListsList";


//C-R-U-D
function AppWithRedux() {
    const status = useAppSelector<RequestStatusType>((state) => state.app.status)

    //UI:
    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                        <Typography variant="h6">
                            News
                        </Typography>
                    </IconButton>
                    <Typography variant="h6">
                        TodoLists
                    </Typography>
                    <Button color="inherit" variant={"outlined"}>Login</Button>
                </Toolbar>
            </AppBar>
            {status === 'loading' && <LinearProgress color={'secondary'}/>}
            <Container fixed>
                <TodoListsList/>
            </Container>
            <ErrorSnackbar/>
        </div>
    )
}


export default AppWithRedux;


