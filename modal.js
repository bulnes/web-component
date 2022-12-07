class Modal extends HTMLElement {

  constructor() {
    super(); // não se esqueça disso

    this.attachShadow({ mode: 'open' })
    this.shadowRoot.innerHTML = `
      <style>
        /* como estamos no shadowDOM, os estilos globais não são compartilhados */
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
          opacity: 0;
          pointer-events: none;
        }

        #modal {
          position: fixed;
          top: 15vh;
          left: 25%;
          width: 50%;
          z-index: 100;
          background-color: white;
          border-radius: 3px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.26);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          opacity: 0;
          pointer-events: none;
        }

        header {
          padding: 1rem;
        }

        header h1 {
          font-size: 1.25rem;
        }

        #main {
          padding: 1rem 1rem 2rem;
        }

        #actions {
          border-top: 1px solid #ccc;
          padding: 1rem;
          display: flex;
          justify-content: flex-end;
        }

        #actions button {
          margin: 0 0.25rem;
        }
      </style>

      <div id="backdrop"></div>
      <div id="modal">
        <header>
          <h1>Please Confirm</h1>
        </header>

        <section id="main">
          <slot></slot>
        </section>

        <section id="actions">
          <button>Cancel</button>
          <button>Okay</button>
        </section>
      </div>
    `;
  }
}

customElements.define('uc-modal', Modal)
