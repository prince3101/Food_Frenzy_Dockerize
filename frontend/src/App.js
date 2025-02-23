import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Layout from "./layout";
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <BrowserRouter>
      <Layout />
      <Toaster position="top-right"/>
    </BrowserRouter>
  );
}

export default App;
