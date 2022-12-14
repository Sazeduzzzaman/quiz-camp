import React, { useState } from 'react';
import './QuizArea.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import swal from 'sweetalert2'

const QuizArea = ({ qu, data }) => {
    // Destructuring  Data from loader
    const { question, correctAnswer, options } = qu;
    // Validate Question Option=> Right Or Wrong
    const [selected, setSelected] = useState()

    const handleCheck = (i) => {
        setSelected(i);
    }

    const handleSelected = (i) => {
        if (selected === i && selected === correctAnswer) {
            return "select";
        } else if (selected === i && selected !== correctAnswer) {
            swal.fire({
                title: 'Wrong Answer!',
                text: 'Please See The Correct Answer',
                icon: 'error',
                confirmButtonText: 'ok'
            })
            return "wrong";
        } else if (i === correctAnswer) {
            return "select";
        }
    }

    // Show the Answer when button clicked 
    const notify = () => {
        toast(correctAnswer, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }

    return (
        <div>
            <div className="container shadow-lg quiz-area w-50 " data-aos="fade-up-left" data-aos-duration="1500">
                <div className='row'>
                    <div className='col-lg-9 text-primary'>
                    </div>
                    <div className='col-lg-3 text-end'>
                        <button onClick={notify} className='border-0 mt-2 bg-transparent text-end bg-primary'><span className=''>Show</span><i className="fa-solid fa-eye-slash fs-5 eye-icons ms-2"></i></button>
                    </div>
                </div>
                <div className='row p-3 text-black'>
                    <div className=''>
                        <h3 className='text-primary'>{data.indexof}</h3>

                        {/* Slice Question for remove <p></p>,
                         Tag so first=> 3(<p>) and last=> -4(</p>) */}

                        <h5 className='text-center questions-title mb-3'>{question.slice(3, -4)}.</h5>

                        <div className='button-container'>
                            {options.map(answerOption => <button
                                onClick={() => handleCheck(answerOption)} className={`quiz-button ${selected && handleSelected(answerOption)}`}
                                key={answerOption}
                                disabled={selected}
                            >{answerOption}</button>)}
                        </div>
                    </div>

                </div>
            </div>
            <ToastContainer
                position="top-center"
                autoClose={1000}
                limit={1}
                closeOnClick
                rtl={false}
                pauseOnHover
            />

        </div>
    );
};

export default QuizArea;