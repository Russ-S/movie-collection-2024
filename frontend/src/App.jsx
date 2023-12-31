import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Movies from "./pages/movies";

const App = () => {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <Movies />
        </Container>
      </main>
      <Footer />
    </>
  );
};
export default App;
