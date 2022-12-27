import axios from "axios";

const PIXABAY_API_KEY = "31318291-9a8be1d683ef762d4988421c4";

export class PixabayAPI {
    constructor() {
        this.query = "";
    };
    
    async getPhotos() {
        const response = await axios({
            url: "https://pixabay.com/api/",
            params: {
                key: PIXABAY_API_KEY,
                q: this.query,
                image_type: "photo",
                orientation: "horizontal",
                safesearch: true,
                page: 1,
                per_page: 12,
            },
        });

        const photos = response.data.hits;
        return photos;
    }
}