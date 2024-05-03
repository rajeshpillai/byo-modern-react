// 1. createElement Stub
// 2. createElement Basic Implementation
// 3. createElement Handle true/false short circuiting
// 4. createElement remove undefined nodes

const TinyReact = (function () {
  function createElement(type, attributes = {}, ...children) {
      const childElements = [];      
      for(let child of children) {
        if (typeof child === 'boolean') continue;
        if (child instanceof Object) 
          childElements.push(child);
        else { 
          childElements.push(createElement("text", {
            textContent: child
          }));
        }
      }
      
      return {
          type,
          children: childElements,
          props: Object.assign({ children: childElements }, attributes)
      }
  }

  function render(vdom, container, oldDom = container.firstChild) {
    console.log(`Rendering ${vdom.type}`);
    return mount(vdom, container, oldDom);    
  }
  
  function mount(vdom, container, oldDom) {
    let newDomElement = null;
    switch(vdom.type) {
      case "text":
        newDomElement = document.createTextNode(vdom.props.textContent);
        break;
      default:
        newDomElement = document.createElement(vdom.type);
    }

    newDomElement._vdom = vdom;
    container.appendChild(newDomElement);    
    vdom.children.forEach(child => {
      mount(child, newDomElement);
    })
  }

  return {
      createElement,
      render
  }
}());