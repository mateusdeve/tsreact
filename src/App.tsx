import { Router } from "react-router";
import  ContextProvider from "./contexts";
import Routes from "./routes";
import history from './service/history'

function App() {
  return (
    <ContextProvider>
    <Router history={history}>
      <Routes />
    </Router>
    </ContextProvider>
  );
}

export default App;
