import { Button } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import { useSelector }  from "react-redux";
import { useEffect } from "react";

const Root = () => {

    const navigate = useNavigate();
    const {user, token} = useSelector((state) => state);
    useEffect(() => {
        if(token)
        {
            if(user.clgName){
                navigate(`/admin/${user._id}`);
            }else{
                console.log("else");
                navigate(`/student/${user._id}`);
            }
        }
    }, []);

    return(
      <div>
        <Link to={'clgregister'}><Button variant="contained" color="primary">College Register</Button></Link>
        <Link to={'studentregister'}><Button variant="contained" color="primary">Student Register</Button></Link>
      </div>
    )
}

export default Root;