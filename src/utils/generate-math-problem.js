const random = require('./random');

module.exports = (termscMin = 2, termscMax = 3, termMin = 1, termMax = 9) => {
    const termsc = random(termscMin, termscMax);
    const terms = new Array(termsc).fill(0).map(() => random(termMin, termMax));
    const operations = new Array(termsc - 1).fill(0)
        .map(() => random(0, 2))
        .map(v => ['+', '-', '*'][v]);
    let expression = '';
    terms.forEach((v, i, a) => expression += `${v}${i == a.length - 1 ? '' : ` ${operations[i]} `}`);
    return { expression, answer: eval(expression) };
};