// Azerbaijan
import photo1 from "~/assets/images/azerbaijan/slide-1.webp";
import photo2 from "~/assets/images/azerbaijan/slide-2.webp";
import photo3 from "~/assets/images/azerbaijan/slide-3.webp";
import photo4 from "~/assets/images/azerbaijan/slide-4.webp";
import photo5 from "~/assets/images/azerbaijan/slide-5.webp";
import photo6 from "~/assets/images/azerbaijan/slide-6.webp";
import photo7 from "~/assets/images/azerbaijan/slide-7.webp";
import photo8 from "~/assets/images/azerbaijan/slide-8.webp";

// Cyprus


import {Countries} from "~/shared/types";

interface Photo {
    alt: string;
    src: string;
}


type PhotosLibrary = {
    [key in Countries]: Photo[];
}



const photosLibrary: PhotosLibrary = {
    azerbaijan: [
        {
            alt: 'photo-3',
            src: photo3.src,
        },
        {
            alt: 'photo-1',
            src: photo1.src,
        },
        {
            alt: 'photo-2',
            src: photo2.src,
        },
        {
            alt: 'photo-4',
            src: photo4.src,
        },
        {
            alt: 'photo-5',
            src: photo5.src,
        },
        {
            alt: 'photo-6',
            src: photo6.src,
        },
        {
            alt: 'photo-7',
            src: photo7.src,
        },
        {
            alt: 'photo-8',
            src: photo8.src,
        },
    ],
    cyprus: []
}


export { photosLibrary };
