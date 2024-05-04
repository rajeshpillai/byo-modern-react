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
    console.log("render: ", oldDom);
    return diff(vdom, container, oldDom);    
  }
  
  function diff(vdom, container, oldDom) {
    const nextSibling = oldDom && oldDom.nextSibling;
    
    if (!oldDom) {
      return mount(vdom, container, oldDom);
    }
    console.log("OldDOM found...");
    let newDomElement = null;
    
    if (typeof vdom.type == "function") {
      let newVDom = vdom.type(vdom.props || {});
      // todo: WIP
      //let elm =  mount(newVDom, container, oldDom);
      let elm = {};
      //console.log("diff: ", elm._vdom, oldDom._vdom);
      console.log("diff: ", newVDom, oldDom._vdom);

      if (oldDom._vdom.type === newVDom.type) {
        console.log("Types are same");
        if (oldDom._vdom.type === "text") {
          updateTextNode(oldDom, newVDom, oldDom._vdom);
        } else {
          console.log("Updating DOM elements...");
          updateDOMElements(oldDom, newVDom, oldDom._vdom);
        }
      }

      return elm;
    } else {
      switch(vdom.type) {
        case "text":
          newDomElement = document.createTextNode(vdom.props.textContent);
          break;
        default:
          newDomElement = document.createElement(vdom.type);
          updateDOMElements(newDomElement, vdom);
      }
    }

    newDomElement._vdom = vdom;

    if (nextSibling) {
      container.insertBefore(newDomElement, nextSibling);
    } else {
      container.appendChild(newDomElement);    
    }

    // console.log("VDOM: ", vdom);
    if (vdom.children) {
      vdom.children.forEach(child => {
        return diff(child, newDomElement, oldDom);
      })
    }
    return newDomElement;
  }

  function updateTextNode(domElement, newVirtualElement, oldVirtualElement) {
    console.log("Updating text node: ", newVirtualElement.props.textContent);
    if (newVirtualElement.props.textContent !== oldVirtualElement.props.textContent) {
        domElement.textContent = newVirtualElement.props.textContent;
    }
    // Set a reference to the newvddom in oldDom
    domElement._virtualElement = newVirtualElement;
  }


  function mount(vdom, container, oldDom) {
    // console.log(`Rendering ${vdom.type}`, vdom);
    let newDomElement = null;
    const nextSibling = oldDom && oldDom.nextSibling;
    
    if (typeof vdom.type == "function") {
      let result = vdom.type(vdom.props || {});
      let elm =  mount(result, container, oldDom);
      //console.log("RESULT: ", elm, result, vdom.props);
      
      updateDOMElements(elm, vdom);
      return elm;
    } else {
      switch(vdom.type) {
        case "text":
          newDomElement = document.createTextNode(vdom.props.textContent);
          break;
        default:
          newDomElement = document.createElement(vdom.type);
          updateDOMElements(newDomElement, vdom);
      }
    }

    newDomElement._vdom = vdom;

    if (nextSibling) {
      container.insertBefore(newDomElement, nextSibling);
    } else {
      container.appendChild(newDomElement);    
    }

    // console.log("VDOM: ", vdom);
    if (vdom.children) {
      vdom.children.forEach(child => {
        return mount(child, newDomElement);
      })
    }
    return newDomElement;
  }

  function updateDOMElements(domElement, vdom, oldvdom = {}) {
    const newProps = vdom.props || {}; 
    const oldProps = oldvdom.props || {};

    // console.log("newProps: ", newProps);
    if (newProps != oldProps) {
      for(let key in newProps) {
        console.log("key: ", key);
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
        } else if(key == "children") { 
            console.log("How to handle children: ", newProps[key]);
        } else {
            //console.log("updateAttributes: What's this!!", vdom.type);
        }
      } 
    }

    // remove old propos
    for(let key in oldProps) {
      const newProp = newProps[key];
      const oldProp = oldProps[key];

      if (!newProp) {
        if (key.startsWith("on")) {
          //prop is an event handler
          domElement.removeEventListener(key, oldProp, false);
          console.log("Removing event key: ", key);
        } else if(key === "value" || key === "checked") {
            domElement[key] = newProp;
        } else if (key !== "children") {
          console.log("Removing key: ", key);
          domElement.removeAttribute(key);
        }
      }
    }
  }

  return {
      createElement,
      render,
  }
}());