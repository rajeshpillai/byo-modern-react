/** @jsx TinyReact.createElement */

const root = document.getElementById("root");

let Title = function (props) {
  return <h1>{props.children}</h1>
}

let Step2 = (
  <div>
     <Title class="header">Tiny React!</Title>
    <h1 className="header">Hello Again!</h1>
    <h2>(coding nirvana)</h2>
    <div className="nested">nested 1<div>nested 1.1</div></div>
    <h3 style="background-color:yellow">(OBSERVE: I said it!!)</h3>
    {2 == 1 && <div>Render this if 2==1</div>}
    {2 == 2 && <div>{2}</div>}
    <span class="label">Something goes here...</span>
    <button onClick={() => alert("This has changed!")}>Click me!</button>
  </div>
);

// let Step2 = (
//     <Title class="header">Tiny React!</Title>
// )

// let Step2 = (
//   <div class="container">
//     <Title class="header">Tiny React!</Title>
//     <h2>It Rocks!</h2>
//   </div>
// );

console.log(Step2);

TinyReact.render(Step2, root);