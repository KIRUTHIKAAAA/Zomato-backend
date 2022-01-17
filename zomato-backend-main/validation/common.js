import joi from 'joi'

export const ValidateRestaurantId = (id) => {
    const schema = joi.object(
        {
            _id: joi.string().required(),
        }
    )
    return schema.validateAsync(id);

}

export const Validatecategory = (category) => {
    const schema = joi.object(
        {
            category: joi.string().required()
        }
    )
    return schema.validateAsync(category);

}

