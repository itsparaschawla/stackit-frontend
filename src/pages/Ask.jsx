// import { useState } from 'react';
// import ReactQuill from 'react-quill';
// import { useAuth } from '../context/useAuth';

// export default function Ask() {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [tags, setTags] = useState('');
//   const { token } = useAuth();


//   const handleSubmit = async (e) => {
//   e.preventDefault();
//   const tagList = tags.split(',').map(tag => tag.trim());
//   const user = JSON.parse(localStorage.getItem('user'));

//   const questionData = {
//     title,
//     description,
//     tags: tagList,
//     askedBy: user?.username || 'Anonymous', // ✅ include this
//   };

//   try {
//     const res = await fetch('http://localhost:5000/api/questions', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`, // ✅ Add this line
//       },
//       body: JSON.stringify(questionData),
//     });

//     if (!res.ok) throw new Error('Failed to submit question');
    
//     const data = await res.json();
//     console.log('✅ Question saved:', data);

//     // Optional: Reset form after submission
//     setTitle('');
//     setDescription('');
//     setTags('');
//     alert('Question submitted successfully!');
//   } catch (error) {
//     console.error('❌ Submission error:', error);
//     alert('Failed to submit. Check console for details.');
//   }
// };


//   return (
//     <div>
//       <h2 className="text-xl font-semibold mb-4">Ask a New Question</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* Title */}
//         <div>
//           <label className="block mb-1 font-medium">Title</label>
//           <input
//             type="text"
//             className="w-full border px-3 py-2 rounded"
//             placeholder="Enter your question title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />
//         </div>

//         {/* Description */}
//         <div>
//           <label className="block mb-1 font-medium">Description</label>
//           <ReactQuill
//             theme="snow"
//             value={description}
//             onChange={setDescription}
//             placeholder="Describe your question in detail..."
//           />
//         </div>

//         {/* Tags */}
//         <div>
//           <label className="block mb-1 font-medium">Tags (comma separated)</label>
//           <input
//             type="text"
//             className="w-full border px-3 py-2 rounded"
//             placeholder="e.g. React, JWT, MongoDB"
//             value={tags}
//             onChange={(e) => setTags(e.target.value)}
//             required
//           />
//         </div>

//         {/* Submit */}
//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           Post Question
//         </button>
//       </form>
//     </div>
//   );
// }


import { useState } from 'react';
import ReactQuill from 'react-quill';
import { useAuth } from '../context/useAuth';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Ask() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const { token } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tagList = tags.split(',').map(tag => tag.trim());
    const user = JSON.parse(localStorage.getItem('user'));

    const questionData = {
      title,
      description,
      tags: tagList,
      askedBy: user?.username || 'Anonymous',
    };

    try {
      const res = await fetch(`${BASE_URL}/questions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(questionData),
      });

      if (!res.ok) throw new Error('Failed to submit question');

      const data = await res.json();
      console.log('✅ Question saved:', data);

      setTitle('');
      setDescription('');
      setTags('');
      alert('Question submitted successfully!');
    } catch (error) {
      console.error('❌ Submission error:', error);
      alert('Failed to submit. Check console for details.');
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Ask a New Question</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter your question title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <ReactQuill
            theme="snow"
            value={description}
            onChange={setDescription}
            placeholder="Describe your question in detail..."
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block mb-1 font-medium">Tags (comma separated)</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            placeholder="e.g. React, JWT, MongoDB"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Post Question
        </button>
      </form>
    </div>
  );
}
