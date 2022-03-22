const express = require("express")
const app = express()

app.use(express.json())

//const cors = require ('cors') ;
//app.use(cors());

/* const morgan = require('morgan')
// app.use(morgan("tiny"))

morgan.token('ob', function (req) {
  return `${JSON.stringify(req.body)}`
}) */

// app.use(morgan(':method :url :status :response-time :req[header] :ob'))

const PORT = 5002
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})



let  persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (req, res) => {
  /* setTimeout(() => {
    res.json(persons);
  }, 3000);
 */
 // res.json(persons);
 res.setTimeout(5000, () => res.json(persons));
    
  })