import {Typography} from "@mui/material";
import STREAMICON from '../assets/steamLogisticsIcon.svg';

const FormHeader = () => {
    return (
        <>
            <Typography className='form-header'> <img src={STREAMICON} alt="Stream Icon" className='steam-icon' /></Typography>
            <Typography variant="h6" className='form-header'>Requirement</Typography>
        </>
    );
};

export default FormHeader;