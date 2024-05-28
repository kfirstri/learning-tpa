
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

        span.submit-button {
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
        <input type="text" id="userEmail" />
    </div>
    <span class='submit-button'>Send</span>
</div>
`;

class LeadsCollectionElement extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: "open" });

        const wrapper = document.createElement("div");
        wrapper.setAttribute("class", "leads-collection-wrapper");
        wrapper.innerHTML = htmlContent;

        const style = document.createElement("style");
        style.textContent = elementStyle;

        // Connect everything
        shadow.appendChild(style);
        shadow.appendChild(wrapper);
    }
};

customElements.define('leads-collection', LeadsCollectionElement);