import PropTypes from 'prop-types'

function Footer({
    author = 'Redvus',
    className = ''
}) {
    
    return (
        <footer className={`footer ${className}`}>
            <p>{author}</p>
        </footer>
    )
}

Footer.PropTypes = {
    text: PropTypes.string.isRequired
}

export default Footer;