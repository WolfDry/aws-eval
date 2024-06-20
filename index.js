const express = require('express');
const app = express();
const port = 3000;
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.get('/users', async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (error) {
        console.error(JSON.stringify(error));
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/users/:id', async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: Number(req.params.id) }
        });
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error(JSON.stringify(error));
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/users', async (req, res) => {
    try {
        const user = await prisma.user.create({
            data: req.body
        });
        res.status(201).json(user);
    } catch (error) {
        console.error(JSON.stringify(error));
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.patch('/users/:id', async (req, res) => {
    try {
        const user = await prisma.user.update({
            where: { id: Number(req.params.id) },
            data: req.body
        });
        res.json(user);
    } catch (error) {
        console.error(JSON.stringify(error));
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.delete('/users/:id', async (req, res) => {
    try {
        await prisma.user.delete({
            where: { id: Number(req.params.id) }
        });
        res.status(204).send();
    } catch (error) {
        console.error(JSON.stringify(error));
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});