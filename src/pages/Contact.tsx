import * as react from "react";
import  style from "./Contact.module.css";
import emailjs from "emailjs-com";
import ContentBox from "../components/elements/ContentBox";
import React from "react";

type ContactFormProps = {}
type ContactFormState = {
    name?: string, 
    email?: string, 
    message?: string,
    notification?: string
}

export default class ContactForm extends React.Component<ContactFormProps, ContactFormState>
{
    state: ContactFormState = {}
    constructor(props: ContactFormProps)
    {
        super(props);
        emailjs.init(process.env.REACT_APP_EMAILJS_KEY as string);
    }

    /**
     * onSendHandler is an async event handler that is called when the user
     * submits the form by clicking the "Send" button.
     *
     * When the form is submitted, this method attempts to send the message by
     * calling `emailjs.sendForm` with the appropriate service ID, template ID,
     * and form data. If the message is successfully sent, a success
     * notification is displayed and the form fields are cleared. If the message
     * fails to send, a failure notification is displayed.
     *
     * @param ev The form submission event. This method call `ev.preventDefault()`
     *           to prevent the default form submission behavior.
     */
    private onSendHandler = async(ev:any): Promise<void> => {
        ev.preventDefault();
        this.setState({...this.state, notification: "Attempting to send message..."});
        try
        {
            await emailjs.sendForm(process.env.REACT_APP_EMAILJS_SERVICEID as string, process.env.REACT_APP_EMAILJS_TEMPLATEID as string, ev.target);
            this.setState({...this.state, name: "", email: "", message: "",  notification: "Message succesfully send."});
        }
        catch(ex)
        {
            
            this.setState({...this.state, notification: "Failed to send message: "});
        }
    }
    
    /**
     * render is a method that returns the JSX that should be rendered for the
     * ContactForm component.
     *
     * The JSX includes a form with fields for the user's name, email, and
     * message, as well as a "Send" button to submit the form. If a
     * notification is present in the component state, it is also rendered.
     *
     * @returns The JSX to render for the ContactForm component.
     */
    public render = (): react.ReactNode => {
        return(
            <ContentBox header="Neem contact op" style={{minHeight: "100%"}} content={(<>
                {this.state.notification && this.state.notification.length ? (
                    <div className={("bg-"+((this.state.notification.includes("succesfully") ? "success" : (this.state.notification.includes("danger") ? "danger" : "warning"))))+" p-2 text-white mt-4"}>
                        {this.state.notification }
                    </div>
                ) : (<></>)}
                
                <form method="POST" className=" input-group d-flex flex-column" onSubmit={this.onSendHandler} >
                    <label htmlFor="user_name" className="mt-3">Naam (enkel alphabetische karakters toegelaten(a-Z )): </label>
                    <input type="text" name="user_name" id="user_name" className="mt-1 input-group-text" pattern="[a-zA-Z ]+" onChange={(ev) => this.setState({...this.state, name: ev.target.value})} />
                    <label htmlFor="user_email" className="mt-3">E-mail: </label>
                    <input type="email" className="mt-1 input-group-text" name="user_email" id="user_email" onChange={(ev) => this.setState({...this.state, email: ev.target.value})} />
                    <label htmlFor="message" className="mt-3">Bericht: </label>
                    <textarea name="message" className="mt-1 input-group-text"  onChange={(ev) => this.setState({...this.state, message: ev.target.value})}>
                    </textarea>
                    <input type="submit" value="Send" className="mt-5 btn btn-dark" disabled={!this.state?.email || !this.state?.message || !this.state?.name} />
                </form>
            </>)}/>
        )
    }
}