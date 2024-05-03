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


  return {
      createElement
  }
}());