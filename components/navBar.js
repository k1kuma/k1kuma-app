import Link from 'next/link'

const navBarStyle = {
  backgroundColor: "red",
  color: "white",
  width: "100%",
  height: "60px"
};

const NavBar = () => (
  <div className="NavBar" style={navBarStyle}>
    <Link href="/"><a>Home</a></Link>
    <Link href="/about"><a>About Me</a></Link>
    <Link href="/"><a>Resume  </a></Link>
  </div>
);

export default NavBar;