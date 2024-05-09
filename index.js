
const fs = require('fs');
const { parse } = require('csv-parse');

const habitablePlanets = []

const isHabitablePlanets = (planet) => {
    return planet['koi_disposition'] === 'CONFIRMED'
    && 0.36< planet['koi_insol'] && planet['koi_insol'] <1.11
    && planet['koi_prad'] < 1.6;
}

const parser = parse({
    comment: '#',
    columns: true,
})

fs.createReadStream('kepler_data.csv')
    .pipe(parser)

    .on('data', (data) => {
        if(isHabitablePlanets(data))
        habitablePlanets.push(data);
    })
    .on('error', (err) => {
        console.log(err); 
    })
    .on('end', ()=> {
        console.log(habitablePlanets.map((planet) => {
            return planet['kepler_name'] }))
            
        console.log(`${habitablePlanets.length} habitable planets found!`);
        console.log('done')
    })

