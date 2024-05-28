class LeadsCollectionElement extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: "open" });

        const wrapper = document.createElement("div");
        wrapper.setAttribute("class", "leads-collection-wrapper");

        const textEl = document.createElement("span");
        textEl.textContent = 'Hello!'

        const style = document.createElement("style");
        style.textContent = `
            .leads-collection-wrapper {
                border: 1px solid red;
            }
        `;

        // Connect everything
        shadow.appendChild(style);
        shadow.appendChild(wrapper);
        wrapper.appendChild(textEl);
    }
};

customElements.define('leads-collection', LeadsCollectionElement);