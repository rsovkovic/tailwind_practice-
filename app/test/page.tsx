'use client';
// import { useEffect, useState } from 'react';

// // 1. Описуємо, як виглядає книга (для TypeScript)
// interface Book {
//   _id: string;
//   title: string;
//   author: string;
// }

// export default function TestFetch() {
//   const [books, setBooks] = useState<Book[]>([]);

//   useEffect(() => {
//     const getData = async () => {
//       // Твій токен, який ти мені скинув
//       const token =
//         'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YjE2NmI4ZWIyZmE0NzQ5YzQ3YTFmOSIsImlhdCI6MTc3MDk5MzM4NywiZXhwIjoxNzcwOTk2OTg3fQ.EMH7VyGOt1gmWti7z384xhlSFXx62jgZNWiiS3zJtM8';

//       const response = await fetch(
//         'https://readjourney.b.goit.study/api/books/own',
//         {
//           method: 'GET',
//           headers: {
//             Authorization: `Bearer ${token}`, // Ось тут ми використовуємо твій токен
//             'Content-Type': 'application/json',
//           },
//         },
//       );

//       const data = await response.json();
//       console.log('Ось що прислав бекенд:', data);

//       // Якщо на бекенді вже є книги, записуємо їх у стейт
//       if (Array.isArray(data)) {
//         setBooks(data);
//       }
//     };

//     getData();
//   }, []);

//   return (
//     <div style={{ padding: '40px' }}>
//       <h1>Перевірка зв'язку з бекендом</h1>
//       {books.length > 0 ? (
//         <ul>
//           {books.map((book) => (
//             <li key={book._id}>
//               {book.title} — {book.author}
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>
//           Дані прийшли, але список книг порожній. Треба додати книгу через
//           Swagger!
//         </p>
//       )}
//     </div>
//   );
// }
