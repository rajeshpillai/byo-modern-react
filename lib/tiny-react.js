// 1. createElement Stub
// 2. createElement Basic Implementation
// 3. createElement Handle true/false short circuiting
// 4. createElement remove undefined nodes

const TinyReact = (function () {
  function createElement(type, attributes = {}, ...children) {
      console.log("CHILDREN: ", type, ...children);
      const childElements = [];      

      for(const child of [].concat(...children)) {
        console.log("createElement: ", child);
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
    return mount(vdom, container, oldDom);    
  }
  
  function mount(vdom, container, oldDom) {
    console.log(`Rendering ${vdom.type}`, vdom);
    let newDomElement = null;
    
    if (typeof vdom.type == "function") {
      let result = vdom.type(vdom.props || {});
      console.log("RESULT: ", result);
      return mount(result, container, oldDom);
    } else {
      switch(vdom.type) {
        case "text":
          newDomElement = document.createTextNode(vdom.props.textContent);
          break;
        default:
          newDomElement = document.createElement(vdom.type);
      }
    }

    newDomElement._vdom = vdom;
    container.appendChild(newDomElement);    

    console.log("VDOM: ", vdom);
    if (vdom.children) {
      vdom.children.forEach(child => {
        return mount(child, newDomElement);
      })
    }
    return newDomElement;
  }

  return {
      createElement,
      render
  }
}());