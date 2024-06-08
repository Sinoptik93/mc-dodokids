export interface SlideFeedbackProps {
    rating: 1 | 2 | 3 | 4 | 5;
    userName: string;
    date: Date;
    feedbackText: string;
}

export interface SliderFeedbackProps {
    feedbackList: SlideFeedbackProps[];
}
