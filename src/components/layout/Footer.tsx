/**
 * Footer component - A simple footer component that displays the current year and a copyright message.
 */
const Footer = () => {
    
    return ( 
        <footer className="bg-dark text-white text-center p-5 mt-auto">    
            <p>&copy; Oste Jannick {new Date(Date.now()).getFullYear()}<br /><a href="https://github.com/JannickOste/Portfolio">Source</a> </p>
        </footer>
    )
}

export default Footer; 