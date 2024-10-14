const PageMetaDto = require("./page_meta.dto");
const CategoryDto = require("./categories.dto");

function buildPagedList(products, page, pageSize, totalResourcesCount, basePath) {
    return {
        success: true,
        page_meta: PageMetaDto.build(products.length, page, pageSize, totalResourcesCount, basePath),
        ...buildDtos(products),
        //products: products.map(product => product.getJsonSummary())
    }
}

function buildDtos(products) {
    return {
        products: products.map(product => buildDto(product))
    };
}

function buildDto(product) {
    return {
        id: product.id,
        name: product.name,
        price: product.price,
        image_urls: product.images ? product.images.map(image => image.filePath) : [],
        created_at: product.createdAt,
        updated_at: product.updatedAt,
        ...TagDto.buildDtos(product.tags),
        ...CategoryDto.buildDtos(product.categories),
        comments_count: product.comments ? product.comments.length : product.comments_count || 0,
    };
}

function buildOnlyForId(product) {
    return {success: true, id: product.id};
}

function buildIdImageNameAndPrice(product) {
    if (product == null)
        return {};
    return {
        id: product.id,
        name: product.name,
        price: parseInt(product.price),
        image_urls: product.images ? product.images.map(image => image.filePath) : []
    };
}

module.exports = {
    buildPagedList, buildDtos, buildDto, buildOnlyForId, buildIdImageNameAndPrice
};