import Home from "./views/Home";
import ProductListPage from "./views/ProductList";
import ProductDetail from "./views/ProductDetail";
import OrderDetailView from "./views/OrderDetailView";
import CartView from "./views/CartView";
import OrdersView from "./views/OrdersView";
import "./App.css";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./domains/common/Header";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={ProductListPage} />
        <Route path="/product/all" component={ProductListPage} />
        <Route path="/product/:id" component={ProductDetail} />
        <Route path="/my-cart" component={CartView} />
        <Route path="/my-orders" component={OrdersView} />
        <Route path="/order/:id" component={OrderDetailView} />
      </Switch>
    </Router>
  );
}

export default App;
