//Libraries
import express from 'express'
import passport from 'passport'
//Database Model
import { ReviewsModel } from '../../database/allModels'

const Router = express.Router();

/**
 * Router     /:resid
 * Des        Getting all reviews for a particular restaurant
 * Params     resid
 * Access     Public
 * Method     get
 */

Router.get("/:resid", async (req, res) => {
    try {
        const { resid } = req.params;
        const reviews = await ReviewsModel.find({ restaurant: resid })

        return res.json({ reviews })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})

/**
 * Router     /new
 * Des        POST: adding new food/restaurant review and rating
 * Params     none
 * Access     private
 * Method     post
 */

Router.post("/new", passport.authenticate('jwt'), async (req, res) => {

    try {
        const { _id } = req.session.passport.user._doc;

        const { reviewData } = req.body;
        await ReviewsModel.create({ ...reviewData, user: _id })

        return res.json({ reviews: "Successfully created reviews" })
    } catch (error) {


    }
})


/**
 * Router     /delete
 * Des        Delete a specefic review
 * Params     _id
 * Access     Public
 * Method     delete
 */

Router.delete("/delete/:_id", async (req, res) => {
    try {
        const { _id } = req.params;
        await ReviewsModel.findByIdAndDelete(_id)
        return res.json({ review: "Successfully deleted the review." })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})


export default Router