class InfoBox extends HTMLElement {
  constructor() {
    super()

    // Creating the shadow DOM
    this.attachShadow({ mode: 'open' })

    // Creating the template
    this.shadowRoot.innerHTML = `
      <style>
        #info-box {
          display: none;
        }
      </style>

      <button>Show</button>
      <p id="info-box">
        <slot>More infos!</slot>
      </p>
    `

    // Creating variables
    this._isVisible = false
    this._$button = this.shadowRoot.querySelector('button')
    this._$infoEl = this.shadowRoot.querySelector('p')

    this._$button.addEventListener('click', this._toggleInfoBox.bind(this))
  }

  connectedCallback() {
    const isVisible = this.hasAttribute('is-visible') && this.getAttribute('is-visible') === 'true'
    if (isVisible) {
      this._isVisible = true
      this._$infoEl.style.display = 'block'
      this._$button.textContent = 'Hide'
    }
  }

  _toggleInfoBox(event) {
    event.preventDefault()

    this._isVisible = !this._isVisible
    this._$infoEl.style.display = this._isVisible ? 'block' : 'none'
    this._$button.textContent = this._isVisible ? 'Hide' : 'Show'
  }
}

customElements.define('uc-info-box', InfoBox)
