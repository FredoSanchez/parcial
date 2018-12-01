window.onload = () => {
    app.init();
};
let app = {
    init: function(){
        this.addEvents();
        this.loadContent();
    },
    addEvents: function(){
        let form = document.movieForm;
        form.addEventListener('submit', this.submitMovie());
    },
    submitMovie: function(event){
        event.preventDefault();
        let form = document.movieForm;
        let data = {
            name: form.name.value,
            gender: form.gender.value,
            year: form.year.value
        };
        fetch('/movies',{
            method: 'POST',
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'}
        }).then(res => {
            return res.json()
        }).then(data => {
            if(data.ok){
                this.addRow(data.inserted);
            } else {
                let errors = document.getElementsByClassName("errors")[0];
                errors.innerText = data.err;
            }
        }); 
    },
    addRow: function(data){
        let tr = document.createElement('tr');
        tr.innerHTML = `<td class="id">${data._id}</td>
                        <td class = "name">${data.name}</td>
                        <td>${data.gender}</td>
                        <td>${data.year}</td>
                        <td>
                            <a class="delete" href="#"><i class="fas fa-pencil-alt"></i></a>
                            <a class="update" href="#"><i class="fas fa-minus-circle"></i></a>
                        </td>`
        let tbody = document.getElementsByClassName("listMovies")[0];
        tbody.appendChild(tr);
        let addEvents = () => {
            document.querySelectorAll(".delete").forEach(element => {
                element.addEventListener("click", function(event){
                    event.preventDefault();
                    let id = element.parentElement.parentElement.getElementsByClassName("id")[0];

                    fetch('/movies/' + id,  {
                        method: 'DELETE'
                    }).then(res => res.json())
                    .then(data => {
                        if(data.ok){
                            let tbody = document.getElementsByClassName("listMovies")[0];
                            tbody.removeChild(element.parentElement.parentElement);
                        } else {
                            let errors = document.getElementsByClassName("errors")[0];
                            errors.innerText= data.err.message;
                        }
                    });
                });
            });

            document.querySelectorAll(".update").forEach(element => {
                element.addEventListener("click", function(event){
                    event.preventDefault();
                    let old = element.parentElement.parentElement;
                    let tr = document.createElement('tr');
                    tr.innerHTML = `<form action="#" method="POST">
                                        <td><input type="text" name="id" readonly value="id"></td>
                                        <td><input type="text" name="name"></td>
                                        <td><input type="text" name="gender"></td>
                                        <td><input type="number", name="year", value="1999", min="1850", max="2025"></td>
                                        <td>
                                            <button type="submit"><i class="fas fa-check-circle"></i></button>
                                            <button><i class="fas fa-times-circle"></i></button>
                                        </td>
                                    </form>`;
                    tbody.replaceChild(tr,old);
                });
            });
        }
    },
    loadContent: function(){
        fetch('/movies', {method:'GET'})
        .then(res=> res.json())
        .then(data=> {
            if(data.ok){
                data.movies.forEach(element=> {
                    this.addRow(element);
                });
            }
        });
    }
};