import {
  createMuiTheme,
  CssBaseline,
  MuiThemeProvider,
} from "@material-ui/core";
import "./App.css";
import { Home } from "./Pages";


const theme = createMuiTheme({
  typography: {
    fontFamily: "Oswald",
    fontSize: "80px",
  },
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <Home />
      </div>
    </MuiThemeProvider>
  );
}

export default App;
