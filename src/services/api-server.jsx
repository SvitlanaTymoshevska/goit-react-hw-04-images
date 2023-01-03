import axios from "axios";

const PIXABAY_API_KEY = "31318291-9a8be1d683ef762d4988421c4";

export async function getPhotosFromApi(query, page) {
    let shownPhotos = 0;
    let totalHits = 0;

    const response = await axios({
        url: "https://pixabay.com/api/",
        params: {
            key: PIXABAY_API_KEY,
            q: query,
            image_type: "photo",
            orientation: "horizontal",
            safesearch: true,
            page: page,
            per_page: 12,
        },
    });
    const photos = response.data.hits;

    if (photos.length === 0) {
        throw new Error("Sorry, there are no images matching your search query. Please try again.");
    };

    totalHits = response.data.totalHits;
    shownPhotos = shownPhotos + photos.length;

    const notLoadMore = shownPhotos >= totalHits;
    
    return {photos, notLoadMore}; 
}