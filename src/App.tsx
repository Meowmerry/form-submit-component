import { Container } from '@mui/material';
import FormHeader from './components/Form/FormHeader';
import FormComponent from './components/Form/FormComponent';
import './App.css';

function App() {
  return (
    <Container maxWidth="sm" className='container-form'>
      <FormHeader />
      <FormComponent />
    </Container>
  );
}

export default App;