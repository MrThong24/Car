import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { routes } from "./const";
import { MainLayout } from "./layouts";
import { Header, Sidebar } from "./components";
import "./App.scss";

function App() {
  return (
    <MainLayout>
      <Router>
        <Header />
        <div className="app-wrapper">
          <Sidebar />
          <div className="app-content">
            <Switch>
              {routes.map((route) => (
                <Route key={route.path} {...route} />
              ))}
            </Switch>
          </div>
        </div>
      </Router>

      <ToastContainer />
    </MainLayout>
  );
}

export default App;
