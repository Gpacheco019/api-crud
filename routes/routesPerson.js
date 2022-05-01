const router = require('express').Router()
const Person = require('../models/Person')


router.post('/', async (req, res) => {
    const { name, salary, approved } = req.body;

    if(!name || !salary || approved === undefined){
         res.status(422).json({error: 'Informações necessárias para o cadastro nome, salário ou approved'});
         return
    }

    const person = {
        name,
        salary,
        approved
    }
        
    try {
        await Person.create(person)
        res.status(201).json('Usuário cadastrado com sucesso')
        
    } catch (error) {
        res.status(500).json({error: error})
    }
})


router.get('/', async (req, res) => {
    try {

        const people = await Person.find()
        res.status(200).json(people)
        
    } catch (error) {
        res.status(500).json({error: error})
        
    }
})

router.get('/:id', async (req, res) => {
    try {

        const id = req.params.id;

        const people = await Person.findOne({_id: id})
        if(!people) {
            res.status(422).json({message: 'O usuário não foi encontrado'})
            return
        }

        res.status(200).json(people)
        
    } catch (error) {
        res.status(500).json({error: error})
        
    }
})

router.patch('/:id', async (req, res) => {   
    
    try {
        const { name, salary, approved } = req.body;
        
        const person = {
            name,
            salary,
            approved
        }

        const id = req.params.id;

        const updatedPerson = await Person.updateOne({_id: id}, person)

        if(updatedPerson.matchedCount === 0) {
            res.status(422).json({message: 'O usuário não foi encontrado'})
            return
        }

        res.status(200).json({message: "usuário atualizado com sucesso!"})
        
    } catch (error) {
        res.status(500).json({error: error})
        
    }
})

router.delete('/:id', async (req, res) => {
    try {

        const id = req.params.id;
        const person = await Person.findOne({_id: id})

        if(!person) {
            res.status(422).json({message: 'O usuário não foi encontrado'})
            return
        }

        await Person.deleteOne({_id: id})
        res.status(200).json({message: "usuário removido com sucesso!"})
        
    } catch (error) {
        res.status(500).json({error: error})
        
    }
})

module.exports = router;