import './Footer.css'

export default function Footer(){

    return(
        <footer className='footer'>
            <div className="footer-img-container">
                <img className='footer-logo' src="/imgs/logo/livraria-logo-zip-file/svg/logo-no-background.svg" alt="" />
            </div>
            <div className="footer-icons-container">
                <i className="bi bi-instagram"></i>
                <i className="bi bi-twitter"></i>
                <i className="bi bi-linkedin"></i>
            </div>
        </footer>
    )
}