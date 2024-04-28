import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ThemeProvider from "./ThemeProvider.jsx";
// import { unstable_trace as trace } from 'react-dom';
// import { unstable_scheduleCallback as scheduleCallback } from 'scheduler';

// trace('initial render', performance.now(), () => {
//   ReactDOM.createRoot(document.getElementById('root')).render(<App />);
// });

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
