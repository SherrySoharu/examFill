import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem } from '@material-ui/core';
import MenuIcon from "@mui/icons-material/Adb";
import AdbIcon from '@mui/icons-material/Adb';
import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import AdminNavbar from '../Utils/AdminNavbar';

const AdminTemplet = () => {

    return (
        <div>
            <AdminNavbar/>
            <Container maxWidth="lg">
                <Outlet/>
            </Container>
        </div>
    )
}


export default AdminTemplet;