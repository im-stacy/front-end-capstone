import React, { useState } from 'react';
import styles from './Nav.module.css';


type Link = {
    label: string;
    href: string;
};

const links = [
    {
        "label": "Home",
        "href": "/home"
    },
    {
        "label": "Recipes",
        "href": "/recipes"
    }
]


const Links: React.FC<{ links: Link[] }> = ({ links }) => {
    return (
        <div className={styles['links-container']}>
            {links.map((link: Link) => {
                return (
                    <div key={link.href} className={styles['link']}>
                        <a href={link.href}>
                            {link.label}
                        </a>
                    </div>
                )
            })}
        </div>
    )
};



const Nav: React.FC<{onSearch: (text: string) => void}> = ({ onSearch }) => {
    const [text, setText] = useState('')
    return (
        <nav className={styles['navbar']}>
            <div className={styles['logo-container']}>
                <span>Logo</span>
            </div>
            <div className={styles['input-wrapper']}>
                <input type="text" placeholder="Search Recipes" value={text} onChange={(e) => {setText(e.target.value); 
                onSearch(e.target.value)}} />
            </div>
            <Links links={links} />
        </nav>
    )
}

export default Nav;
