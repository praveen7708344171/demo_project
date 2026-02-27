import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer__top">
                    <div className="footer__brand">
                        <div className="footer__logo">
                            <span className="logo-scholar" style={{ color: '#FFFFFF' }}>Scholar</span>
                            <span className="logo-match">Match</span>
                        </div>
                        <p className="footer__tagline">
                            Every scholarship you deserve, one click away.
                        </p>
                    </div>

                    <div className="footer__columns">
                        <div className="footer__column">
                            <h4 className="footer__heading">Product</h4>
                            <Link to="/" className="footer__link">How it Works</Link>
                            <Link to="/" className="footer__link">Features</Link>
                            <Link to="/" className="footer__link">Accessibility</Link>
                            <Link to="/" className="footer__link">Languages</Link>
                        </div>
                        <div className="footer__column">
                            <h4 className="footer__heading">Company</h4>
                            <Link to="/" className="footer__link">About Us</Link>
                            <Link to="/" className="footer__link">Blog</Link>
                            <Link to="/" className="footer__link">Careers</Link>
                            <Link to="/" className="footer__link">Contact</Link>
                        </div>
                        <div className="footer__column">
                            <h4 className="footer__heading">Legal</h4>
                            <Link to="/" className="footer__link">Privacy Policy</Link>
                            <Link to="/" className="footer__link">Terms of Service</Link>
                            <Link to="/" className="footer__link">Cookie Policy</Link>
                        </div>
                    </div>
                </div>

                <div className="footer__bottom">
                    <p>© 2025 ScholarMatch. All rights reserved. Made with ❤️ for every student.</p>
                </div>
            </div>
        </footer>
    );
}
