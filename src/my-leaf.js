class MyLeaf extends HTMLElement {
  constructor() {
    super();
  }
}

window.customElements.define("my-leaf", MyLeaf);

export default MyLeaf;
