//Liabraries
import express from 'express'
//Database Model
import { FoodModel } from '../../database/allModels';

//Validation
import { Validatecategory, ValidateRestaurantId } from '../../validation/common'

const Router = express.Router();

/**
 * Router     /:_id
 * Des        get all foods based of particualr restaurants
 * Params     none
 * Access     Public
 * Method     Post
 */
Router.get("/:_id", async (req, res) => {

    try {
        const { _id } = req.params
        const foods = await FoodModel.findById(_id);
        return res.json({ foods });
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})


/**
 * Router     /r -> restaurant
 * Des        get all foods based of particualr restaurants
 * Params     none
 * Access     Public
 * Method     Post
 */
Router.get("/r/:id", async (req, res) => {
    try {
        await ValidateRestaurantId(req.params)
        const { _id } = req.params;
        const foods = await FoodModel.find({ restaurant: _id })

        return res.json(foods)

    } catch (error) {
        return res.status(500).json({ error: error.message })

    }
})

/**
 * Router     /c -> category
 * Des        get all foods based of particualr category
 * Params     none
 * Access     Public
 * Method     Post
 */

Router.get("/c/:category", async (req, res) => {
    try {
        await Validatecategory(req.params);
        const { category } = req.params;
        const foods = await FoodModel.find({
            category: { $regex: category, $options: "i" }
        })

        if (!foods) return res.status(404).json({ error: `No Food found with ${category}` })

        return res.json({ foods })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})

export default Router;