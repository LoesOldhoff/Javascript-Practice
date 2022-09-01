let data = [
    {
        name: 'Loes',
        species: 'human'
    },
    {
        name: 'Jordi',
        species: 'snake'
    },
    {
        name: 'Volley',
        species: 'catfish'
    },
    {
        name: 'Whiplash',
        species: 'catfish'
    },
    {
        name: 'Megy',
        species: 'dog'
    },
    {
        name: 'Swim Shady',
        species: 'cherry barb'
    },
]

const info = document.querySelector('#info');
let details = data.map(function(creature) {
    return '<div>' + creature.name + ' the ' + creature.species + '</div>';
    
});

info.innerHTML = details.join('\n')