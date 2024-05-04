/** @jsx TinyReact.createElement */

const root = document.getElementById("root");

let Title = function (props) {
  return <h1>{props.children}</h1>
}

let App = function (props) {
  let state = +new Date();

  // setInterval(() => {
  //   state = +new Date();
  //   console.log("State changing...", state);
  // }, 1000);

  return (
    <div>
      <Title class="header">{props.title}</Title>
      <h1 className="header">Hello Again!</h1>
      <h2>(coding nirvana)</h2>
      <div className="nested">nested 1<div>nested 1.1</div></div>
      <h3 style="background-color:yellow">(OBSERVE: I said it!!)</h3>
      {2 == 1 && <div>Render this if 2==1</div>}
      {2 == 2 && <div>{2}</div>}
      {props.title == "First" && <div>Only for First</div>}
      <span class="label">Something goes here...</span>
      State: {state}
      <button onClick={() => alert("This has changed!")}>Click me!</button>
    </div>
  );
}

setTimeout(() => {
  console.log("Rerender....");
  const dom = TinyReact.render(<App title="Second" />, root);  
  console.log("THE DOM 2: ", dom);
}, 2000);


const dom = TinyReact.render(<App title="First" />, root);
console.log("THE DOM 1: ", dom);