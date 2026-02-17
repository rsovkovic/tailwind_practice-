'use client';
import { useEffect, useState } from 'react';
import { usersCurrent } from '@/app/api/auth'; // ПЕРЕВІРТЕ ШЛЯХ ДО ФАЙЛУ

export default function TestPage() {
  const [result, setResult] = useState('Завантаження...');

  useEffect(() => {
    // Викликаємо вашу функцію відразу при завантаженні
    usersCurrent()
      .then((data) => {
        console.log('Дані отримано:', data);
        setResult(JSON.stringify(data, null, 2)); // Виведемо дані текстом на екран
      })
      .catch((err) => {
        console.error('Помилка:', err);
        setResult('Помилка: ' + err.message);
      });
  }, []);

  return (
    <div>
      <h1>Результат перевірки API:</h1>
      {/* pre збереже форматування JSON, щоб було зручно читати */}
      <pre>{result}</pre>
    </div>
  );
}
