import { BrowserRouter, Route, Switch } from "react-router-dom";
import Buyer from "./components/Buyer";
import Agent from "./components/Agent";
import Error from "./components/Error";

function App() {
  return (
    <BrowserRouter >
      <Switch>
           <Route path="/" component={Buyer} exact/>
           <Route path="/agent" component={Agent} />
           <Route component={Error}/>
         </Switch>
    </BrowserRouter>
   
  );
}

export default App;
