import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { ApolloProvider } from "@apollo/client";
import client from "./lib/apollo-client";
import ContextStore from "./store";

const Index = () => (
  <React.StrictMode>
    <ContextStore>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </ContextStore>
  </React.StrictMode>
);

const rootElement = document.getElementById("root");
if (rootElement.hasChildNodes()) {
  ReactDOM.hydrate(<Index />, rootElement);
} else {
  ReactDOM.render(<Index />, rootElement);
}

// ReactDOM.render(
//   <React.StrictMode>
//     <ContextStore>
//       <ApolloProvider client={client}>
//         <App />
//       </ApolloProvider>
//     </ContextStore>
//   </React.StrictMode>,
//   document.getElementById("root")
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
