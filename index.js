//config inicial
const express = require('express')
const app = express()

const mongoose = require('mongoose')

const Person = require('./models/Person')

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

//rotas
app.post('/person', async (req, res) => {
    const { name, age } = req.body
    const person = {
        name,
        age
    }

    try {
        await Person.create(person)
        res.status(201).json({ message: 'Pessoa inserida' })
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

app.get('/person', async (req, res) => {
    try {
        const people = await Person.find()
        res.status(200).json(people)
    } catch(error) {
        res.status(500).json({ error: error })
    }
})

app.get(`/person/:id`, async (req, res) => {
    const id = req.params.id

    try {
        const person = await Person.findOne({ _id:id })

        if(!person) {
            res.status(422).json({ message: 'User not found' })
            return
        }

        res.status(200).json(person)
        
    } catch(error) {
        res.status(500).json({ error: error })
    }
})

app.patch(`/person/:id`, async (req, res) => {
    const id = req.params.id
    const { name, age } = req.body

    const person = {
        name, age
    }

    try {
        const updatedPerson = await Person.updateOne({_id:id}, person)
            if (updatedPerson.matchedCount === 0) {
                res.status(422).json({message: 'User not found'})
                return
            }
            res.status(200).json(person)
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

app.delete(`/person/:id`, async (req, res) => {
    const id = req.params.id

    const person = await Person.findOne({_id:id})

    try {
        const person = await Person.deleteOne({ _id:id })

        if(!person) {
            res.status(422).json({ message: 'User not found' })
            return
        }

        res.status(200).json({ message: 'Deleted user' })

        
    } catch(error) {
        res.status(500).json({ error: error })
    }
})

mongoose.connect('mongodb+srv://mayara:mayara@cluster0.z8gbfxq.mongodb.net/?retryWrites=true&w=majority').then(() => {
    console.log('Conectou')
    app.listen(3000)
})
.catch((err) => console.log(err))