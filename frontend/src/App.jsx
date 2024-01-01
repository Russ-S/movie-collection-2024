// import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Movies from "./pages/Movies";

const App = () => {
  return (
    <>
      <Header />
      <main className="py-3">
        <div className="container">
          <Movies />
        </div>
      </main>
      <Footer />
    </>
  );
};
export default App;
