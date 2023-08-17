let posts = document.querySelector('.post');
let postsBody = document.querySelector('.postBody');
let modalBody = document.querySelector('.modalBody')



fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(result => {
        result.forEach(post => {
            postsBody.innerHTML += `<div id="post">
            <h5 class="post-title">${post.title}</h5>
            <p class="post-text">${post.body}</p>
            <button id=${post.id} class="btn-primary">Detay</button>
          </div>`
          bindButtons();
        });
        
});

function getPostDetail(id) {
   fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
   .then(response => response.json())
    .then(result => {
            modalBody.innerHTML += `<h1>${result.title}</h1> <br> ${result.body}`
            console.log(result.userId);

    });
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
        .then(response => response.json())
        .then(result => {
            postsBody.innerHTML += `<ul class="post-item">`
            for (const comment of result) {
                postsBody.innerHTML += `<li>${comment.email} ||||||| ${comment.body}</li>` 
            }
        });
        postsBody.innerHTML += `</ul>`
   
}
function getAuthorData(author_id) {
    fetch(`https://jsonplaceholder.typicode.com/users/${author_id}`)
    then(response => response.json())
    .then(result => {
        postsBody.innerHTML += `<h1>${result.username}</h1>`
    });
}

function bindButtons() {
    let detailBtn = document.querySelectorAll('.btn-primary');
    for (const btn of detailBtn) {
        btn.addEventListener('click', (e) => {
            getPostDetail(e.target.id);
        });
    }
}