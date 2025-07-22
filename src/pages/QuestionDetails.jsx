// import { useParams } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';

// export default function QuestionDetails() {
//   const { id } = useParams();
//   const [question, setQuestion] = useState(null);
//   const [answerText, setAnswerText] = useState('');
//   const [refresh, setRefresh] = useState(false);

//   useEffect(() => {
//     fetch(`http://localhost:5000/api/questions/${id}`)
//       .then(res => res.json())
//       .then(data => setQuestion(data))
//       .catch(err => console.error('Error fetching question:', err));
//   }, [id, refresh]);

//   const handleAnswerSubmit = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem('token'); // ✅ Get token

//     const res = await fetch(`http://localhost:5000/api/questions/${id}/answers`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`, // ✅ Attach token
//       },
//       body: JSON.stringify({ text: answerText }),
//     });

//     if (res.ok) {
//       setAnswerText('');
//       setRefresh(!refresh);
//     } else {
//       console.error('Failed to post answer(not logged in):', await res.text()); // ✅ Debug output
//       alert('You must be logged in to post an answer');
//     }
//   };

//   if (!question) return <p>Loading...</p>;

// const voteAnswer = async (answerId, type) => {
//   const token = localStorage.getItem('token');

//   const res = await fetch(`http://localhost:5000/api/questions/${id}/answers/${answerId}/vote`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${token}`, // ✅ attach token here
//     },
//     body: JSON.stringify({ voteType: type }),
//   });

//   if (res.ok) {
//     setRefresh(!refresh); // refresh state to get updated votes
//   } else {
//     alert('You must be logged in to vote');
//   }
// };


// const acceptAnswer = async (answerId) => {
//   const res = await fetch(`http://localhost:5000/api/questions/${id}/answers/${answerId}/accept`, {
//     method: 'PUT',
//   });

//   if (res.ok) {
//     setRefresh(!refresh); // refresh state to reflect accepted answer
//   }
// };


//   return (
//     <div>
//       <h2 className="text-2xl font-bold">{question.title}</h2>
//       <p className="text-sm text-gray-600">
//         Asked by <span className="font-semibold">{question.askedBy}</span>
//       </p>


//       <div
//         className="text-gray-700 my-4 prose max-w-full"
//         dangerouslySetInnerHTML={{ __html: question.description }}
//       />

//       <div className="mt-2 space-x-2">
//         {question.tags.map((tag, i) => (
//           <span
//             key={i}
//             className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs"
//           >
//             #{tag}
//           </span>
//         ))}
//       </div>

//       {/* --- Rich Text Editor Answer Form --- */}
//       <div className="mt-8">
//         <h3 className="text-lg font-semibold mb-2">Your Answer</h3>
//         <form onSubmit={handleAnswerSubmit} className="space-y-2">
//           <ReactQuill
//             value={answerText}
//             onChange={setAnswerText}
//             placeholder="Write your answer here..."
//             theme="snow"
//           />
//           <button
//             type="submit"
//             className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//           >
//             Submit Answer
//           </button>
//         </form>
//       </div>

//       {/* --- Answers Display --- */}
//       <div className="mt-8">
//         <h3 className="text-lg font-semibold mb-2">Answers</h3>
//         {question.answers.length === 0 ? (
//           <p className="text-gray-500 italic">No answers yet. Be the first!</p>
//         ) : (
//           <ul className="space-y-4">
//             {[...question.answers]
//   .sort((a, b) => b.isAccepted - a.isAccepted) // ✅ Accepted answers first
//   .map((a, i) => (
//     <li key={i} className="bg-gray-100 p-3 rounded shadow-sm relative">
//       {a.isAccepted && (
//         <span className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 text-xs rounded">
//           Accepted
//         </span>
//       )}

//       <div
//         dangerouslySetInnerHTML={{ __html: a.text }}
//         className="text-gray-800 mb-2"
//       />

//       <div className="flex items-center space-x-2 text-sm">
//         <button
//           onClick={() => voteAnswer(a._id, 'up')}
//           className="bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200"
//         >
//           👍 Upvote
//         </button>
//         <button
//           onClick={() => voteAnswer(a._id, 'down')}
//           className="bg-red-100 text-red-700 px-2 py-1 rounded hover:bg-red-200"
//         >
//           👎 Downvote
//         </button>
//         <span className="text-gray-700 font-medium">Votes: {a.votes}</span>

//         {question.askedBy === JSON.parse(localStorage.getItem('user'))?.username && (
//           <button
//             onClick={() => acceptAnswer(a._id)}
//             className="ml-auto text-green-700 hover:underline"
//           >
//             ✅ Accept Answer
//           </button>
//         )}
//       </div>

//       <p className="text-xs text-gray-500 mt-1">
//         Answered by <span className="font-medium">{a.answeredBy || 'Anonymous'}</span> on{' '}
//         {new Date(a.createdAt).toLocaleString()}
//       </p>
//     </li>
// ))}


//           </ul>
//         )}
//       </div>
//     </div>
//   );
// }


import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function QuestionDetails() {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [answerText, setAnswerText] = useState('');
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    fetch(`${BASE_URL}/questions/${id}`)
      .then(res => res.json())
      .then(data => setQuestion(data))
      .catch(err => console.error('Error fetching question:', err));
  }, [id, refresh]);

  const handleAnswerSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const res = await fetch(`${BASE_URL}/questions/${id}/answers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ text: answerText }),
    });

    if (res.ok) {
      setAnswerText('');
      setRefresh(!refresh);
    } else {
      console.error('Failed to post answer:', await res.text());
      alert('You must be logged in to post an answer');
    }
  };

  const voteAnswer = async (answerId, type) => {
    const token = localStorage.getItem('token');

    const res = await fetch(`${BASE_URL}/questions/${id}/answers/${answerId}/vote`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ voteType: type }),
    });

    if (res.ok) {
      setRefresh(!refresh);
    } else {
      alert('You must be logged in to vote');
    }
  };

  const acceptAnswer = async (answerId) => {
    const res = await fetch(`${BASE_URL}/questions/${id}/answers/${answerId}/accept`, {
      method: 'PUT',
    });

    if (res.ok) {
      setRefresh(!refresh);
    }
  };

  if (!question) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold">{question.title}</h2>
      <p className="text-sm text-gray-600">
        Asked by <span className="font-semibold">{question.askedBy}</span>
      </p>

      <div
        className="text-gray-700 my-4 prose max-w-full"
        dangerouslySetInnerHTML={{ __html: question.description }}
      />

      <div className="mt-2 space-x-2">
        {question.tags.map((tag, i) => (
          <span
            key={i}
            className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* --- Rich Text Editor Answer Form --- */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">Your Answer</h3>
        <form onSubmit={handleAnswerSubmit} className="space-y-2">
          <ReactQuill
            value={answerText}
            onChange={setAnswerText}
            placeholder="Write your answer here..."
            theme="snow"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Submit Answer
          </button>
        </form>
      </div>

      {/* --- Answers Display --- */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">Answers</h3>
        {question.answers.length === 0 ? (
          <p className="text-gray-500 italic">No answers yet. Be the first!</p>
        ) : (
          <ul className="space-y-4">
            {[...question.answers]
              .sort((a, b) => b.isAccepted - a.isAccepted)
              .map((a, i) => (
                <li key={i} className="bg-gray-100 p-3 rounded shadow-sm relative">
                  {a.isAccepted && (
                    <span className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 text-xs rounded">
                      Accepted
                    </span>
                  )}

                  <div
                    dangerouslySetInnerHTML={{ __html: a.text }}
                    className="text-gray-800 mb-2"
                  />

                  <div className="flex items-center space-x-2 text-sm">
                    <button
                      onClick={() => voteAnswer(a._id, 'up')}
                      className="bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200"
                    >
                      👍 Upvote
                    </button>
                    <button
                      onClick={() => voteAnswer(a._id, 'down')}
                      className="bg-red-100 text-red-700 px-2 py-1 rounded hover:bg-red-200"
                    >
                      👎 Downvote
                    </button>
                    <span className="text-gray-700 font-medium">Votes: {a.votes}</span>

                    {question.askedBy === JSON.parse(localStorage.getItem('user'))?.username && (
                      <button
                        onClick={() => acceptAnswer(a._id)}
                        className="ml-auto text-green-700 hover:underline"
                      >
                        ✅ Accept Answer
                      </button>
                    )}
                  </div>

                  <p className="text-xs text-gray-500 mt-1">
                    Answered by <span className="font-medium">{a.answeredBy || 'Anonymous'}</span> on{' '}
                    {new Date(a.createdAt).toLocaleString()}
                  </p>
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
}
