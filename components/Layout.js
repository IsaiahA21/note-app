import Head from "next/head"; // will contain all metadata
import Navbar from './navbar';
import Footer from './Footer';

//Layout.JS wraps around all our pages
//Layout holds the core view in place
//Layout will contain Navbar.JS
// that way everypage will have the navbar included


//using children because it will reference all the pages components we will be refering
//In Layout.js, use the NavBar component to render any 
//content passed through props.children within a Content container

// props and children
// If you want to pass things to a component(aka function), you would use a prop(props are argument).

//If you want to make our button say more than just "I am a button," you can pass children to it.
//By passing children in this way, you are passing it to the component by position

const Layout = ({children}) => (

    <>  
        <Head>
            <title>Note App</title>
            <meta name="description" content="Isaiah note pad using next app and mongodb" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <Navbar/>
        {children}
        <Footer />
    </>
)
export default Layout;
