class LeadsCollectionElement extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: "open" });

        const wrapper = document.createElement("div");
        wrapper.setAttribute("class", "leads-collection-wrapper");

        
    }
};

customElements.define('leads-collection', LeadsCollectionElement);