import Swal from "sweetalert2";

export const swal = (text) => {  
    let timerInterval;
    Swal.fire({
        title: text,
        target: document.getElementById('#myDiv'),
        timer: 1500,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading()
          timerInterval = setInterval(() => {
            const content = Swal.getHtmlContainer()
            if (content) {
              const b = content.querySelector('b')
              if (b) {
                b.textContent = Swal.getTimerLeft()
              }
            }
          }, 100)
        },
        willClose: () => {
          clearInterval(timerInterval)
        }
      })
      .then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
         // console.log('I was closed by the timer')
        }
      })
}