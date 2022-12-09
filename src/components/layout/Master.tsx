import { Outlet } from "react-router-dom";
import { RouteObjectExtended } from "../../App";
import Footer from "./Footer";
import Header from "./Header";

type MasterPageProps = {
    routes:RouteObjectExtended[];
}

/**
 * Renders a page with a header, main content area, and footer.
 *
 * @param {Object} props The props for the component.
 * @param {RouteObjectExtended[]} props.routes An array of objects representing the navigation items for the header. Each object should have a `text` and `path` property.
 * 
 * @returns {ReactElement} A React element representing the page.
 */
const Master = ({routes}:MasterPageProps) => {
    const navigation = routes.map(i => {return {text: i.text, to:i.path as string}});

    return (
        <>
        <Header navigation={navigation} onSearch={() => {}}/>

        <main className="m-5">
            <Outlet />
        </main>

        <Footer />
        </>
    )
}

export default Master;