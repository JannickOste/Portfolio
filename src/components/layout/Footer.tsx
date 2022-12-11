import React from "react";

/**
 * Footer component - A simple footer component that displays the current year and a copyright message.
 */
export default class Footer extends React.Component 
{
    render = (): React.ReactNode => ( 
        <footer className="bg-dark text-white text-center p-5 mt-auto">    
            <p>&copy; Oste Jannick {new Date(Date.now()).getFullYear()}<br /><a href="https://github.com/JannickOste/Portfolio">Source</a> </p>
        </footer>
    )
}