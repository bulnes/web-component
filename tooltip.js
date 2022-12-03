class Tooltip extends HTMLElement {

  constructor() {
    super();

    this._tooltipContainer
    this._tooltipText = 'Some dummy default text here.'

    this.attachShadow({ mode: 'open' });

    // Definindo o template dentro do próprio Web Component S2
    this.shadowRoot.innerHTML = `
      <style>
        div {
          font-weight: normal;
          background-color: black;
          color: white;
          position: absolute;
          top: 1.5rem;
          left: 0.75rem;
          z-index: 10;
          padding: 0.15rem;
          border-radius: 3px;
          box-shadow: 1px 1px 6px rgba(0,0,0,0.26);
        }

        :host {
          background-color: var(--color-primary, #ccc);
          padding: 0.15rem;
        }

        :host(.important) {
          background-color: lightblue;
        }

        :host-context(p) {
          font-weight: bold;
        }

        ::slotted(*) {
          border-top: 1px solid blue;
        }

        ::slotted(.highlight) {
          border-bottom: 1px solid blue;
        }
      </style>
      <slot>Some default</slot> 
      <span>(?)</span>
    `;
  }

  connectedCallback() {
    if (this.hasAttribute('text')) {
      this._tooltipText = this.getAttribute('text')
    }

    const tooltipIcon = this.shadowRoot.querySelector('span');
    tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this))
    tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this))

    this.shadowRoot.appendChild(tooltipIcon)
    this.style.position = 'relative'
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return false
    }

    if (name === 'text') {
      this._tooltipText = newValue
    }

    return true
  }

  static get observedAttributes() {
    return ['text', 'class']
  }

  _showTooltip() {
    this._tooltipContainer = document.createElement('div')
    this._tooltipContainer.textContent = this._tooltipText;

    this.shadowRoot.appendChild(this._tooltipContainer)
  }

  _hideTooltip() {
    this.shadowRoot.removeChild(this._tooltipContainer)
  }
}

customElements.define('uc-tooltip', Tooltip)
