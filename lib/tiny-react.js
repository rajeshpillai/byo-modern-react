// 1. createElement Stub
// 2. createElement Basic Implementation
// 3. createElement Handle true/false short circuiting
// 4. createElement remove undefined nodes

const TinyReact = (function () {
  function createElement(type, attributes = {}, ...children) {
      // console.log("CHILDREN: ", type, ...children);
      const childElements = [];      

      for(const child of [].concat(...children)) {
        // console.log("createElement: ", child);
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
    // console.log(`Rendering ${vdom.type}`, vdom);
    let newDomElement = null;
    
    if (typeof vdom.type == "function") {
      let result = vdom.type(vdom.props || {});
      let elm =  mount(result, container, oldDom);
      console.log("RESULT: ", elm, result, vdom.props);
      
      updateAttributes(elm, vdom);
      return elm;
    } else {
      switch(vdom.type) {
        case "text":
          newDomElement = document.createTextNode(vdom.props.textContent);
          break;
        default:
          newDomElement = document.createElement(vdom.type);
          updateAttributes(newDomElement, vdom);
      }
    }

    newDomElement._vdom = vdom;
    container.appendChild(newDomElement);    

    // console.log("VDOM: ", vdom);
    if (vdom.children) {
      vdom.children.forEach(child => {
        return mount(child, newDomElement);
      })
    }
    return newDomElement;
  }

  function updateAttributes(domElement, vdom, oldvdom = {}) {
    const newProps = vdom.props || {}; 
    const oldProps = oldvdom.props || {};

    // console.log("newProps: ", newProps);

    for(let key in newProps) {
      // console.log("key: ", key);
      if (key.startsWith("on")) {
        const eh = newProps[key];
        const eventName = key.toLowerCase().slice(2);
        domElement.addEventListener(eventName, eh, false);
      } else if(key !== "children") {
          if (key === "className" || key === "class") {
              domElement.setAttribute("class", newProps[key]);
          } else {
            domElement.setAttribute(key,  newProps[key]);
          }
        } else {
          console.log("updateAttributes: What's this!!", vdom.type);
        }
      } 
  }

  return {
      createElement,
      render
  }
}());