import axios from 'axios'


const api = axios.create({
    baseURL: 'https://hercules8-api.vercel.app/api',
    timeout: 1000,
    headers: { 'Content-Type': 'application/json' }
})

const notification = {
    message: 'nada consta',
    options: {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined    
    }
}

export { api, notification }
