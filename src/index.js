// import React from "react";
// import { createRoot } from "react-dom/client";
// import { Provider } from "react-redux";
// import { store } from "./app/store";
// import App from "./App";
// import "./index.css";

// const container = document.getElementById("root");
// const root = createRoot(container);

// root.render(
//   <>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </>
// );

import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { persistor, store } from "./app/store";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App";
import "./index.css";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </>
);
