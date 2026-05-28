import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function Navigation() {
    const navigate = useNavigate()

    return (
         <Navbar style={{ backgroundColor: "#ffe9c7" }} data-bs-theme="light">
            <Container>
                <Navbar.Brand style={{fontSize:30}} onClick={() => navigate("/")}>choreMaster</Navbar.Brand>
                <Container>
                    <Navbar.Link style={{fontSize:17.5}} onClick={navigate('/category/list')}>Categories</Navbar.Link>
                    <button>New Chore</button>
                </Container>
            </Container>
         </Navbar>
    )
}

export default Navigation