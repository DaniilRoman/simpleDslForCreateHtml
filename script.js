const rootEl = document.getElementById('msg');
// correct elements
const div = 'div'; 
const p = 'p';
const button = 'button';
const input = 'input'; 
// correct operations
const left = '←';
const right = '→';
const up = '↑';
const down = '↓';
// css classes
const elementClass = 'element';
const containerClass = 'container';
const columnDirClass = 'column_direction';
// node types
const Op = 'op';
const El = 'el';
//
const ops = [left, right, up, down];
const elts = [p, button, input];
// 
let count = 0;

const stylizeEl = (element, name) => {
  switch (name) {
    case p:
      element.innerHTML = p + ': ' + count++;
      break;
    case button:
      element.innerHTML = button + ': ' + count++;
      break;
    case input:
      element.placeholder = input + ': ' + count++;
      break;
  }
  const color = '#' + Math.floor(Math.random()*16777215).toString(16);
  element.style.backgroundColor = color;
} 

const createEl = elName => {
  const el = elts.includes(elName) 
        ? document.createElement(elName) 
        : elName;
  stylizeEl(el, elName);
  el.classList.add(elementClass);
  return el;
}

const createHorizontalDiv = args => {
  const containerDivForLine = document.createElement(div);
  containerDivForLine.classList.add(containerClass);
  args.forEach(arg => {
    const el = createEl(arg);
    containerDivForLine.appendChild(el);
  });
  return containerDivForLine;
}

const createVerticalDiv = args => {
  const containerDivForColumn = createHorizontalDiv(args);
  containerDivForColumn.classList.add(columnDirClass);
  return containerDivForColumn;
}

const lex = str => str.split(' ').map(s => s.trim()).filter(s => s.length);

const transform = tokens => {
  const newTokens = [tokens[tokens.length - 1]];
  for (var i = tokens.length - 2; i >= 0; i--) {
    if (ops.includes(tokens[i])) {
      newTokens.unshift(tokens[i-1]);
      newTokens.unshift(tokens[i]);
      i--;
    } else { newTokens.unshift(tokens[i]); }
    
  }
  return newTokens;
}

const parse = tokens => {

  let c = 0;
  const peek = () => tokens[c];
  const consume = () => tokens[c++];

  const parseEl = () => ({ val: consume(), type: El });

  const parseOp = () => {
    const node = { val: consume(), type: Op, expr: [] };
    while (peek()) node.expr.push(parseExpr());
    return node;
  };

  const parseExpr = () => ops.includes(peek()) ? parseOp() : parseEl();

  return parseExpr();
};

const compile = ast => {
  const opAcMap = {
    [left]: args => createHorizontalDiv(args.reverse()),
    [right]: args => createHorizontalDiv(args),
    [up]: args => createVerticalDiv(args.reverse()),
    [down]: args => createVerticalDiv(args)
  };

  if (ast.type === El) return ast.val;
  return opAcMap[ast.val](ast.expr.map(compile));
};

const evaluate = element => rootEl.appendChild(element);

// const code = 'button → input ↑ p → input ↑ button ↓ p ↓ p';

const code = [button, right, input, up, p, right, input, up, button].join(' ');
console.log(code);

console.log('=======================================');
console.log(lex(code));
console.log('=======================================');
console.log(transform(lex(code)));
console.log('=======================================');
console.log(parse(transform(lex(code))));
console.log('=======================================');
console.log(compile(parse(transform(lex(code)))));
console.log('=======================================');
console.log(evaluate(compile(parse(transform(lex(code))))));
console.log('=======================================');










