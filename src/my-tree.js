import MyLeaf from "./my-leaf";

const template = document.createElement("template");
template.innerHTML = `
  <div class="tree">
  </div>
`;

class MyTree extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    try {
      const data = JSON.parse(this.children[0].innerHTML);
      this.shadowRoot.querySelector(".tree").innerText = JSON.stringify(data);

      const rootLeaf = new MyLeaf();
      rootLeaf.setAttribute("id", data.id);
      this.addLeafs(rootLeaf, data.items);
      this.shadowRoot.appendChild(rootLeaf.cloneNode(true));
    } catch (e) {
      console.error(e);
    }
  }

  addLeafs(parent, data) {
    if (!data) {
      return;
    }

    data.forEach((leaf) => {
      const newLeaf = new MyLeaf();
      if ("id" in leaf) {
        newLeaf.setAttribute("id", leaf.id);
      }
      if ("items" in leaf) {
        this.addLeafs(newLeaf, leaf.items);
      }
      parent.appendChild(newLeaf.cloneNode(true));
    });
  }
}

window.customElements.define("my-tree", MyTree);
