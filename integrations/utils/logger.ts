import kleur from "kleur";

/**
 * Ведение логов Astro интеграции.
 */
export class Logger {
    /**
     * Получает текущую дату и время в формате 'HH:MM:SS'.
     *
     * @returns {string} Строка, представляющая текущее время.
     * @example
     * const logger = new Logger();
     * console.log(logger.getDate()); // "14:35:29"
     */
    private getDate(): string {
        const dateTimeFormat = new Intl.DateTimeFormat(['ru-RU'], {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        });
        return dateTimeFormat.format(new Date());
    }

    /**
     * Логирует сообщение с текущей датой и временем.
     *
     * @param {string} [text] - Текст сообщения для логирования.
     * @example
     * const logger = new Logger();
     * logger.withDate('Привет, мир!'); // "14:35:29 Привет, мир!"
     */
    public withDate(text?: string): void {
        console.log(`${kleur.dim(this.getDate())}${text ? ` ${text}` : ''}`);
    }

    /**
     * Логирует заголовок с зелёным фоном.
     *
     * @param {string} text - Текст заголовка.
     * @example
     * const logger = new Logger();
     * logger.heading('Заголовок'); // Выводит заголовок с зелёным фоном
     */
    public heading(text: string): void {
        console.log(`\n${kleur.bgGreen().black(` ${text} `)}`);
    }
}

/**
 * Логирование в Astro hook.
 */
const logger = new Logger();

export default logger;
