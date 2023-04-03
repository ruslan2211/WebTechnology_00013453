const deleteBtn = document.querySelectorAll('.deleteBtn');

deleteBtn.forEach(btn => {
    btn.addEventListener('click', e => {
        fetch('/calories/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: e.target.dataset.id })
        })
            .then(res => res.json())
            .then(data => {
                if (data.deleted) {
                    e.target.parentElement.parentElement.remove()
                }
            })
    })
})