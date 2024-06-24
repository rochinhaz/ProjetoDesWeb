document.addEventListener('DOMContentLoaded', () => {
    const userForm = document.getElementById('userForm');
    const userList = document.getElementById('userList');
    const search = document.getElementById('search');
    const searchButton = document.getElementById('searchBt');
    const clearFormBtn = document.getElementById('clearField');
    const clearListBtn = document.getElementById('clearAll');

    function loadUsers(filteredUsers = null) {
        userList.innerHTML = '';
        const users = filteredUsers || JSON.parse(localStorage.getItem('users')) || [];
        users.forEach((user, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${user.date}</span>
                <span>${user.username}</span>
                <span>${user.email}</span>
                <button onclick="deleteUser(${index})">Excluir</button>
            `;
            userList.appendChild(li);
        });
    }

    function saveUser(user) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
        loadUsers();
    }

    function deleteUser(index) {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        users.splice(index, 1);
        localStorage.setItem('users', JSON.stringify(users));
        loadUsers();
    }

    userForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = userForm.username.value;
        const email = userForm.email.value;
        const date = new Date().toLocaleString();
        saveUser({ username, email, date });
        userForm.reset();
    });

    clearFormBtn.addEventListener('click', () => {
        userForm.reset();
    });

    clearListBtn.addEventListener('click', () => {
        localStorage.removeItem('users');
        loadUsers();
    });

    searchButton.addEventListener('click', () => {
        const searchTerm = search.value.toLowerCase();
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const filteredUsers = users.filter(user => 
            user.username.toLowerCase().includes(searchTerm) || 
            user.email.toLowerCase().includes(searchTerm)
        );
        loadUsers(filteredUsers);
    });

    window.deleteUser = deleteUser;
    loadUsers();
});
