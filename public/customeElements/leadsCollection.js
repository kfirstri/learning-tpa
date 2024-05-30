
const elementStyle = `
    @import url('https://fonts.googleapis.com/css2?family=Wix+Madefor+Text&display=swap');

    .leads-collection-wrapper {
        display: flex;
        flex-direction: column;
        
        font-family: "Wix Madefor Text", sans-serif;
        font-optical-sizing: auto;
        font-weight: 400;
        font-style: normal;
    }

    .form-wrapper {
        display: flex;
        gap: 10px;
        align-items: flex-end;

        .submit {
            background-color: blue;
            color: white;
            margin:0;
            height: 46px;
            width: 200px;
            text-align: center;
            vertical-align: middle;
            line-height: 46px;
        }
    }

    .email-input-wrapper {
        display: flex;
        flex-direction: column;
        gap: 10px;

        label {
            font-weight: 300;
        }

        input {
            height: 40px;
            width: 300px;
        }
    }
`;

const htmlContent = `
<span>
    <h2>Leave your email to join our mailing list</h2>
</span>
<div class='form-wrapper'>
    <div class="email-input-wrapper">
        <label for="userEmail">Your email address *</label>
        <input type="email" id="userEmail" />
    </div>
    <button type="submit" class="submit" id="submitButton">Send</span>
</div>
`;

class LeadsCollectionElement extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const wixconfig = JSON.parse(this?.attributes?.wixconfig?.value ?? "{}");
        // const wixsettings = JSON.parse(
        //   this?.attributes?.wixsettings?.value ?? "{}",
        // );

        // current instanceId
        this.instanceId = wixconfig?.instanceId || "";
        console.log('instance id', this.instanceId);

        this.shadow = this.attachShadow({ mode: 'open' });

        const wrapper = document.createElement('div');
        wrapper.setAttribute('class', 'leads-collection-wrapper');
        wrapper.innerHTML = htmlContent;

        const style = document.createElement('style');
        style.textContent = elementStyle;

        // Connect everything
        this.shadow.appendChild(style);
        this.shadow.appendChild(wrapper);

        this.shadow.getElementById('submitButton').addEventListener('click', this.submitEmail);
    }

    submitEmail = async (event) => {
        console.log('click', window.location);
        const emailInput = this.shadow.getElementById('userEmail');
        const email = emailInput.value;

        if (!this.instance || !email) {
            return;
        }

        event.target.style.backgroundColor = 'red';

        console.log('adding new subscription')
        await fetch(`/api/addSubscriptions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                appInstance: this.instance,
                subscribedEmail: email
            })
        });

        event.target.style.backgroundColor = 'blue';
        emailInput.value = '';
    }
};

customElements.define('leads-collection', LeadsCollectionElement);