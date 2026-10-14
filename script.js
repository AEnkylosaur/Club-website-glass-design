// INITIALIZE EMAILJS
emailjs.init("4lrJ1yocvykEMSV0_");

const form = document.getElementById("recruitment-form");
const submitButton = form.querySelector(".submit-btn");
const message = document.getElementById("formMessage");

const SERVICE_ID = "service_2oladgp";
const OVERSEER_TEMPLATE = "template_qzj8qnl";
const CONFIRM_TEMPLATE  = "template_0gw3b17";

function setMessage(text, type){
    message.textContent = text;
    message.className = "form-message " + (type || "");
    message.hidden = !text;
    if(text) message.scrollIntoView({behavior:"smooth", block:"center"});
}

form.addEventListener("submit", async function(event){

    event.preventDefault();
    setMessage("");

    submitButton.disabled = true;
    submitButton.textContent = "Sending application…";

    try{
        // 1) send the application to the overseer
        await emailjs.sendForm(SERVICE_ID, OVERSEER_TEMPLATE, form);
    }catch(error){
        console.log(error);
        setMessage("Failed to send your application. Please check your connection and try again.", "error");
        submitButton.disabled = false;
        submitButton.textContent = "Submit application";
        return;
    }

    try{
        // 2) send the confirmation email to the applicant
        await emailjs.sendForm(SERVICE_ID, CONFIRM_TEMPLATE, form);
        setMessage("Application successfully submitted. A confirmation email is on its way.", "success");
    }catch(error){
        console.log(error);
        // the application itself did go through, so don't ask them to resubmit
        setMessage("Your application was submitted, but we couldn't send the confirmation email. Please double-check the Gmail address you entered.", "error");
    }

    form.reset();
    submitButton.disabled = false;
    submitButton.textContent = "Submit application";
});