class Modal extends HTMLElement {

  constructor() {
    super();

    this.attachShadow({ mode: 'open' })
    this.shadowRoot.innerHTML = `
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        #backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 100vh; /* com isso o body nao precisa ser 100% ;) */
          background-color: rgba(0,0,0,0.75);
          z-index: 10;
        }
      </style>
      <div id="backdrop"></div>
      <div id="modal"></div>
    `;
  }
}

customElements.define('uc-modal', Modal)
