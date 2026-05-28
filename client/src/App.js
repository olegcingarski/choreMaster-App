import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from "./layout";
import Dashboard from "./chore/dashboard"
import Categories from "./category/categories";

function App() {
  return(
      <div>
        <Categories />
        
      </div>
      )

}

export default App;
