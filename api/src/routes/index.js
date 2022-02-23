const { Router } = require('express');
const axios = require("axios");
const { Country, Activity} = require("../db.js")

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getApiInfo = async (req, res, next) => {
    try{
        {
         const apiUrl = await axios.get("https://restcountries.com/v3.1/all");
         const apiInfo = await apiUrl.data.map((el) => {
            return {

                id: el.cca3,
                name: el.name.common,
                flag: el.flags.png,
                continent: el.continents[0],
                capital: el.capital ? el.capital[0]:"Field not found",
                subregion: el.subregion ? el.subregion:"Field not found",
                area: el.area ? el.area:"Field not found" ,
                population: el.population /* ? el.population:"Field not found" */

            }
         })
         
         //console.log(apiInfo, "aPI info-----------------")
         return apiInfo;
        }
    } catch(error){
        res.send(error);
    }
}

router.get("/countries", async (req, res, next) => {
    try{
        const countriesDb = await Country.findAll()
        if(countriesDb.length === 0){
            const countries = await getApiInfo()
            countries.forEach((el) => {
                Country.findOrCreate({
                    where:{ 
   
                       id: el.id,
                       name: el.name,
                       flag: el.flag,
                       continent: el.continent,
                       capital: el.capital,
                       subregion: el.subregion,
                       area: el.area,
                       population: el.population
                    } 
               });
           });
        }
        if(!req.query.name){
            
        let allCountries = await Country.findAll({
            include: Activity
        })
        res.status(200).send(allCountries) 
        } else {
            next()
        }
    } catch (error) {
        res.send(error)
    }
})

router.get("/countries", async (req, res) => {
    const name = req.query.name 
    try {

        const allCountries = await Country.findAll({
            include: Activity
        })
         const country = allCountries.filter((el) => el.name.toLowerCase().includes(name.toLowerCase()))
         //console.log(country.length,"------------------------ hello ")
         country.length === 0 ? res.send("sorry, can´t find that"): res.send(country)   
          
    } catch(error){
        res.send(error)
    }
    
})

router.get("/countries/:countryId", async (req, res) => {
    try {
        const idCountry = req.params.countryId
        const country = await Country.findAll({
            where: {id: idCountry.toUpperCase()},
            include: Activity
        })
        res.status(200).send(country)
    } catch(error) {
        res.send(error)
    }
})

router.post('/activity', async (req, res) => {
    try {
        const {name, difficulty, duration, season, country} = req.body

        const newActivity = await Activity.create({
            name,
            difficulty,
            duration,
            season,
        })

        let activityCountry = await Country.findAll({
            where: {name: country}
        })

        activityCountry.forEach(country => {
            newActivity.addCountry(country)
        })

        res.send('Activity successfully created')
    } catch(error) {
        res.send(error)
    }
}) 

module.exports = router;
