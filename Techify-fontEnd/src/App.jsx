import { useState } from "react";

import ModalForm from "./components/Modalfrom";
import NavBar from "./components/NavBar";
import TableList from "./components/TableList";
function App() {
  const [isopen, setIsOpen] = useState(false);
  const [modalMode, setmodalMode] = useState("add");

  const handleOpen = (mode) => {
    setIsOpen(true);
  };
  const handelSubmit = () => {
    if (modalMode === "add") {
      console.log("add");
    } else {
      console.log("update");
    }
  };
  return (
    <>
      <NavBar onOpen={() => handleOpen("add")} />
      <TableList />
      <ModalForm
        isOpen={isopen}
        onSubmit={handelSubmit}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}

export default App;
