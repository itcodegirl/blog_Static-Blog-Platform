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
