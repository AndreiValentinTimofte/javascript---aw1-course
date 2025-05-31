"use sctrict";

import dayjs from "dayjs";

function Answer(text, username, date, score=0){
    this.text = text;
    this.username = username;
    this.score = score;
    this.date = dayjs(date);


    this.toString = () => {
        return `\n${this.username} replied ${this.text} on ${this.date.format('YYYY-MM-DD')}
        and got a score of ${this.score}`;
    }
}



function Question(text, username, date){
    this.text = text;
    this.username = username;
    this.date = dayjs(date);
    this.answers = [];


    this.add = (answer) => {
        this.answers.push(answer);
    }
    
    this.find = (username) => {
        // const found_answers = [];
        // for(const ans of this.answers) {
        //     if (ans.username === username)
        //         found_answers.push(ans);
        // }
        // return found_answers;

        return this.answers.filter(ans => ans.username === username);
    }

    this.after_date = (date) => {

        return this.answers.filter(ans => ans.date.isAfter(dayjs(date)));
    }

    this.list_by_date = () => {
        return [...this.answers].sort((a,b) => (a.date.isAfter(b.date)) ? 1 : -1 ); // operatore di spread
        
    }
    this.list_by_score = () => {
        return [...this.answers].sort((a,b) => b.score - a.score);
    }
}

const question = new Question(
    'Is javaScript better than python?',
    'valentin',
    '2025-02-28',
    1
);
const firt_answer = new Answer(
    'yes',
    'stefanoz',
    '2025-03-03',
    -10
);
const second_answer = new Answer(
    'No',
    'guidovanrossum',
    '2025-03-03',
    5
);
const thrid_answer = new Answer(
    'No',
    'allessiog',
    '2025-03-03',
    
);
const fourth_answer = new Answer(
    'No i don\'t know',
    'stefanoz',
    '2025-06-04',
    
);

question.add(firt_answer);
question.add(second_answer);
question.add(thrid_answer);
question.add(fourth_answer);

const answer_by_stefano = question.find("stefanoz");

console.log(question);
console.log("\nAnswer by Stefano:" + answer_by_stefano);

console.log("\nBy score:" +question.list_by_score());
