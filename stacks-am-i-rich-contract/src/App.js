import "./App.css";

function App() {
  return (
    <div className="App">
      <section className="hero bg-gray" id="hero">
        <nav className="d-flex justify-content-around">
          <div className="logo">
            <a href="#hero">Are You Rich?</a>
          </div>
          <ul>
            <li>
              <a href="#about-us">About Us</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
          <div className="button">
            <a href="#" className="">
              Log in
            </a>
          </div>

          <div className="menu-toggle">
            <input type="checkbox" />
            <span></span>
            <span></span>
            <span></span>
          </div>
        </nav>
        <header className="header">
          <div class="container">
            <div class="row justify-content-center">
           
              <div class="col-12 col-md-8 col-lg-6">
                <div className="desc-animate d-flex align-items-end">
                  <div className="d-flex align-items-center">
                    <div className="blobs-container">
                      <div className="blob orange"></div>
                    </div>
                    <span>Empowering people with the power of blockchain</span>
                  </div>
                </div>
                <div className="desc-title">
                  <h2>Show of your wealth by connecting your stacks wallet.</h2>
                </div>
                <div className="title-desc">
                  <label htmlFor="">
                    Selling NFT with your own blockchain-based website has never
                    been easier, faster, or more scalable. impress your buyers
                    with a beautiful, easy to navigate NFT store.
                  </label>
                </div>
                <div className="button">
                  <a href="" className="btn btn-success">
                    Connect Wallet
                  </a>
                </div>
              </div>
           
              <div class="col-12 col-md-7 col-lg-4">
                <img className="img-rich" src="/rich-1.svg" />
              </div>
            </div>
          </div>
        </header>
      </section>
    </div>
  );
}

export default App;
