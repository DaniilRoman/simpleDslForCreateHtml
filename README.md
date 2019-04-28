
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

```json
{ "val": "→", "type": "op", "expr": 
  [ 
    { "val": "button", "type": "el" }, 
    { "val": "↑", "type": "op", "expr": 
      [ 
        { "val": "input", "type": "el" }, 
        { "val": "p", "type": "el" } 
      ] 
    } 
  ]
}
```

and it parses using "recursive descent parser"

Result:
![alt text](https://github.com/DaniilRoman/simpleDslForCreateHtml/blob/master/image.png)
