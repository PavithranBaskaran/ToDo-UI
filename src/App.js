import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Input from "./Input";

import { useState } from "react";
function App() {
  
  return (
    <>
      <header class="position-relative">
        <div class="bg-image"></div>
      </header>
      <section class="main-section w-25 h-50 position-absolute top-1 start-50 translate-middle  ">
        <h1 class="heading ">TODO</h1>
        <Input/>
       
      </section>
    </>
  );
}

export default App;
