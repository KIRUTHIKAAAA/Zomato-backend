//Libraries
import express from 'express'

//data from database
import { MenuModel, ImageModel } from '../../database/allModels'

const Router = express.Router();

/**
 * Route    /list
 * Des      Get All list menu based on restaurant Id
 * Params   _id
 * Access   public
 * MEthod   get
*/


Router.get("/list/:_id", async (req, res) => {
    try {
        const { _id } = req.params;
        const menus = await MenuModel.findById(_id);

        if (!menus) return res.status(404).json({ message: "No menu present for this restaurant" })


        return res.json({ menus })

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})

/**
 * Route    /image
 * Des      Get All list menu images with restaurant id
 * Params   _id
 * Access   public
 * MEthod   get
*/
Router.get("/image/:_id", async (req, res) => {

    try {
        const { _id } = req.params;
        const menuImages = await ImageModel.findOne(_id)

        if (!menuImages) return res.status(404).json({ error: "No menuImage present for this restaurant" })

        return res.json({ menuImages })
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
})

export default Router;