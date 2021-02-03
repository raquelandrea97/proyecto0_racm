import logo from './logo.svg';
import './App.css';
import Toolbar from './components/Toolbar';
import Layout from './components/Layout';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <>
        <BrowserRouter>
          <Toolbar></Toolbar>
          <Layout></Layout>
        </BrowserRouter>
    </>
  );
}

export default App;
