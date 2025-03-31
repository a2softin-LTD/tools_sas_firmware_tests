import { test, expect } from '@playwright/test';

// Функція, яку ви хочете запустити паралельно
async function runMyFunction(param: string) {
    // Ваш код тут
    console.log(`Виконується функція з параметром: ${param}`);
    // Імітація роботи
    await new Promise(resolve => setTimeout(resolve, 1000));
    return `Результат для ${param}`;
}

test('Запуск функцій паралельно', async () => {
    // Масив параметрів для паралельного запуску
    const params = ['param1', 'param2', 'param3', 'param4'];

    // Запуск функцій паралельно з Promise.all
    const results = await Promise.all(
        params.map(param => runMyFunction(param))
    );

    // Перевірка результатів
    console.log('Всі результати:', results);
    expect(results.length).toBe(params.length);
});