import * as react from "react";
import  style from "./Contact.module.css";
import emailjs from "emailjs-com";
import ContentBox from "../components/layout/ContentBox";

type ContactFormState = {
    name: string, 
    email: string, 
    message: string,
    notification?: string
}

/**
 * Renders a form that allows users to send a message to the default emailjs corespondent
 *
 * @returns {ReactElement} A React element representing the contact form.
 */
const ContactForm = () => 
{
    emailjs.init(process.env.REACT_APP_EMAILJS_KEY as string);
    const [state, setState] = react.useState<ContactFormState>({name: "", email: "", message: ""});

    const onSubmitHandler = async(ev: any) => {
        ev.preventDefault();
        setState({...state, notification: "Attempting to send message..."});
        try
        {
            await emailjs.sendForm(process.env.REACT_APP_EMAILJS_SERVICEID as string, process.env.REACT_APP_EMAILJS_TEMPLATEID as string, ev.target);
            setState({name: "", email: "", message: "", notification: "Message succesfully send."});
        }
        catch(ex)
        {
            
            setState({...state, notification: "Failed to send message: "});
        }
    }

    return (<ContentBox header="Contact us" content={(<>
        {state.notification && state.notification.length ? (
            <div className={("bg-"+((state.notification.includes("succesfully") ? "success" : (state.notification.includes("danger") ? "danger" : "warning"))))+" p-2 text-white mt-4"}>
                {state.notification }
            </div>
        ) : (<></>)}
        
        <form method="POST" className=" input-group d-flex flex-column" onSubmit={onSubmitHandler} >
            <label htmlFor="user_name" className="mt-3">Naam: </label>
            <input type="text" name="user_name" id="user_name" className="mt-1 input-group-text" pattern="[a-zA-Z ]+" onChange={(ev) => setState({... state, name: ev.target.value})} />
            <label htmlFor="user_email" className="mt-3">E-mail: </label>
            <input type="email" className="mt-1 input-group-text" name="user_email" id="user_email" onChange={(ev) => setState({... state, email: ev.target.value})} />
            <label htmlFor="message" className="mt-3">Bericht: </label>
            <textarea name="message" className="mt-1 input-group-text" onChange={(ev) => setState({... state, message: ev.target.value})}>
            </textarea>
            <input type="submit" value="Send" className="mt-5 btn btn-dark" disabled={!state.email.length || !state.message.length || !state.name.length} />
        </form>
    </>)}/>
    )
}

export default ContactForm;