import axios from "axios";

const PIXABAY_API_KEY = "31318291-9a8be1d683ef762d4988421c4";

export class PixabayAPI {
    constructor() {
        this.query = "";
        this.page = 1;
        this.shownPhotos = 0;
        this.totalHits = 0;
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
                page: this.page,
                per_page: 12,
            },
        });

        const photos = response.data.hits;
        this.shownPhotos = this.shownPhotos + photos.length;
        this.totalHits = response.data.totalHits;

        if (photos.length === 0) {
            throw new Error("Sorry, there are no images matching your search query. Please try again.");
        };
        if (this.shownPhotos >= this.totalHits) {
            throw new Error("We're sorry, but you've reached the end of search results.");
        }; 
        return photos; 
    }

    increasePage() { 
        this.page += 1;
    }

    resetPage() { 
        this.page = 1;
    }
}