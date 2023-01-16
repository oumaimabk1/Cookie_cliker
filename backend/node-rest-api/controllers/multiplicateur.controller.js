
const Multiplicateur = require('../models/multiplicateur');


module.exports = {
    //get multi
    getAll: async () => {
        return await Multiplicateur.find();
    },

    getOne: async (req) => {
        return await  Multiplicateur.findById(req.params.id);
    },

    addMulti: async (req)=> {
        return await Multiplicateur.create(req.body);
    },

    updateMulti: async (req)=> {
        return await  Multiplicateur.findByIdAndUpdate(req.params.id, req.body);
    },

    delete:async (req)=> {
      return await  Multiplicateur.findByIdAndRemove(req.params.id, req.body);
    }
}



