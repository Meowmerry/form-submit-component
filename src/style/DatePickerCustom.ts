import {styled} from '@mui/system';
import {DatePicker as MuiXDatePicker} from '@mui/x-date-pickers/DatePicker';

export const DatePickerCustom = styled(MuiXDatePicker)({
    '& .MuiOutlinedInput-root': {
        backgroundColor: '#fff',
        overflowX: 'auto'
    },
});
