import { contentOfNotLoggedIn } from "./functions/viewFunctions/on_not_logged_in";
import "./HomePage.css";

const HomePage = () => {
  return <>{ contentOfNotLoggedIn()}</>;
};

export default HomePage;
