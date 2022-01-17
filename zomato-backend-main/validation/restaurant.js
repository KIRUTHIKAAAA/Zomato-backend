import joi from 'joi'

export const ValidateRestaurantCity = (restaurantObject) => {
    const schema = joi.object(
        {
            city: joi.string().required()

        }
    )

    return schema.validateAsync(restaurantObject)

}

export const ValidateRestaurantSearchString = (restaurantObject) => {
    const schema = joi.object(
        {
            searchString: joi.string().required()

        }
    )

    return schema.validateAsync(restaurantObject);

}