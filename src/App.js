import Siparis from "./components/Siparis";
import "./App.css";
import React from "react";
import { ProtectedRoute } from "./components/Route/productedRoute";
import { ProtectedAdminRoute } from "./components/Route/productedAdminRoute";
import { ProtectedAdminLoginRoute } from "./components/Route/productedAdminLoginRoute";
import { ProtectedLoginRoute } from "./components/Route/productedLoginRoute";
import Login from "./components/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Restaurantlist from "./components/Restaurantlist";
import Register from "./components/Register";
import Registerrestorant from "./components/Registerrestorant";
import Uyetip from "./components/Uyetip";
import Loginrestorant from "./components/Loginrestorant";
import Restorantpanel from "./components/Restorantpanel";
import Restorantprofil from "./components/Restorantprofil";
import Uyeprofil from "./components/Uyeprofil";
// import Route from "./components/ProductRoute";
// import Route from "./components/Route";
import Siparislerim from "./components/Siparislerim";
import deneme from "./components/Deneme";
import Uyesiparislerim from "./components/Uyesiparislerim";
import MailDeneme from "./components/MailDeneme";
import Forgetpassword from "./components/Forgetpassword";
import Ciro from "./components/Ciro";
import denemexy from "./components/Denemexy";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/Deneme" component={deneme} />
          <Route exact path="/Denemexy" component={denemexy} />
          <Route exact path="/MailDeneme" component={MailDeneme} />
          <Route exact path="/" component={Uyetip} />
          <Route exact path="/Forgetpassword" component={Forgetpassword} />
          <ProtectedRoute
            exact
            path="/Restaurantlist"
            component={Restaurantlist}
          />
          <ProtectedLoginRoute exact path="/Login" component={Login} />
          <ProtectedRoute exact path="/Siparis/:id" component={Siparis} />
          <ProtectedLoginRoute exact path="/Register" component={Register} />
          <ProtectedAdminRoute
            exact
            path="/Restorantprofil"
            component={Restorantprofil}
          />
          {/* <Route
            exact
            path="/Uyesiparisler"
            component={Restorantprofil}
          /> */}
          {/* <Route exact path="" component={Register} /> */}
          <ProtectedAdminLoginRoute
            exact
            path="/Registerrestorant"
            component={Registerrestorant}
          />
          <ProtectedAdminRoute
            exact
            path="/Restorantpanel"
            component={Restorantpanel}
          />
          <ProtectedAdminLoginRoute
            exact
            path="/Loginrestorant"
            component={Loginrestorant}
          />
          <ProtectedRoute exact path="/Uyeprofil" component={Uyeprofil} />
          <ProtectedAdminRoute
            exact
            path="/Siparislerim"
            component={Siparislerim}
          />

          <ProtectedAdminRoute exact path="/Ciro" component={Ciro} />

          <ProtectedRoute
            exact
            path="/Uyesiparislerim"
            component={Uyesiparislerim}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
