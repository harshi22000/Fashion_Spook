import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Product from "./pages/Product";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Design from "./pages/Design"


function App() {
  const user=true;
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home/>
        </Route>
        <Route path="/products/:category">
          <ProductList/>
        </Route>
        <Route path="/product/:id">
          <Product/>
        </Route>
        <Route path="/cart">
          <Cart/>
        </Route>
        <Route path="/design">
          <Design/>
        </Route>
        <Route path="/login">
          {/* {user ? <Redirect to="/"/>: <Login/>} */}
          <Login/>
        </Route>
        <Route path="/register">
          {/* {user ? <Redirect to="/"/>: <Register/>} */}
          <Register/>
        </Route>

      </Switch>
    </Router>
);
  }

export default App;
