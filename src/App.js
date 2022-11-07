import { BrowserRouter, Routes, Route } from "react-router-dom";
import FormEspecialidades from "./componentes/especialidades/FormEspecialidades";
import TablaEspecialidades from "./componentes/especialidades/TablaEspecialidades";
import Banner from "./componentes/general/Banner";
import Header from "./componentes/general/Header";
import Variables from "./componentes/especialidades/Variables";
const App = () => {
  return (
    <div>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Banner />} exact></Route>
          <Route path="/especialidades" element={<TablaEspecialidades />} exact></Route>
          <Route path="/especialidades/form" element={<FormEspecialidades />} exact></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
  }
  
export default App;
