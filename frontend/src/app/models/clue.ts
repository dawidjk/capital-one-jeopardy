export class Clue {
    answer: string;
    question: string;
    value: number;
    airdate: string;
    // tslint:disable-next-line: variable-name
    invalid_count: number;
    category: {
        id: number,
        title: string,
        clues_count: number
    };
}

