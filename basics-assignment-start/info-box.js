class InfoBox extends HTMLElement {
  constructor() {
    super()

    // Creating variables
    this._$button = null
    this._$infoEl = null
    this._isHidden = true

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
  }

  connectedCallback() {
    this._$button = this.shadowRoot.querySelector('button')
    this._$infoEl = this.shadowRoot.querySelector('p')

    this._isHidden = this.hasAttribute('isHidden')

    this._$button.addEventListener('click', this._toggleInfoBox.bind(this))
  }

  _toggleInfoBox(event) {
    event.preventDefault()

    if (this._isHidden) {
      this._$infoEl.style.display = 'block'
      this._$button.textContent = 'Hide'
      this._isHidden = false
    } else {
      this._$infoEl.style.display = 'none'
      this._$button.textContent = 'Show'
      this._isHidden = true
    }
  }
}

customElements.define('uc-info-box', InfoBox)
