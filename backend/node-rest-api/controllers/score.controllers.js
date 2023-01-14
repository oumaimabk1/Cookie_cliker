const Score = require('../models/score');

module.exports = {
    //get multi
    getAll: async () => {
        return await Score.find();
    },

    getOne: async (req) => {
        return await  Score.findById(req.params.id);
    },

    addMulti: async (req)=> {
        return await Score.create(req.body);
    },

    updateMulti: async (req)=> {
        return await  Score.findByIdAndUpdate(req.params.id, req.body);
    },

    delete:async (req)=> {
      return await  Score.findByIdAndRemove(req.params.id, req.body);
    }
}
