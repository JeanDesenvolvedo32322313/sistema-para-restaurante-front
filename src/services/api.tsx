import axios from "axios";
import Swal from "sweetalert2";

export const Url = process.env.REACT_APP_API;

const Api = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
    headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
    },
});

Api.interceptors.request.use(async (config: any) => {
    try {
        const token = await localStorage.getItem('T');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config;
    } catch (err) {
        // console.log(err);
    }
});


Api.interceptors.response.use(function (response) {
    return response;
}, function (error) {


    if (error.code === 'ERR_NETWORK') {
        Swal.fire({
            toast: true,
            icon: "error",
            showConfirmButton: false,
            title: "Informar para o Admin do sistema.",
            text: 'Não é possível estabelece uma conexão com o Backend.',
            position: 'top-right',
            timerProgressBar: true
        })
    }


    switch (error.response.status) {
        case 500:
            handleError500(error.response.data.error);
            return false;
        case 405:
            handleError405(error.response.data.error);
            return false;
        case 404:
            handleErro404(error.response.data.error);
            return false;
        case 401:
            handleError401(error.response.data.error);
            return false;
        case 402:
            handleError402(error.response.data.error);
            return false;
        default:
            return error;
    }

    //user/senha invalido
    function handleError500(err: any) {
        localStorage.removeItem('T');
        Swal.fire({
            toast: true,
            icon: "error",
            showConfirmButton: false,
            title: "Internal Server Error",
            text: 'Não é possível estabelece uma conexão com o servidor.',
            position: 'top-right',
            timerProgressBar: true
        })
    }
    //user/senha invalido

    //user/senha invalido
    function handleError405(err: any) {
        Swal.fire({
            toast: true,
            icon: "error",
            showConfirmButton: false,
            timer: 2000,
            text: err,
            position: 'top-right',
            timerProgressBar: true
        })
    }
    //user/senha invalido


    //infor user disabled
    function handleErro404(err: any) {
        Swal.fire({
            toast: true,
            icon: "error",
            showConfirmButton: false,
            timer: 2000,
            text: err,
            position: 'top-right',
            timerProgressBar: true
        })
    }
    //infor user disabled


    //info token inspired
    async function handleError401(err: any) {

        localStorage.removeItem('T');
        window.location.replace('/');
        Swal.fire({
            toast: true,
            icon: "error",
            showConfirmButton: false,
            timer: 2000,
            text: err,
            position: 'top-right',
            timerProgressBar: true
        })

    }
    async function handleError402(err: any) {

        localStorage.removeItem('T');
        window.location.replace('/');
        Swal.fire({
            toast: true,
            icon: "error",
            showConfirmButton: false,
            timer: 2000,
            text: err,
            position: 'top-right',
            timerProgressBar: true
        })

    }
    //info token inspired


});



export default Api;
