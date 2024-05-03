/** @jsx TinyReact.createElement */

/*** Step 1,2,3,4 - createElement */

const root = document.getElementById("root");


// Step 5, 6

let Step2 = (
  <div>
    <h1 className="header">Hello Tiny React!</h1>
    <h2>(coding nirvana)</h2>
    <div>nested 1<div>nested 1.1</div></div>
    <h3 style="background-color:yellow">(OBSERVE: I said it!!)</h3>
    {2 == 1 && <div>Render this if 2==1</div>}
    {2 == 2 && <div>{2}</div>}
    <span>Something goes here...</span>
    <button onClick={() => alert("This has changed!")}>Click me!</button>
  </div>
);

Step2 = (
  <div class="container">
    <h2>Hello Tiny React!</h2>
  </div>
);
console.log(Step2);

TinyReact.render(Step2, root);