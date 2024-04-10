import React from 'react';
import { SocialIcon } from 'react-social-icons';
import InfoIcon from '@mui/icons-material/Info';
import ContactPageIcon from '@mui/icons-material/ContactPage';

const styles = {
    footer: {
        backgroundColor: '#e8f5e9',
        padding: '1rem',
        textAlign: 'center',
        marginTop: 'auto',
    },
    footerLinks: {
        listStyleType: 'none',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center', 
        padding: 0,
    },
    listItem: {
        display: 'flex', 
        alignItems: 'center', 
        margin: '0 5px',
    },
    linkWithIcon: {
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
        color: 'inherit',
    },
    socialIcon: {
        height: '30px', 
        width: '30px', 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
};

function Footer() {
    return (
        <footer style={styles.footer}>
            <div>
                <p>{new Date().getFullYear()} GreatReadsApp</p>
                <ul className="footer-links" style={styles.footerLinks}>
                    <li style={styles.listItem}>
                        <a href="#" style={styles.linkWithIcon}>
                            <InfoIcon style={{ marginRight: '10px' }}/>About us
                        </a>
                    </li>
                    <li style={styles.listItem}>
                        <SocialIcon url="https://www.instagram.com/" style={styles.socialIcon}/>Instagram
                    </li>
                    <li style={styles.listItem}>
                        <SocialIcon url="https://facebook.com/" style={styles.socialIcon}/>Facebook
                    </li>
                    <li style={styles.listItem}>
                        <a href="#" style={styles.linkWithIcon}>
                            <ContactPageIcon style={{ marginRight: '10px' }}/>Contact
                        </a>
                    </li>
                </ul>
            </div>
        </footer>
    );
}

export default Footer;
