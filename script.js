const posts = [
	{
		id: 1,
		title: "First Blog Post",
		description: "This is the first post description.",
		content: "Full content for the first post goes here."
	},
	{
		id: 2,
		title: "Second Blog Post",
		description: "This is the second post description.",
		content: "Full content for the second post goes here."
	}
];

// Render posts on the home page
const postsContainer = document.getElementById('posts');
posts.forEach(post => {
	const article = document.createElement('article');
	article.innerHTML = `
    <h2><a href="post.html?id=${post.id}">${post.title}</a></h2>
    <p>${post.description}</p>
  `;
	postsContainer.appendChild(article);
});

// For post.html: fetch and display full post content based on postId
const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('id');
if (postId) {
	const post = posts.find(p => p.id === parseInt(postId));
	if (post) {
		document.querySelector('h1').textContent = post.title;
		document.querySelector('p').textContent = post.content;
	}
}

const spaceId = 'your-space-id';
const accessToken = 'your-access-token';

async function fetchPosts() {
	const response = await fetch(`https://cdn.contentful.com/spaces/${spaceId}/entries?access_token=${accessToken}`);
	const data = await response.json();
	return data.items.map(item => ({
		id: item.sys.id,
		title: item.fields.title,
		description: item.fields.description,
		content: item.fields.content
	}));
}

fetchPosts().then(posts => {
	const postsContainer = document.getElementById('posts');
	posts.forEach(post => {
		const article = document.createElement('article');
		article.innerHTML = `
      <h2><a href="post.html?id=${post.id}">${post.title}</a></h2>
      <p>${post.description}</p>
    `;
		postsContainer.appendChild(article);
	});
});

// Assuming 'posts' is an array of blog post objects
const searchInput = document.getElementById('search-bar');
searchInput.addEventListener('input', function () {
	const query = searchInput.value.toLowerCase();
	const filteredPosts = posts.filter(post =>
		post.title.toLowerCase().includes(query) ||
		post.description.toLowerCase().includes(query)
	);
	displayPosts(filteredPosts);
});

function displayPosts(postsToDisplay) {
	const postsContainer = document.getElementById('posts');
	postsContainer.innerHTML = ''; // Clear previous posts
	postsToDisplay.forEach(post => {
		const article = document.createElement('article');
		article.innerHTML = `
      <h2><a href="post.html?id=${post.id}">${post.title}</a></h2>
      <p>${post.description}</p>
    `;
		postsContainer.appendChild(article);
	});
}

displayPosts(posts); // Initially display all posts

// Firebase configuration
const firebaseConfig = {
	apiKey: "your-api-key",
	authDomain: "your-app.firebaseapp.com",
	databaseURL: "https://your-app.firebaseio.com",
	projectId: "your-project-id",
	storageBucket: "your-app.appspot.com",
	messagingSenderId: "your-sender-id",
	appId: "your-app-id"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Function to display comments
function loadComments(postId) {
	const commentsContainer = document.getElementById('comments');
	commentsContainer.innerHTML = ''; // Clear old comments

	db.collection('comments').where('postId', '==', postId).get()
		.then(snapshot => {
			snapshot.forEach(doc => {
				const comment = doc.data();
				const commentDiv = document.createElement('div');
				commentDiv.innerHTML = `<p>${comment.text}</p>`;
				commentsContainer.appendChild(commentDiv);
			});
		});
}

// JavaScript(Saving and Fetching Comments from Firebase):
// Firebase configuration
const firebaseConfig = {
	apiKey: "your-api-key",
	authDomain: "your-app.firebaseapp.com",
	databaseURL: "https://your-app.firebaseio.com",
	projectId: "your-project-id",
	storageBucket: "your-app.appspot.com",
	messagingSenderId: "your-sender-id",
	appId: "your-app-id"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Function to display comments
function loadComments(postId) {
	const commentsContainer = document.getElementById('comments');
	commentsContainer.innerHTML = ''; // Clear old comments

	db.collection('comments').where('postId', '==', postId).get()
		.then(snapshot => {
			snapshot.forEach(doc => {
				const comment = doc.data();
				const commentDiv = document.createElement('div');
				commentDiv.innerHTML = `<p>${comment.text}</p>`;
				commentsContainer.appendChild(commentDiv);
			});
		});
}

// Add comment
document.getElementById('submit-comment').addEventListener('click', function () {
	const commentText = document.getElementById('comment-input').value;
	if (commentText) {
		db.collection('comments').add({
			text: commentText,
			postId: postId, // Assume postId is available
			timestamp: firebase.firestore.FieldValue.serverTimestamp()
		}).then(() => {
			loadComments(postId);
			document.getElementById('comment-input').value = ''; // Clear input
		});
	}
});

// Load comments when post page is loaded
const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('id');
loadComments(postId);

