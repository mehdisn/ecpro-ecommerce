const PageMetaDto = require('./page_meta.dto');

function buildPagedList(tags, page, pageSize, totalProductsCount, basePath) {
    return {
        success: true,
        page_meta: PageMetaDto.build(tags.length, page, pageSize, totalProductsCount, basePath),
        ...buildDtos(tags),
    }
}

function buildDtos(categories) {
    if (!categories)
        return {categories: []};
    return {
        categories: categories.map(category => buildDto(category))
    }
}

function buildDto(category) {
    const summary = {
        id: category.id,
        name: category.name,
    };

    if (category.pictureUrl) {
        // replace all back slashes with forward slashes
        summary.image_url = category.pictureUrl;
    }
    return summary;
}

module.exports = {
    buildDtos, buildPagedList, buildDto
};