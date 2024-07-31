import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import EditContact from "./components/contacts/EditContact/EditContact";
import ViewContact from "./components/contacts/ViewContact/ViewContact";
import AddContact from "./components/contacts/AddContact/AddContact";
import ContactList from "./components/contacts/ContactList/ContactList";
import NavBar from "./components/NavBar/NavBar"
// import Spinner from "./components/Spinner/Spinner";


function App() {
  return (
    <>
    {/* <Spinner/> */}
     <NavBar/>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Navigate to={"/contacts/list"} />} />
          <Route path={"contacts/list"} element={<ContactList />} />
          <Route path={"contacts/add"} element={<AddContact />} />
          <Route path={"contacts/view/:contactId"} element={<ViewContact />} />
          <Route path={"contacts/edit/:contactId"} element={<EditContact />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
