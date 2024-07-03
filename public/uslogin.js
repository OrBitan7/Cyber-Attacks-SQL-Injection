window.onload = () => {
    const url = 'http://localhost:3000';
    document.getElementById('login').onsubmit = (event) => {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        fetch(`${url}/unprotectedSQL/login?username=${username}&password=${password}`)
            .then((res) => {
                if (res.status === 200) {
                    window.location.href = `${url}/unprotectedSQL/products`;
                } else {
                    return res.json();
                }
            })
            .then((data) => {
                if (data?.message) {
                    const response = document.getElementById('response');
                    response.innerHTML = data.message;
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                const response = document.getElementById('response');
                response.innerHTML = 'An error occurred while processing your request.';
            });

    }
}