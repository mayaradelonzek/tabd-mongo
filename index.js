//config inicial
const express = require('express')
const app = express()

const mongoose = require('mongoose')

const Animais = require('./models/Animais')

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

//rotas
app.post('/animais', async (req, res) => {
    const { raca, tamanho, filhote } = req.body
    const animal = {
        raca,
        tamanho,
        filhote
    }

    try {
        await Animais.create(animal)
        res.status(201).json({ message: 'Animal inserido' })
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

app.get('/animais', async (req, res) => {
    try {
        const animal = await Animais.find()
        res.status(200).json(animal)
    } catch(error) {
        res.status(500).json({ error: error })
    }
})

app.get(`/animais/:id`, async (req, res) => {
    const id = req.params.id

    try {
        const animal = await Animais.findOne({ _id:id })

        if(!animal) {
            res.status(422).json({ message: 'Animal não encontrado' })
            return
        }

        res.status(200).json(animal)
        
    } catch(error) {
        res.status(500).json({ error: error })
    }
})

app.patch(`/animais/:id`, async (req, res) => {
    const id = req.params.id
    const { raca, tamanho, filhote } = req.body

    const animal = {
        raca, tamanho, filhote
    }

    try {
        const updatedAnimal = await Animais.updateOne({_id:id}, animal)
            if (updatedAnimal.matchedCount === 0) {
                res.status(422).json({message: 'Animal não encontrado'})
                return
            }
            res.status(200).json(animal)
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

app.delete(`/animais/:id`, async (req, res) => {
    const id = req.params.id

    const animal = await Animais.findOne({_id:id})

    try {
        const animal = await Animais.deleteOne({ _id:id })

        if(!animal) {
            res.status(422).json({ message: 'Animal não encontrado' })
            return
        }

        res.status(200).json({ message: 'Animal deletado' })

        
    } catch(error) {
        res.status(500).json({ error: error })
    }
})

mongoose.connect('mongodb+srv://mayara:mayara@cluster0.z8gbfxq.mongodb.net/?retryWrites=true&w=majority').then(() => {
    console.log('Conectou')
    app.listen(3000)
})
.catch((err) => console.log(err))