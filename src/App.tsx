import "./App.css";
import { AppRouter } from "./router/router";
import { Toaster } from "sonner";
function App() {
  return (
    <>
      <Toaster richColors position="top-center" />
      <AppRouter />
    </>
  );
}

export default App;
