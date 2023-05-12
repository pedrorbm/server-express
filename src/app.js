const express = require('express');
const teams = require('./array');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  console.log(req.query);
  res.status(200).json({ message: 'Olá Mundo!' });
});

app.get('/teams', (req, res) => {
  res.status(200).json({ teams });
});

app.post('/sum/:id', (req, res) => {
  console.log(req.params.id);
  res.status(200).json({ message: 'Olá Mundo!' });
});

app.post('/teams', (req, res) => {
  const newTeam = { ...req.body };
  teams.push(newTeam);

  res.status(201).json({ team: newTeam });
});

app.put('/teams/:id', (req, res) => {
  const { id } = req.params;
  const { name, initials } = req.body;

  const updateTeam = teams.find((team) => team.id === Number(id));

  if (!updateTeam) {
    res.status(404).json({ message: 'Team not found' });
  }

  updateTeam.name = name;
  updateTeam.initials = initials;
  res.status(200).json({ updateTeam });
});

app.delete('/teams/:id', (req, res) => {
  const { id } = req.params;
  const arrayPosition = teams.findIndex((team) => team.id === Number(id));
  teams.splice(arrayPosition, 1);

  res.status(200).end();
});

console.log(teams);

module.exports = app;
