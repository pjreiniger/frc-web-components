
const isWebbit = (domNode) => {
  if (!(domNode instanceof Object)) {
    return false;
  }

  return domNode.constructor.__WEBBIT_CLASSNAME__ === 'Webbit';
};

const getChildWebbits = (domNode) => {
  return [...domNode.children].filter(node => {
    return true;
    //return isWebbit(node);
  });
};


class WomNode {

  constructor(node, ancestors = []) {
    this.node = node;
    this.ancestors = ancestors;
    this.childNodes = [];

    this.onMouseEnter = () => {
      const event = new CustomEvent('womNodeMouseenter', {
        bubbles: true,
        composed: true,
        detail: {
          node: this,
        }
      });
      node.dispatchEvent(event);
    };

    this.onMouseLeave = () => {
      const event = new CustomEvent('womNodeMouseleave', {
        bubbles: true,
        composed: true,
        detail: {
          node: this
        }
      });
      node.dispatchEvent(event);
    };

    this.onMouseClick = (ev) => {
      ev.stopPropagation();
      const event = new CustomEvent('womNodeSelect', {
        bubbles: true,
        composed: true,
        detail: {
          node: this
        }
      });
      node.dispatchEvent(event);
    }

    node.addEventListener('mouseover', this.onMouseEnter);
    node.addEventListener('mouseleave', this.onMouseLeave);
    node.addEventListener('click', this.onMouseClick);
  }

  destroy() {
    this.node.removeEventListener('mouseover', this.onMouseEnter);
    this.node.removeEventListener('mouseleave', this.onMouseLeave);
    this.node.removeEventListener('click', this.onMouseClick);

    this.childNodes.forEach(node => {
      node.destroy();
    });
  }

  build() {
    this.childNodes = getChildWebbits(this.node).map(node => {
      const womNode = new WomNode(node, this.ancestors.concat(this));
      womNode.build();
      return womNode;
    });
  }

  isDescendant(node) {
    return this.ancestors.indexOf(node) >= 0;
  }

  getChildren() {
    return this.childNodes;
  }

  hasChildren() {
    return this.childNodes.length > 0;
  }

  getName() {
    return this.node.tagName.toLowerCase();
  }

  isRoot() {
    return this.level === 0;
  }

  getNode() {
    return this.node;
  }

  getLevel() {
    return this.ancestors.length;
  }
}


/**
 * Webbit Object Model (WOM)
 */
class Wom {

  constructor(rootNode) {
    this.rootNode = rootNode;
    this.womNode = new WomNode(this.rootNode);
    this.womNode.build();
  


    const observer = new MutationObserver(() => {
      this.womNode.build();
    });
    observer.observe(this.rootNode, {
      childList: true,
      subtree: true
    });
  }

  getRootNode() {
    return this.womNode;
  }

  destroy() {
    this.womNode.destroy();
  }
}


export default Wom;