// define variables from ID and assign data
const postBox = document.getElementById('posts-box')
const spinnerBox = document.getElementById('spinner-box')
const loadBtn = document.getElementById('load-btn')
const endBox = document.getElementById('end-box')

let visible =  1
// creating post cards with json data
const getData = () => {
    $.ajax({
    type: 'GET',
    url: `/load-data/${visible}/`,
    success : function(response){
        console.log('success', response)
        console.log(response)
        const data =  response.data // JSON data
        // set timer for spinner
        setTimeout(()=>{
            spinnerBox.classList.add('not-visible')
            console.log(data)
            // parse JSON data
            // `` this is used to add variable if we want it in string
            // creating post cards
            data.forEach(element => {
                postBox.innerHTML += `
                      <div class="card mb-2" ">
                        <div class="card-body">
                            <h5 class="card-title">${element.title}</h5>
                            <p class="card-text">${element.body}</p>

                      </div>
                      <div class="card-footer">
                          <div class="row">
                                <div class="col-1">
                                    <a href="#" class="btn btn-primary">Details</a>
                                </div>
                                <div class="col-1">
                                    <a href="#" class="btn btn-primary">Like</a>
                                </div>
                          </div>
                         </div>
                      </div>
                `
            });
        },1000)
        console.log(response.size)
        // if size of response is less than visible no more data to load
        if(response.size === 0){
            endBox.TextContent = "NO Post"
        }
        else if(response.size <= visible){
            loadBtn.classList.add('not-visible')
            endBox.textContent = "No more post to load"
        }
    },
    error: function(error){
        console.log('error', error)
    }

    });

}
// load more post with button click 
loadBtn.addEventListener('click', () => {
    spinnerBox.classList.remove('not-visible')
    visible += 1
    getData()
})

getData()