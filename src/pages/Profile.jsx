// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';

// export default function Profile() {
//   const { username } = useParams();
//   const [questions, setQuestions] = useState([]);
//   const [answers, setAnswers] = useState([]);

//   useEffect(() => {
//     fetch(`http://localhost:5000/api/questions/user/${username}`)
//       .then(res => res.json())
//       .then(data => {
//         setQuestions(data.questions);
//         setAnswers(data.answered);
//       })
//       .catch(err => console.error('Error fetching profile:', err));
//   }, [username]);

//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-4">@{username}'s Profile</h2>

//       <div className="mb-6">
//         <h3 className="text-lg font-semibold">Questions Asked</h3>
//         {questions.length === 0 ? (
//           <p>No questions posted yet.</p>
//         ) : (
//           <ul className="space-y-3">
//             {questions.map((q) => (
//               <li key={q._id} className="p-3 bg-white shadow rounded">
//                 <strong>{q.title}</strong>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>

//       <div>
//         <h3 className="text-lg font-semibold">Answers Given</h3>
//         {answers.length === 0 ? (
//           <p>No answers given yet.</p>
//         ) : (
//           <ul className="space-y-3">
//             {answers.map((q) =>
//               q.answers
//                 .filter(a => a.answeredBy === username)
//                 .map((a, i) => (
//                   <li key={i} className="p-3 bg-gray-100 rounded">
//                     Answered on: <strong>{q.title}</strong>
//                     <div dangerouslySetInnerHTML={{ __html: a.text }} />
//                   </li>
//                 ))
//             )}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// ✅ Import BASE_URL from Vite environment variable
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Profile() {
  const { username } = useParams();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/questions/user/${username}`)
      .then(res => res.json())
      .then(data => {
        setQuestions(data.questions);
        setAnswers(data.answered);
      })
      .catch(err => console.error('Error fetching profile:', err));
  }, [username]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">@{username}'s Profile</h2>

      <div className="mb-6">
        <h3 className="text-lg font-semibold">Questions Asked</h3>
        {questions.length === 0 ? (
          <p>No questions posted yet.</p>
        ) : (
          <ul className="space-y-3">
            {questions.map((q) => (
              <li key={q._id} className="p-3 bg-white shadow rounded">
                <strong>{q.title}</strong>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <h3 className="text-lg font-semibold">Answers Given</h3>
        {answers.length === 0 ? (
          <p>No answers given yet.</p>
        ) : (
          <ul className="space-y-3">
            {answers.map((q) =>
              q.answers
                .filter(a => a.answeredBy === username)
                .map((a, i) => (
                  <li key={i} className="p-3 bg-gray-100 rounded">
                    Answered on: <strong>{q.title}</strong>
                    <div dangerouslySetInnerHTML={{ __html: a.text }} />
                  </li>
                ))
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
