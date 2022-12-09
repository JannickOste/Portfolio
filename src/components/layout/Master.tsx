import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

const Master = () => {
    return (
        <>
        <Header />
        <main className="m-5">
            <Outlet />
        </main>
        <Footer />
        </>
    )
}

export default Master;