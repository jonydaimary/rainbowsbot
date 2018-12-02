module.exports = class MessageFormatter {
    constructor(text = '') {
        this.text = text;
    }

    append(text) {
        this.text += text;
        return this;
    }

    line(text) {
        this.text += `${text}\n`;
    }

    code(textOrLanguage, maybeText) {
        const language = maybeText ? textOrLanguage : undefined;
        const text = maybeText ? maybeText : textOrLanguage;
        this.append(`\`\`\`${language ? `${language}\n` : ''}${text}\`\`\``);
        return this;
    }

    toCode(language) {
        return `\`\`\`${language ? `${language}\n` : ''}${this.text}\`\`\``;
    }

    toString() {
        return this.text;
    }
};