import express from 'express';
import Apartment from '../models/apartment.js'

const apartmentsRouter = express.Router();

const getApartment = async (req, res, next) => {
    console.log(req.params);
    let apartment;
    try {
         apartment = await Apartment.findById(req.params.id);
        if (apartment == null) {
            return res.status(404).send({message: 'Cannot find the apartment'});
        }
    } catch (e) {
        res.status(500).send({message: e.message});
    }

    res.apartment = apartment;
    next();
} 

apartmentsRouter.get('/', async (req, res) => {
  //  Get list of apartments; sorting (price) and filtering (rooms)  
    
    let filter = null, 
        sort = null;

    if (req.query.price 
        && typeof(req.query.price) === 'string' 
        && (req.query.price === 'asc' || req.query.price === 'desc')) {
            sort = {price: req.query.price};
    }
    if (req.query.rooms
        && typeof(+req.query.rooms) === 'number') {
        filter = {rooms: +req.query.rooms}
    }
    try {
        const apartments = await Apartment.find(filter).sort(sort);
        res.send(apartments);
    } catch (e) {
        res.status(500).send({message: e.message});
    }
})

apartmentsRouter.get('/:id', getApartment, (req, res) => {
    //Get apartment details
    res.send(res.apartment);
})

apartmentsRouter.post('/', async (req, res) => {
    //  Add new apartment; (validation rules: rooms-number, name-max length[99], price-number, description-max length[999])
    const apartment = new Apartment (req.body)
    try {
        const newApartment = await apartment.save();
        res.status(201).send({id: newApartment.id});
    } catch (e) {
        res.status(400).send({message: e.message});;
    }
})

apartmentsRouter.delete('/:id', getApartment, async (req, res) => {
    //  Delete apartment
    try {
        await res.apartment.remove();
        res.send({message: "Successfully deleted"});
    } catch (e) {
        res.status(500).send({message: e.message});
    }
})

apartmentsRouter.put('/:id', getApartment, async (req, res) => {
    //  Edit apartment details;
    try {
        await res.apartment.update({$set: req.body});
        res.send({message: "Successfully updated"});
    } catch (e) {
        res.status(400).send({message: e.message});
    }
})

export default apartmentsRouter;