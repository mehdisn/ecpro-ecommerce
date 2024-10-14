const CategoryDto = require('./categories.dto');

exports.buildHome = (categories) => {
    return {
        categories: categories.map(tag => CategoryDto.buildDto(tag, true)),
    };
};