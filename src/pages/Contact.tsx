import * as react from "react";
import  style from "./Contact.module.css";
import emailjs from "emailjs-com";

type ContactFormState = {
    name: string, 
    email: string, 
    message: string,
    notification?: string
}


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

    return (
        <section>
            <article className="border p-3 bg-white" style={{ borderRadius: "1rem"}}>
                <strong className="h1 d-block text-center">Contact us</strong>
                {state.notification && state.notification.length ? (
                    <div className={("bg-"+((state.notification.includes("succesfully") ? "success" : (state.notification.includes("danger") ? "danger" : "warning"))))+" p-2 text-white mt-4"}>
                        {state.notification }
                    </div>
                ) : (<></>)}
                <hr className="mt-4" />

                <form method="POST" className=" input-group d-flex flex-column" onSubmit={onSubmitHandler} >
                    <label htmlFor="user_name" className="mt-3">Name: </label>
                    <input type="text" name="user_name" id="user_name" className="mt-1 input-group-text" onChange={(ev) => setState({... state, name: ev.target.value})} />

                    <label htmlFor="user_email" className="mt-3">Email: </label>
                    <input type="email" className="mt-1 input-group-text" name="user_email" id="user_email" onChange={(ev) => setState({... state, email: ev.target.value})} />

                    <label htmlFor="message" className="mt-3">Message: </label>
                    <textarea name="message" className="mt-1 input-group-text" onChange={(ev) => setState({... state, message: ev.target.value})}>

                    </textarea>

                    <input type="submit" value="Send" className="mt-5 btn btn-dark" disabled={!state.email.length || !state.message.length || !state.name.length} />
                </form>
            </article>
        </section>
    )
}

export default ContactForm;