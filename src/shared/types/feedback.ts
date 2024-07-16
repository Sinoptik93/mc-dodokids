export interface Feedback {
    rating: 1 | 2 | 3 | 4 | 5;
    userName: string;
    date: Date | null;
    feedbackText: string;
}
