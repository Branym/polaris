import * as React from "react"
import {
  ChakraProvider,
} from "@chakra-ui/react"
import Router from "./routes"
import axios from "axios";
import './css/quill.css';
import './css/editor.css';
import { BASE_URL } from "./enviroments/enviroments";
import { theme } from "./theme";

export const App = () => {

  axios.defaults.baseURL = BASE_URL;

 return <ChakraProvider theme={theme}>
      <Router />
</ChakraProvider>

}
