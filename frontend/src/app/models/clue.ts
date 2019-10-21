export class Clue {
    answer: string;
    question: string;
    value: number;
    airdate: string;
    category: {
        id: number,
        title: string,
        clues_count: number
    };
}

