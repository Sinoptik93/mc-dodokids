import {Feedback, LocalesList} from "~/shared/types";

// REFCTOR: https://github.com/colinhacks/zod?tab=readme-ov-file#native-enums
type FeedbackLibrary = {
    [K in keyof LocalesList]: Record<LocalesList[K], Feedback[]>;
}



const feedbackLibrary: FeedbackLibrary = {
    azerbaijan: {
        az: [
            {
                userName: 'Dilşad',
                rating: 5,
                date: null,
                feedbackText: 'Dodo Pizza uşaqlara möhtəşəm hisslər və təcrübə bəxş etdi. İndi mənim övladlarım Dodo Pizzada işləmək istəyirlər)).',
            },
            {
                userName: 'Samira',
                rating: 5,
                date: null,
                feedbackText: 'Master-klas super idi. Hər şey düşünülmüş və anlaşılandı. Oğlum çox sevdi Dodonu. Mütləq bura qayıdacağıq. Təşəkkürlər, Dodo!',
            },
            {
                userName: 'Banu',
                rating: 5,
                date: null,
                feedbackText: 'Master-klasa qrup şəklində gəlmişdik. Dodoquşu bizə hədiyyə və dondurma verdi. Pizza hazırlamağı çox sevdik. Dodo Pizza ən dadlı pizzadır.',
            },
            {
                userName: 'Mehriban',
                rating: 5,
                date: null,
                feedbackText: 'Olduqca maraqlı və faydalı tədbir idi. Uşaqlar razı qaldılar. Qızım pizzameyker olmaq istəyir. Dodo – insan simalı şirkətdir. Yaxşı ki, varsınız. Sizi Gəncədə gözləyəcəyik.',
            },
        ],
        ru: [
            {
                userName: 'Наджиба',
                rating: 5,
                date: null,
                feedbackText: 'Были на мастер классах. Дети в восторге от Додо. Спасибо персоналу за профессионализм и отзывчивость. Теперь в нашей семье все знают, чем пепперони отличается от чоризо и какая температура в пицца-печи.',
            },
            {
                userName: 'Владислава',
                rating: 5,
                date: null,
                feedbackText: 'Детям очень понравилась атмосфера в пиццерии. А пицца была изумительная. Дети были горды собой. Спасибо Додо Пицце за подаренные эмоции.',
            },
            {
                userName: 'Самира',
                rating: 5,
                date: null,
                feedbackText: 'Мастер-класс был супер. Все было продумано и понятно. Мой сын очень полюбил Додо. Обязательно вернемся сюда. Спасибо, Додо!',
            },
            {
                userName: 'Мехрибан',
                rating: 5,
                date: null,
                feedbackText: 'Это было очень интересное и полезное мероприятие. Дети остались довольны. Моя дочь хочет стать пиццамейкером. Мы рады, что вы есть!',
            },
        ]
    },
    cyprus: {
        ru: [],
        en: [],
    }
}


export { feedbackLibrary };
