
import Link from 'next/link';// we use this link component to route to the the home page

const openLinkedin = (e) => {
    e.preventDefault();
    window.location.href = "https://www.linkedin.com/in/isaiah-a-2001/";
  };
  

const Footer = () => (
    <nav className="footer">
        <p>created by Isaiah Asaolu on Dec 29th 2022</p>
        <button className="ui linkedin button" onClick={openLinkedin}>LinkedIn</button>
    </nav>
)

export default Footer;