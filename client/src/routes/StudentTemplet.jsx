import { Container } from '@material-ui/core';
import { Outlet } from 'react-router-dom';
import StudentNavBar from '../Utils/StudentNavbar';

const AdminTemplet = () => {

    return (
        <div>
            <StudentNavBar/>
            <Container maxWidth="lg">
                <Outlet/>
            </Container>
        </div>
    )
}


export default AdminTemplet;