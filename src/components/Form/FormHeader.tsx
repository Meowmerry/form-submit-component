import {Typography} from "@mui/material";
import STREAMICON from '../../assets/steamLogisticsIcon.svg';

const FormHeader = () => {
    const headDerText = 'Quote Status Request'
    return (
        <>
            <Typography className='form-header'> <img src={STREAMICON} alt="Stream Icon" className='steam-icon' /></Typography>
            <Typography className='form-header'>{headDerText}</Typography>
        </>
    );
};

export default FormHeader;