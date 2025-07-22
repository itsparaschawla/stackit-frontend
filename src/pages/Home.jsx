// import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';

// export default function Home() {
//   const [questions, setQuestions] = useState([]);

//   useEffect(() => {
//     fetch('http://localhost:5000/api/questions')
//       .then(res => res.json())
//       .then(data => setQuestions(data))
//       .catch(err => console.error('Error fetching questions:', err));
//   }, []);

//   return (
//     <div>
//   <h2 className="text-xl font-semibold mb-4">All Questions</h2>
//   {questions.length === 0 ? (
//     <p>No questions found.</p>
//   ) : (
//     <div className="space-y-4">
//       {questions.map((q) => (
//         <Link to={`/questions/${q._id}`} key={q._id}>
//           <div className="p-4 bg-white rounded shadow hover:shadow-lg transition">
//             <h3 className="text-lg font-semibold">{q.title}</h3>
//                 <p className="text-xs text-gray-500 mt-1">
//                 Asked by <span className="font-semibold">{q.askedBy}</span>
//                 </p>
//             <div
//               className="text-gray-700 mt-2 line-clamp-3"
//               dangerouslySetInnerHTML={{ __html: q.description }}
//             />
//             <div className="mt-2 text-sm text-blue-500 space-x-2">
//               {q.tags.map((tag, i) => (
//                 <span
//                   key={i}
//                   className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs"
//                 >
//                   #{tag}
//                 </span>
//               ))}
//             </div>
//           </div>
//         </Link>
//       ))}
//     </div>
//   )}
// </div>

//   );
// }


import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Home() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/questions`)
      .then(res => res.json())
      .then(data => setQuestions(data))
      .catch(err => console.error('Error fetching questions:', err));
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">All Questions</h2>
      {questions.length === 0 ? (
        <p>No questions found.</p>
      ) : (
        <div className="space-y-4">
          {questions.map((q) => (
            <Link to={`/questions/${q._id}`} key={q._id}>
              <div className="p-4 bg-white rounded shadow hover:shadow-lg transition">
                <h3 className="text-lg font-semibold">{q.title}</h3>
                <p className="text-xs text-gray-500 mt-1">
                  Asked by <span className="font-semibold">{q.askedBy}</span>
                </p>
                <div
                  className="text-gray-700 mt-2 line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: q.description }}
                />
                <div className="mt-2 text-sm text-blue-500 space-x-2">
                  {q.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
