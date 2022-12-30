// Navbar will be on all the pages
//NavBar to provide navigation buttons
import Link from 'next/link';// we use this link component to route to the the home page

const Navbar = () => (
    <nav className="navBar">
        <Link href="/" legacyBehavior>
            <a className="navbar-brand">Note App</a>
        </Link>
        <Link href="/new" legacyBehavior>
            <a className="create">Create Note</a>
        </Link>
    </nav>
)

export default Navbar;
