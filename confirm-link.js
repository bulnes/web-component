class ConfirmLink extends HTMLAnchorElement {
  connectedCallback() {
    this.addEventListener('click', event => {
      if (!confirm('Are you sure?')) {
        event.preventDefault();
      }
    })
  }
}

customElements.define('uc-confirm-link', ConfirmLink, { extends: 'a' })
