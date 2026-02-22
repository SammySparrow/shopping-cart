import { Outlet } from "react-router";
import Nav from "./components/Nav/Nav";

export default function App() {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
}
