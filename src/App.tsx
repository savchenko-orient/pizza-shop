import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import "./scss/app.scss";

import { Header } from "./components";
import Home from "./pages/Home";
// import NotFound from "./pages/NotFound";
// import Cart from "./pages/Cart";
// import FullPizza from "./pages/FullPizza";

const Cart = lazy(() => import(/* webpackChunkName: "Cart" */ "./pages/Cart"));
const FullPizza = lazy(
  () => import(/* webpackChunkName: "FullPizza" */ "./pages/FullPizza")
);
const NotFound = lazy(
  () => import(/* webpackChunkName: "NotFound" */ "./pages/NotFound")
);

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route
            path="*"
            element={
              <Suspense fallback={<div>Завантаження сторінки</div>}>
                <NotFound />
              </Suspense>
            }
          />
          <Route
            path="/cart"
            element={
              <Suspense fallback={<div>Завантаження кошика</div>}>
                <Cart />
              </Suspense>
            }
          />
          <Route
            path="/pizza/:id"
            element={
              <Suspense fallback={<div>Завантаження піци</div>}>
                <FullPizza />
              </Suspense>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
