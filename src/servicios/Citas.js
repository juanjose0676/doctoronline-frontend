const Citas = require("../models/Citas");


const listarCitas = async (req, res) => {
    try {
        const citas = await Citas.find();
        res.json(citas);
    } catch (error) {
        res.send(error);
    }

}

const guardarCitas = async (req, res) => {
    try {
        const nuevaCitas = Citas(req.body);
        const resultadoCitas = await nuevaCitas.save();
        res.json(resultadoCitas);
    } catch (error) {
        res.send({message: error._message});
    }
}

const consultarCitas = async (req, res) => {
    const citas = await Citas.find({_id: req.params.id});

}

const eliminarCitas = async (req, res) => {
    const citas = await Citas.findOneAndDelete({_id: req.params.id});

    
}

const actualizarCitas = async (req, res) => {
    const citas = await Citas.findOneAndUpdate({_id: req.params.id}, req.body)
}

module.exports = {
    listarCitas,
    guardarCitas,
    consultarCitas,
    eliminarCitas,
    actualizarCitas
}
