import logger from "../config/logger.config";
import Hotel from "../db/models/hotel";
import { createHotelDTO, updatedHotelDto } from "../dto/hotel.dto";
import { NotFoundError } from "../utils/errors/app.error";

export async function createHotel(hotelData: createHotelDTO) {
    const hotel = await Hotel.create({
        name: hotelData.name,
        address: hotelData.address,
        location: hotelData.location,
        rating: hotelData.rating,
        ratingCount: hotelData.ratingCount,
    });

    logger.info(`Hotel created: ${hotel.id}`);

    return hotel;
}

export async function getHotelById(id: number) {
    const hotel = await Hotel.findByPk(id);

    if (!hotel) {
        logger.error(`Hotel not found: ${id}`);
        throw new NotFoundError(`Hotel with id ${id} not found`);
    }

    logger.info(`Hotel found: ${hotel.id}`);

    return hotel;
}

export async function getAllHotels() {
    const hotels = await Hotel.findAll({
        where: {
            isActive: true
        }
    });

    if(!hotels) {
        logger.error(`No hotels found`);
        throw new NotFoundError(`No hotels found`);
    }

    logger.info(`Hotels found: ${hotels.length}`);
    return hotels;
}


export async function deleteHotelById(id: number) {
    const hotel = await Hotel.findByPk(id);

    if (!hotel) {
        logger.error(`Hotel not found: ${id}`);
        throw new NotFoundError(`Hotel with id ${id} not found`);
    }

    hotel.isActive = false;

    await hotel.save();

    logger.info(`Hotel deleted: ${hotel.id}`);

    return hotel;
}


export async function updateHotelById(id: number, hotelData: updatedHotelDto) {
    const hotel = await Hotel.findByPk(id);

    if (!hotel) {
        logger.error(`Hotel not found: ID ${id}`);
        throw new NotFoundError(`Hotel not found: ID ${id}`);
    }

    await hotel.update(hotelData);

    logger.info(`Hotel updated:ID ${hotel.id}`);
    return hotel;
}