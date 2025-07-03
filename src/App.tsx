import React, { useState, useEffect, useMemo } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

// Define TypeScript interfaces for Post and ContentType
interface Post {
  id: string;
  postTitle: string;
  postSubTitle?: string;
  postBody: string;
  postPublishDate: string; // ISO string format for FullCalendar
  postStatus: 'Draft' | 'Published';
  contentType: 'Blog Post' | 'Instagram Post' | 'Facebook Post';
  postImage?: string; // URL to image
  postCategory?: string; // For Blog Posts
}

// Mock Post Data (Task 3.3) - This will now be managed by HomePage state
const initialMockPosts: Post[] = [
  {
    id: '1',
    postTitle: 'Summer Adventures in the Pyrenees: Hiking & Views',
    postSubTitle: 'Exploring the stunning landscapes of Northern Spain.',
    postBody: 'A detailed blog post about hiking trails, local flora and fauna, and breathtaking viewpoints in the Pyrenees mountains. Includes tips for first-time hikers and photography spots.',
    postPublishDate: '2025-07-05T10:00:00Z',
    postStatus: 'Published',
    contentType: 'Blog Post',
    postImage: 'https://placehold.co/600x400/FF5733/FFFFFF?text=Pyrenees+Blog',
    postCategory: 'salvaje y libre'
  },
  {
    id: '2',
    postTitle: 'New Recipe Alert: Mediterranean Quinoa Bowl!',
    postSubTitle: 'Healthy and delicious.',
    postBody: 'Quick and easy Mediterranean quinoa bowl recipe with fresh vegetables, feta, and a lemon-herb dressing. Perfect for a light summer meal.',
    postPublishDate: '2025-07-10T14:30:00Z',
    postStatus: 'Draft',
    contentType: 'Instagram Post',
    postImage: 'https://placehold.co/600x600/33FF57/FFFFFF?text=Quinoa+Bowl',
  },
  {
    id: '3',
    postTitle: 'Flash Sale! Get 20% off all handmade jewelry this week!',
    postSubTitle: 'Limited time offer!',
    postBody: 'Don\'t miss out on our exclusive summer sale! All handcrafted jewelry is 20% off for a limited time. Shop now and find your perfect piece.',
    postPublishDate: '2025-07-15T09:00:00Z',
    postStatus: 'Published',
    contentType: 'Facebook Post',
    postImage: 'https://placehold.co/800x450/3357FF/FFFFFF?text=Jewelry+Sale',
  },
  {
    id: '4',
    postTitle: 'Behind the Scenes: Our Latest Photo Shoot',
    postSubTitle: 'Sneak peek at upcoming collections.',
    postBody: 'A glimpse into the creative process behind our latest product photography. Get ready for some exciting new arrivals!',
    postPublishDate: '2025-07-20T11:00:00Z',
    postStatus: 'Draft',
    contentType: 'Blog Post',
    postImage: 'https://placehold.co/600x400/FF33A1/FFFFFF?text=Photoshoot+Blog',
    postCategory: 'reflexiónes sobre la vida'
  },
  {
    id: '5',
    postTitle: 'Weekend Vibes: Beach Day Essentials!',
    postSubTitle: 'Sun, sand, and good times.',
    postBody: 'Packing list for the perfect beach day! From sunscreen to snacks, we\'ve got you covered. #BeachLife #SummerFun',
    postPublishDate: '2025-07-25T16:00:00Z',
    postStatus: 'Published',
    contentType: 'Instagram Post',
    postImage: 'https://placehold.co/600x600/A133FF/FFFFFF?text=Beach+Day',
  },
  {
    id: '6',
    postTitle: 'Community Event: Local Farmers Market This Saturday!',
    postSubTitle: 'Support local businesses!',
    postBody: 'Join us this Saturday at the community farmers market! Fresh produce, artisanal goods, and live music. See you there!',
    postPublishDate: '2025-07-02T18:00:00Z', // Today's date (July 2nd, 2025)
    postStatus: 'Published',
    contentType: 'Facebook Post',
    postImage: 'https://placehold.co/800x450/33FFB5/FFFFFF?text=Farmers+Market',
  },
  {
    id: '7',
    postTitle: 'Upcoming Webinar: Mastering Digital Marketing',
    postSubTitle: 'Learn from the experts.',
    postBody: 'Sign up for our free webinar on advanced digital marketing strategies. Limited spots available!',
    postPublishDate: '2025-07-28T10:00:00Z',
    postStatus: 'Draft',
    contentType: 'Blog Post',
    postImage: 'https://placehold.co/600x400/FF8833/FFFFFF?text=Webinar+Blog',
    postCategory: 'salvaje y libre'
  },
];

// Map content types to Tailwind CSS colors for calendar events
const contentTypeColors: { [key: string]: string } = {
  'Blog Post': 'bg-blue-500',
  'Instagram Post': 'bg-purple-500',
  'Facebook Post': 'bg-green-500',
};

// Calendar View Component (Task 3.2, 3.3, 3.10)
const CalendarView: React.FC<{ posts: Post[]; onEventClick: (post: Post) => void }> = ({ posts, onEventClick }) => {
  // Transform posts into FullCalendar event format
  const events = posts.map(post => ({
    id: post.id,
    title: post.postTitle,
    date: post.postPublishDate.split('T')[0], // Use only date part for dayGridMonth
    extendedProps: {
      postStatus: post.postStatus,
      contentType: post.contentType,
      fullPost: post, // Store the full post object here for easy access on click
    },
  }));

  return (
    <div className="p-2 sm:p-4 bg-white rounded-lg shadow-md w-full">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 text-center">Content Calendar</h2>

      {/* Color-coding Legend (CAL-4) - Mobile-first layout */}
      <div className="mb-4 p-3 bg-gray-50 rounded-lg shadow-sm flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm sm:text-base">
        <span className="font-semibold text-gray-700 mr-2">Legend:</span>
        {Object.entries(contentTypeColors).map(([type, colorClass]) => (
          <div key={type} className="flex items-center">
            <span className={`w-4 h-4 rounded-full ${colorClass} mr-2`}></span>
            <span>{type}</span>
          </div>
        ))}
        <div className="flex items-center ml-4">
          <span className="inline-block px-2 py-0.5 text-xs font-semibold rounded-full bg-gray-400 text-white mr-2">Draft</span>
          <span>Draft Post</span>
        </div>
      </div>

      <div className="full-calendar-container">
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: ''
          }}
          height="auto"
          contentHeight="auto"
          events={events} // Pass the transformed mock events
          eventContent={(arg) => {
            const postStatus = arg.event.extendedProps.postStatus;
            const contentType = arg.event.extendedProps.contentType;
            const colorClass = contentTypeColors[contentType] || 'bg-gray-500'; // Default color

            // Truncate title for better display on small cells
            const truncatedTitle = arg.event.title.length > 20
              ? arg.event.title.substring(0, 17) + '...'
              : arg.event.title;

            // Tooltip for hover/tap (CAL-4)
            const tooltipText = `${arg.event.title} (${postStatus})`;

            return (
              <div
                className={`flex items-center p-1 text-xs sm:text-sm text-white rounded-md overflow-hidden whitespace-nowrap ${colorClass}`}
                title={tooltipText} // Native browser tooltip
              >
                <span className="flex-grow truncate">{truncatedTitle}</span>
                {postStatus === 'Draft' && (
                  <span className="ml-1 px-1.5 py-0.5 text-xs font-semibold rounded-full bg-gray-400 text-white flex-shrink-0">
                    Draft
                  </span>
                )}
              </div>
            );
          }}
          dayHeaders={true}
          dayHeaderContent={(arg) => (
            <span className="text-xs sm:text-sm font-semibold text-gray-600">
              {arg.text}
            </span>
          )}
          eventMinHeight={20}
          eventTimeFormat={{
            hour: 'numeric',
            minute: '2-digit',
            meridiem: false,
            hour12: false
          }}
          aspectRatio={1.5}
          // Handle event click (CAL-5)
          eventClick={(info) => {
            // Find the full post object using the event's ID
            const clickedPost = posts.find(p => p.id === info.event.id);
            if (clickedPost) {
              onEventClick(clickedPost);
            }
          }}
        />
      </div>
    </div>
  );
};

// DeleteConfirmationModal Component (Task 7.1)
const DeleteConfirmationModal: React.FC<{ postTitle: string; onConfirm: () => void; onCancel: () => void }> = ({ postTitle, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 max-w-sm w-full text-center">
        <h3 className="text-xl sm:text-2xl font-bold text-red-700 mb-4">Confirm Deletion</h3>
        <p className="text-gray-700 mb-6 text-base sm:text-lg">
          Are you sure you want to delete the post titled: <br /><span className="font-semibold italic">"{postTitle}"</span>?
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={onConfirm}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg shadow-md transition duration-300 ease-in-out text-lg sm:text-xl"
          >
            Yes, Delete
          </button>
          <button
            onClick={onCancel}
            className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-4 rounded-lg shadow-md transition duration-300 ease-in-out text-lg sm:text-xl"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};


// PostDetailModal Component (Task 5.4, 6.1, 7.1)
const PostDetailModal: React.FC<{ post: Post; onClose: () => void; onEdit: (post: Post) => void; onDelete: (postId: string) => void }> = ({ post, onClose, onEdit, onDelete }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = () => {
    onDelete(post.id); // Trigger deletion
    setShowDeleteConfirm(false); // Close confirmation modal
    onClose(); // Close detail modal
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 max-w-2xl w-full my-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-indigo-800 mb-4 text-center">
          {post.postTitle}
        </h2>
        {post.postSubTitle && (
          <h3 className="text-lg sm:text-xl text-gray-700 mb-4 text-center">
            {post.postSubTitle}
          </h3>
        )}

        {post.postImage && (
          <div className="mb-4 text-center">
            <img
              src={post.postImage}
              alt={post.postTitle}
              className="max-w-full h-auto rounded-lg shadow-md mx-auto"
              onError={(e) => { e.currentTarget.src = `https://placehold.co/400x300/CCCCCC/000000?text=No+Image`; }} // Fallback
            />
          </div>
        )}

        <div className="text-gray-600 text-base sm:text-lg mb-4 leading-relaxed">
          <p className="font-semibold text-gray-700 mb-2">Details:</p>
          <p><strong>Content Type:</strong> {post.contentType}</p>
          <p><strong>Status:</strong>{' '}
            <span
              className={`inline-block px-2 py-0.5 text-sm font-semibold rounded-full
                ${post.postStatus === 'Draft' ? 'bg-gray-400 text-white' : 'bg-green-500 text-white'}`}
            >
              {post.postStatus}
            </span>
          </p>
          <p><strong>Publish Date:</strong> {new Date(post.postPublishDate).toLocaleString()}</p>
          {post.postCategory && <p><strong>Category:</strong> {post.postCategory}</p>}
          <p className="mt-4">
            <strong>Body:</strong>
          </p>
          <p className="whitespace-pre-wrap">{post.postBody}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <button
            onClick={() => onEdit(post)}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg shadow-md transition duration-300 ease-in-out text-lg sm:text-xl"
          >
            Edit
          </button>
          <button
            onClick={handleDeleteClick} // Open confirmation modal
            className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-lg shadow-md transition duration-300 ease-in-out text-lg sm:text-xl"
          >
            Delete
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-4 rounded-lg shadow-md transition duration-300 ease-in-out text-lg sm:text-xl"
          >
            Close
          </button>
        </div>
      </div>
      {showDeleteConfirm && (
        <DeleteConfirmationModal
          postTitle={post.postTitle}
          onConfirm={handleConfirmDelete}
          onCancel={() => setShowDeleteConfirm(false)}
        />
      )}
    </div>
  );
};


// List View Component (Task 5.1, 5.2, 5.3, 5.4)
const ListView: React.FC<{ posts: Post[]; onPostClick: (post: Post) => void }> = ({ posts, onPostClick }) => {
  const [sortKey, setSortKey] = useState<string>('publishDateDesc'); // Default sort: Newest First
  const [filterStatus, setFilterStatus] = useState<string>('All'); // Default filter: All statuses
  const [filterContentType, setFilterContentType] = useState<string>('All'); // Default filter: All content types

  // Memoize filtered and sorted posts
  const filteredAndSortedPosts = useMemo(() => {
    let currentPosts = [...posts];

    // 1. Filter by Status
    if (filterStatus !== 'All') {
      currentPosts = currentPosts.filter(post => post.postStatus === filterStatus);
    }

    // 2. Filter by Content Type
    if (filterContentType !== 'All') {
      currentPosts = currentPosts.filter(post => post.contentType === filterContentType);
    }

    // 3. Sort the filtered posts
    currentPosts.sort((a, b) => {
      switch (sortKey) {
        case 'publishDateAsc':
          return new Date(a.postPublishDate).getTime() - new Date(b.postPublishDate).getTime();
        case 'publishDateDesc':
          return new Date(b.postPublishDate).getTime() - new Date(a.postPublishDate).getTime();
        case 'titleAsc':
          return a.postTitle.localeCompare(b.postTitle);
        case 'titleDesc':
          return b.postTitle.localeCompare(a.postTitle);
        default:
          return 0; // No sorting
      }
    });
    return currentPosts;
  }, [posts, sortKey, filterStatus, filterContentType]);

  return (
    <div className="p-2 sm:p-4 bg-white rounded-lg shadow-md w-full">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 text-center">Content List</h2>

      {/* Sorting and Filtering Controls - Mobile-first layout */}
      <div className="mb-6 flex flex-col sm:flex-row items-center justify-end gap-3 sm:gap-4 flex-wrap">
        {/* Sort by Dropdown (LIST-2) */}
        <div className="w-full sm:w-auto flex items-center gap-2">
          <label htmlFor="sort-by" className="text-gray-700 font-semibold text-base sm:text-lg">
            Sort by:
          </label>
          <select
            id="sort-by"
            className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-lg sm:text-base bg-white"
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value)}
          >
            <option value="publishDateDesc">Publish Date (Newest First)</option>
            <option value="publishDateAsc">Publish Date (Oldest First)</option>
            <option value="titleAsc">Title (A-Z)</option>
            <option value="titleDesc">Title (Z-A)</option>
          </select>
        </div>

        {/* Filter by Status Dropdown (LIST-3) */}
        <div className="w-full sm:w-auto flex items-center gap-2">
          <label htmlFor="filter-status" className="text-gray-700 font-semibold text-base sm:text-lg">
            Status:
          </label>
          <select
            id="filter-status"
            className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-lg sm:text-base bg-white"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Published">Published</option>
            <option value="Draft">Draft</option>
          </select>
        </div>

        {/* Filter by Content Type Dropdown (LIST-3) */}
        <div className="w-full sm:w-auto flex items-center gap-2">
          <label htmlFor="filter-type" className="text-gray-700 font-semibold text-base sm:text-lg">
            Type:
          </label>
          <select
            id="filter-type"
            className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-lg sm:text-base bg-white"
            value={filterContentType}
            onChange={(e) => setFilterContentType(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Blog Post">Blog Post</option>
            <option value="Instagram Post">Instagram Post</option>
            <option value="Facebook Post">Facebook Post</option>
          </select>
        </div>
      </div>

      {filteredAndSortedPosts.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No posts match your current filters. Try adjusting them!</p>
      ) : (
        <div className="space-y-4">
          {filteredAndSortedPosts.map(post => (
            <div
              key={post.id}
              className="bg-gray-50 rounded-lg shadow-sm p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 border border-gray-200 cursor-pointer hover:bg-gray-100 transition duration-150 ease-in-out"
              onClick={() => onPostClick(post)} // Make the whole div clickable
            >
              {post.postImage && (
                <img
                  src={post.postImage}
                  alt={post.postTitle}
                  className="w-full h-32 sm:w-24 sm:h-24 object-cover rounded-md flex-shrink-0"
                  onError={(e) => { e.currentTarget.src = `https://placehold.co/100x100/CCCCCC/000000?text=No+Image`; }} // Fallback image
                />
              )}
              <div className="flex-grow">
                <h3 className="text-lg sm:text-xl font-semibold text-indigo-700 mb-1 truncate">
                  {post.postTitle}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  <span className="font-medium">{post.contentType}</span> -{' '}
                  <span
                    className={`inline-block px-2 py-0.5 text-xs font-semibold rounded-full
                      ${post.postStatus === 'Draft' ? 'bg-gray-400 text-white' : 'bg-green-500 text-white'}`}
                  >
                    {post.postStatus}
                  </span>
                </p>
                <p className="text-xs text-gray-500">
                  Publish Date: {new Date(post.postPublishDate).toLocaleString()}
                </p>
                {post.postCategory && (
                  <p className="text-xs text-gray-500 mt-1">
                    Category: {post.postCategory}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// LoginScreen Component (Task 2.1) - unchanged
const LoginScreen: React.FC<{ onLoginSuccess: () => void }> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = () => {
    console.log('Attempting login with:', { email, password });
    setTimeout(() => {
      onLoginSuccess();
    }, 500);
  };

  const handleGoogleLogin = () => {
    console.log('Attempting Google login');
    setTimeout(() => {
      onLoginSuccess();
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
      <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 lg:p-10 text-center max-w-md w-full">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-indigo-800 mb-6">
          Welcome to CMS
        </h1>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email or Username"
            className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg sm:text-xl"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg sm:text-xl"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleLogin}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg shadow-md transition duration-300 ease-in-out text-lg sm:text-xl"
          >
            Login
          </button>

          <div className="relative flex items-center justify-center my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300"></span>
            </div>
            <div className="relative bg-white px-4 text-sm text-gray-500">
              Or
            </div>
          </div>

          <button
            onClick={handleGoogleLogin}
            className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold py-3 px-4 rounded-lg shadow-md transition duration-300 ease-in-out flex items-center justify-center text-lg sm:text-xl"
          >
            <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path fill="#4285F4" d="M22.445 12.002c0-.709-.06-1.39-.17-2.048H12v3.87h6.14c-.27 1.39-1.04 2.56-2.21 3.36v2.58h3.32c1.94-1.78 3.06-4.4 3.06-7.44z"/>
              <path fill="#34A853" d="M12 23c3.24 0 5.96-1.07 7.95-2.91l-3.32-2.58c-.92.61-2.1.98-3.63.98-2.79 0-5.16-1.88-6.01-4.42H2.68v2.66C4.6 20.45 8.04 23 12 23z"/>
              <path fill="#FBBC04" d="M5.99 14.18c-.23-.61-.36-1.26-.36-1.92s.13-1.31.36-1.92V7.68H2.68c-.96 1.9-1.52 4.03-1.52 6.32s.56 4.42 1.52 6.32l3.31-2.66z"/>
              <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.59 1.79L19.98 3C17.95 1.16 15.24 0 12 0 8.04 0 4.6 2.55 2.68 5.58l3.31 2.66c.85-2.54 3.22-4.42 6.01-4.42z"/>
            </svg>
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
};

// PostFormModal Component (Task 4.2, 4.3, 4.4, 4.5, 6.1)
const PostFormModal: React.FC<{ contentType: Post['contentType']; onClose: (updatedPost?: Post) => void; initialPostData?: Post }> = ({ contentType, onClose, initialPostData }) => {
  const [postTitle, setPostTitle] = useState<string>(initialPostData?.postTitle || '');
  const [postSubTitle, setPostSubTitle] = useState<string>(initialPostData?.postSubTitle || '');
  const [postBody, setPostBody] = useState<string>(initialPostData?.postBody || '');
  const [postPublishDate, setPostPublishDate] = useState<string>(
    initialPostData?.postPublishDate ? initialPostData.postPublishDate.substring(0, 16) : '' // Format for datetime-local
  );
  const [postImage, setPostImage] = useState<File | null>(null); // File object for new upload
  const [currentPostImageUrl, setCurrentPostImageUrl] = useState<string | undefined>(initialPostData?.postImage); // URL for existing image
  const [postCategory, setPostCategory] = useState<string>(initialPostData?.postCategory || '');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [showNewCategoryInput, setShowNewCategoryInput] = useState<boolean>(false);
  const [newCategoryName, setNewCategoryName] = useState<string>('');

  // Initial mock categories, will be updated locally for POC
  const [localCategories, setLocalCategories] = useState<string[]>([
    'salvaje y libre',
    'reflexiónes sobre la vida',
    'travel',
    'food'
  ]);

  // Add initialPostData's category to localCategories if it's new
  useEffect(() => {
    if (initialPostData?.postCategory && !localCategories.includes(initialPostData.postCategory)) {
      setLocalCategories(prev => [...prev, initialPostData.postCategory!]);
    }
  }, [initialPostData, localCategories]);


  // Mock character limits for Instagram/Facebook posts
  const POC_MAX_BODY_LENGTH = 500; // Simplified for POC validation

  // Function to validate fields for publishing
  const validateForPublish = () => {
    let errors: string[] = [];

    if (!postTitle) errors.push('Title is required.');
    if (!postSubTitle) errors.push('Subtitle is required.');
    if (!postBody) errors.push('Body is required.');
    if (!postImage && !currentPostImageUrl) errors.push('Image is required.'); // Check for existing or new image
    if (!postPublishDate) errors.push('Publish Date is required.');

    if (contentType === 'Blog Post') {
      if (!postCategory) errors.push('Category is required for Blog Posts.');
      if (postCategory === 'add-new' && !newCategoryName.trim()) {
        errors.push('New category name cannot be empty.');
      }
    }

    if (contentType === 'Instagram Post' || contentType === 'Facebook Post') {
      if (postBody.length > POC_MAX_BODY_LENGTH) {
        errors.push(`Post Body exceeds maximum length of ${POC_MAX_BODY_LENGTH} characters.`);
      }
    }

    if (errors.length > 0) {
      setErrorMessage(errors.join(' ')); // Join errors for display
      return false;
    }
    setErrorMessage('');
    return true;
  };

  // Effect to manage new category input visibility and selection
  useEffect(() => {
    if (postCategory === 'add-new') {
      setShowNewCategoryInput(true);
      setPostCategory(''); // Clear selected category when 'Add New' is chosen
    } else {
      setShowNewCategoryInput(false);
      setNewCategoryName(''); // Clear new category name if another option is chosen
    }
  }, [postCategory]);

  // Handle change for category dropdown
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setPostCategory(selectedValue);
  };

  // Handle change for new category input
  const handleNewCategoryNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCategoryName(e.target.value);
    setPostCategory(e.target.value); // Update postCategory with the new name directly
  };

  const handleSave = (status: 'Draft' | 'Published') => {
    setErrorMessage('');
    if (status === 'Draft' && !postPublishDate) {
      setErrorMessage('Publish Date is required to save as a Draft.');
      return;
    }
    if (status === 'Published' && !validateForPublish()) {
      return; // Validation for publish handled by validateForPublish
    }

    // If a new category was entered, add it to localCategories
    if (contentType === 'Blog Post' && showNewCategoryInput && newCategoryName.trim()) {
      if (!localCategories.includes(newCategoryName.trim())) {
        setLocalCategories(prev => [...prev, newCategoryName.trim()]);
      }
    }

    const updatedPost: Post = {
      id: initialPostData?.id || String(Date.now()), // Use existing ID or generate new
      postTitle,
      postSubTitle: postSubTitle || undefined,
      postBody,
      postPublishDate: postPublishDate + ':00Z',
      postStatus: status,
      contentType,
      postImage: postImage ? URL.createObjectURL(postImage) : currentPostImageUrl,
      postCategory: contentType === 'Blog Post' ? (postCategory || newCategoryName.trim()) : undefined,
    };

    console.log(`${status === 'Draft' ? 'Saving as Draft' : 'Publishing/Updating'}:`, updatedPost);
    onClose(updatedPost); // Pass the updated post back
  };


  const getModalTitle = () => {
    if (initialPostData) {
      return `Edit ${initialPostData.contentType}`;
    }
    switch (contentType) {
      case 'Blog Post': return 'Create Blog Post';
      case 'Instagram Post': return 'Create Instagram Post';
      case 'Facebook Post': return 'Create Facebook Post';
      default: return 'Create New Post';
    }
  };

  // Determine if Publish button should be enabled
  const isPublishEnabled = validateForPublish();


  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 max-w-lg w-full my-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-indigo-800 mb-6 text-center">
          {getModalTitle()}
        </h2>

        <form className="space-y-4">
          <div>
            <label htmlFor="postTitle" className="block text-gray-700 text-sm font-bold mb-2">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="postTitle"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-lg"
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
              placeholder="Enter post title"
            />
          </div>

          <div>
            <label htmlFor="postSubTitle" className="block text-gray-700 text-sm font-bold mb-2">
              Subtitle <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="postSubTitle"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-lg"
              value={postSubTitle}
              onChange={(e) => setPostSubTitle(e.target.value)}
              placeholder="Enter post subtitle"
            />
          </div>

          <div>
            <label htmlFor="postBody" className="block text-gray-700 text-sm font-bold mb-2">
              Body <span className="text-red-500">*</span>
              {(contentType === 'Instagram Post' || contentType === 'Facebook Post') && (
                <span className="ml-2 text-gray-500 text-xs">
                  ({postBody.length}/{POC_MAX_BODY_LENGTH} chars)
                </span>
              )}
            </label>
            <textarea
              id="postBody"
              rows={6}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-lg resize-y"
              value={postBody}
              onChange={(e) => setPostBody(e.target.value)}
              placeholder="Enter post content (rich text editor placeholder)"
            ></textarea>
          </div>

          {contentType === 'Blog Post' && (
            <div>
              <label htmlFor="postCategory" className="block text-gray-700 text-sm font-bold mb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                id="postCategory"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-lg"
                value={postCategory}
                onChange={handleCategoryChange}
              >
                <option value="">Select a category</option>
                {localCategories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
                <option value="add-new">Add New Category</option>
              </select>
              {showNewCategoryInput && (
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-lg mt-2"
                  placeholder="Enter new category name"
                  value={newCategoryName}
                  onChange={handleNewCategoryNameChange}
                />
              )}
            </div>
          )}

          <div>
            <label htmlFor="postImage" className="block text-gray-700 text-sm font-bold mb-2">
              Image <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              id="postImage"
              accept="image/*"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-lg file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              onChange={(e) => {
                setPostImage(e.target.files ? e.target.files[0] : null);
                setCurrentPostImageUrl(undefined); // Clear existing image URL if new file is selected
              }}
            />
            {currentPostImageUrl && !postImage && (
              <p className="text-sm text-gray-500 mt-2">Current Image: <a href={currentPostImageUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">View</a></p>
            )}
            {postImage && (
              <p className="text-sm text-gray-500 mt-2">Selected: {postImage.name}</p>
            )}
          </div>

          <div>
            <label htmlFor="postPublishDate" className="block text-gray-700 text-sm font-bold mb-2">
              Publish Date & Time <span className="text-red-500">*</span>
            </label>
            <input
              type="datetime-local"
              id="postPublishDate"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-lg"
              value={postPublishDate}
              onChange={(e) => setPostPublishDate(e.target.value)}
            />
          </div>

          {errorMessage && (
            <p className="text-red-500 text-sm mt-2 p-2 bg-red-50 rounded-md border border-red-200">
              {errorMessage}
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button
              type="button"
              onClick={() => handleSave('Draft')}
              className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-4 rounded-lg shadow-md transition duration-300 ease-in-out text-lg sm:text-xl"
            >
              Save as Draft
            </button>
            <button
              type="button"
              onClick={() => handleSave('Published')}
              disabled={!isPublishEnabled} // Disable if validation fails
              className={`flex-1 font-bold py-3 px-4 rounded-lg shadow-md transition duration-300 ease-in-out text-lg sm:text-xl
                ${isPublishEnabled ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'bg-gray-400 text-gray-700 cursor-not-allowed'}`}
            >
              {initialPostData ? 'Save Changes' : 'Publish'}
            </button>
            <button
              type="button"
              onClick={() => onClose()} // No new post on cancel
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-4 rounded-lg shadow-md transition duration-300 ease-in-out text-lg sm:text-xl"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// CreatePostModal Component (Task 3.4, 4.1)
const CreatePostModal: React.FC<{ onClose: (selectedType: Post['contentType'] | null) => void }> = ({ onClose }) => {
  const handleContentTypeSelect = (type: Post['contentType']) => {
    onClose(type); // Pass the selected type back to HomePage
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 max-w-md w-full">
        <h2 className="text-2xl sm:text-3xl font-bold text-indigo-800 mb-6 text-center">
          Select Content Type
        </h2>
        <div className="space-y-4">
          <button
            onClick={() => handleContentTypeSelect('Blog Post')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg shadow-md transition duration-300 ease-in-out text-lg sm:text-xl"
          >
            Blog Post
          </button>
          <button
            onClick={() => handleContentTypeSelect('Instagram Post')}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg shadow-md transition duration-300 ease-in-out text-lg sm:text-xl"
          >
            Instagram Post
          </button>
          <button
            onClick={() => handleContentTypeSelect('Facebook Post')}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg shadow-md transition duration-300 ease-in-out text-lg sm:text-xl"
          >
            Facebook Post
          </button>
          <button
            disabled // Disabled as per FUTURE-1
            className="w-full bg-gray-300 text-gray-500 font-bold py-3 px-4 rounded-lg cursor-not-allowed text-lg sm:text-xl"
          >
            AI Ideation (Future)
          </button>
        </div>
        <button
          onClick={() => onClose(null)} // Pass null to close without selection
          className="w-full mt-6 bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-lg shadow-md transition duration-300 ease-in-out text-lg sm:text-xl"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};


// HomePage Component (Task 3.1, 3.4, 4.2, 4.3, 4.4, 4.5, 5.4, 6.1, 7.1, 3.10)
const HomePage: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const [currentView, setCurrentView] = useState<'calendar' | 'list'>('calendar');
  const [showCreatePostModal, setShowCreatePostModal] = useState<boolean>(false);
  const [selectedContentType, setSelectedContentType] = useState<Post['contentType'] | null>(null);
  const [posts, setPosts] = useState<Post[]>(initialMockPosts); // Manage posts state here
  const [selectedPostForDetail, setSelectedPostForDetail] = useState<Post | null>(null); // State for detail modal
  const [postToEdit, setPostToEdit] = useState<Post | null>(null); // State for editing

  const handleCreateNewPostClick = () => {
    setShowCreatePostModal(true);
  };

  const handleContentTypeModalClose = (type: Post['contentType'] | null) => {
    setShowCreatePostModal(false);
    if (type) {
      setSelectedContentType(type);
    }
  };

  const handlePostFormModalClose = (updatedPost?: Post) => {
    setSelectedContentType(null); // Close PostFormModal
    setPostToEdit(null); // Clear post being edited

    if (updatedPost) {
      // If editing an existing post, update it in the array
      if (posts.some(p => p.id === updatedPost.id)) {
        setPosts(prevPosts => prevPosts.map(p =>
          p.id === updatedPost.id ? updatedPost : p
        ));
      } else {
        // Otherwise, add it as a new post
        setPosts(prevPosts => [...prevPosts, updatedPost]);
      }
    }
  };

  const handlePostClick = (post: Post) => {
    setSelectedPostForDetail(post); // Set the post to display in detail modal
  };

  const handleDetailModalClose = () => {
    setSelectedPostForDetail(null); // Close detail modal
  };

  const handleEditPostFromDetail = (post: Post) => {
    setSelectedPostForDetail(null); // Close detail modal first
    setPostToEdit(post); // Set the post to be edited
  };

  const handleDeletePost = (postId: string) => {
    setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center p-4 sm:p-6 lg:p-8 font-sans">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-indigo-800 mb-4 sm:mb-0">
            Content Dashboard
          </h1>
          <button
            onClick={onLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out text-base sm:text-lg"
          >
            Logout
          </button>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          {/* View Toggle Buttons */}
          <div className="flex justify-center w-full sm:w-auto sm:flex-grow">
            <button
              onClick={() => setCurrentView('calendar')}
              className={`flex-1 py-3 px-4 rounded-l-lg font-semibold text-lg sm:text-xl transition duration-300 ease-in-out
                ${currentView === 'calendar' ? 'bg-indigo-600 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              Calendar View
            </button>
            <button
              onClick={() => setCurrentView('list')}
              className={`flex-1 py-3 px-4 rounded-r-lg font-semibold text-lg sm:text-xl transition duration-300 ease-in-out
                ${currentView === 'list' ? 'bg-indigo-600 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              List View
            </button>
          </div>

          {/* Create New Post Button (Task 3.4) */}
          <button
            onClick={handleCreateNewPostClick}
            className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out text-lg sm:text-xl flex-shrink-0"
          >
            Create New Post
          </button>
        </div>

        {currentView === 'calendar' ? (
          <CalendarView posts={posts} onEventClick={handlePostClick} /> // Pass onEventClick
        ) : (
          <ListView posts={posts} onPostClick={handlePostClick} />
        )}
      </div>

      {/* Render CreatePostModal for content type selection */}
      {showCreatePostModal && <CreatePostModal onClose={handleContentTypeModalClose} />}

      {/* Render PostFormModal for creating or editing */}
      {(selectedContentType || postToEdit) && (
        <PostFormModal
          contentType={selectedContentType || postToEdit!.contentType} // Use existing type if editing
          onClose={handlePostFormModalClose}
          initialPostData={postToEdit || undefined}
        />
      )}

      {/* Render PostDetailModal if a post is selected for detail view */}
      {selectedPostForDetail && (
        <PostDetailModal
          post={selectedPostForDetail}
          onClose={handleDetailModalClose}
          onEdit={handleEditPostFromDetail}
          onDelete={handleDeletePost} // Pass delete handler
        />
      )}
    </div>
  );
};

// Main App component - unchanged
const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <>
      {isAuthenticated ? (
        <HomePage onLogout={handleLogout} />
      ) : (
        <LoginScreen onLoginSuccess={handleLoginSuccess} />
      )}
    </>
  );
};

export default App;
