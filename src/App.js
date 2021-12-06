import './scss/style.scss';

import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

import Home from "./views/Home";
import ListView from "./views/ListView";
import TreeView from "./views/TreeView";
import TreeViewCustom from "./views/TreeViewCustom";
import AddNode from "./views/AddNode";
import {Header,Footer} from "./components";
import Page404 from "./views/errors/Page404";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/404" element={<Page404 />} />
        <Route path="/" element={<ListView />} />
        <Route path="/list-view" element={<ListView />} />
        <Route path="/tree-view" element={<TreeView />} />
        <Route path="/tree-view-custom" element={<TreeViewCustom />} />
        <Route path="/add-node" element={<AddNode />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
