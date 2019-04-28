
see result here:
https://playcode.io/302332?tabs=console&script.js&output

It's а simple domain-specific language for creating some html elements relative to each other.

Support elements: button, input, p.
Support operations: right(→), left(←), up(↑), down(↓)

Example: 
button → input ↑ p

transform to: 
→ button ↑ input p

building to abstract syntax tree:

{ "val": "→", "type": "op", "expr": 
  [ { "val": "button", "type": "el" }, 
    { "val": "↑", "type": "op", "expr": 
      [ { "val": "input", "type": "el" }, 
        { "val": "p", "type": "el" } 
      ] 
    } 
  ] 
}

and it parses using "recursive descent parser algorithm"

Result:
/home/daniil/Pictures/Screenshot from 2019-04-29 00-31-56.png
