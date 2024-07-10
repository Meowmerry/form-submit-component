import { Container } from '@mui/material';
import FormHeader from './components/FormHeader';
import './App.css';
import FormComponent from './components/FormComponent';


function App() {
  return (
    <Container maxWidth="sm" className='container-form'>
      <FormHeader />
      <FormComponent />
    </Container>
  );
}

export default App;