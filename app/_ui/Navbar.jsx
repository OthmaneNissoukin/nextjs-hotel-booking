import Link from "next/link";

function Navbar() {
  return (
    <header>
      <div className="container header-items">
        <h2>LOGO</h2>
        <nav>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/rooms">Rooms</Link>
            </li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </nav>

        <a href="#">Guest Area</a>
      </div>
    </header>
  );
}

export default Navbar;
