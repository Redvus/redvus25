import PropTypes from 'prop-types';
import Images from './Images';

function Header() {
    
    return (
        <header className="header">
            <a href="/">
                <Images name="logo" alt="Company Logo" />
            </a>
        </header>
    )
}

Header.PropTypes = {
    text: PropTypes.string.isRequired
}

export default Header;