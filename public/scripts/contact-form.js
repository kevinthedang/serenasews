document.addEventListener("DOMContentLoaded", () => {
    // Scroll to Top Button
    const topButton = document.querySelector(".top-button");

    const toggleTopButton = () => {
        if (!topButton) return;

        if (window.scrollY > 120) {
            topButton.classList.add("visible");
        } else {
            topButton.classList.remove("visible");
        }
    };

    window.addEventListener("scroll", toggleTopButton);
    toggleTopButton();

    // Contact Form
    const form = document.querySelector("#contact-form");
    if (!form) return;

    const status = document.querySelector("#form-status");
    const button = form.querySelector("button[type='submit']");
    const originalText = button?.textContent || "Submit";

    const public_key = window.EMAILJS?.publicKey;
    const service_id = window.EMAILJS?.serviceId;
    const templateId = window.EMAILJS?.templateId;

    if (!window.emailjs) {
        console.error("EmailJS did not load.");
        if (status) {
            status.textContent = "Email service failed to load.";
            status.className = "form-status error";
        }
        return;
    }

    emailjs.init(public_key);

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        if (!form.reportValidity()) {
            return;
        }

        if (button) {
            button.textContent = "Sending...";
            button.disabled = true;
        }

        if (status) {
            status.textContent = "Sending your message...";
            status.className = "form-status sending";
        }

        emailjs.sendForm(service_id, templateId, form)
            .then(() => {
                form.reset();
                window.history.replaceState(null, "", window.location.pathname);
                if (status) {
                    status.textContent = "Thanks! Your message was sent.";
                    status.className = "form-status success";
                }
                if (button) {
                    button.textContent = "Sent!";
                    button.disabled = false;
                }
            })
            .catch((error) => {
                console.error("EmailJS error:", error);
                if (status) {
                    status.textContent = "Sorry, something went wrong. Please try again.";
                    status.className = "form-status error";
                }
                if (button) {
                    button.textContent = originalText;
                    button.disabled = false;
                }
            });
    });
});
