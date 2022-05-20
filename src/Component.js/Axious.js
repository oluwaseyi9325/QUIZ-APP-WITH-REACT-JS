import axios from 'axios'
import { useEffect,useState,useRef }  from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import swal from 'sweetalert'


function Axious() {
    const [quest,setQuestion]=useState('')
    const [opt_A,setA]=useState('')
    const [opt_B,setB]=useState('')
    const [opt_C,setC]=useState('')
    const [ans,setAns]=useState('')
    const [nextNum,setNextNum]=useState(0)
    const [disable,setDisplae]=useState(false)
    const [disNext,setDisNext]=useState(0)
    const [showSubmit,setSubmut]=useState(false)
    const [hr,setHr]=useState(11)
    const [sec,setSec]=useState(0)
    const [timeDanger,setTimeDanger]=useState('text-info')
    const [score,setScore]=useState(0)
    const [cc,setCc]=useState(false)
    const [displayScore,setDisplayScore]=useState(0)
    const [validateAnser,setValidateAnswer]=useState('')
    const [network,setNetwork]=useState('')
    const nav=useNavigate()
    const isMounted=useRef();
    
    let getLocal;
    if (!localStorage.getItem('userDetails')) {
        getLocal=[]
    }else{
        getLocal=JSON.parse(localStorage.getItem('userDetails'))
    }
    const [quizTime,setQuizTime]=useState(getLocal.time)
          useEffect(()=>{
              setInterval(()=>{
                    setQuizTime(Number(quizTime)-1)
              },[60000])

          },[quizTime])
         
          const autoSubmut=()=>{
            localStorage.setItem('totalScore',displayScore)
              nav('/scorepage')
          }
          if (quizTime==0) {
            autoSubmut()  
          }else if (quizTime==2) {
              swal(getLocal.username,'You have 2 min left !!!', 'warning')
          }
     
    const nextBtn=()=>{
        if (validateAnser) {
           setDisplayScore(displayScore+1) 
        }
       
        setTimeout(()=>{
            setNextNum(nextNum+1)
        },1000)
        setDisplae(false)  
    }

    const submitBtn=()=>{
        if (window.confirm('You are about to Submit !!!')) {
            localStorage.setItem('totalScore',displayScore)
            nav('/scorepage')
        }
        
    } 
    useEffect(()=>{
        // if (isMounted.current) return;
        
        axios.get(`https://opentdb.com/api.php?amount=${getLocal.question}&category=${getLocal.category}&difficulty=${getLocal.mode}&type=multiple`)
        .then(resonse=>{
            console.log(resonse.data.results)
          console.log(resonse.data.results[nextNum].correct_answer)
          setQuestion(resonse.data.results[nextNum].question)
          setA(resonse.data.results[nextNum].incorrect_answers[0])
          setB(resonse.data.results[nextNum].incorrect_answers[1])
          setC(resonse.data.results[nextNum].incorrect_answers[2])
          setAns(resonse.data.results[nextNum].correct_answer)
        }
        )
        .catch(setNetwork('Loading questions !!!'))

        // isMounted.current=true;
        
    },[nextNum])

    if (disNext==1) {
        setSubmut(true)
    }

    useEffect(()=>{
        setTimeout(() => {
            setNetwork('')
        }, 3000);
    },[network])
    
  return (
    <div className=''>
        <div className=' text-center p-1' style={{backgroundColor:"lightgray"}}>
         <h2 className='text-white'>QUIZ APP </h2>
        </div>
       <div>
        
       <section className='bg-dark container'>
       <div className='bg-white text-center row'>
       
       <div className='col-lg-6 col-sm-7'>
      <table className='table table-bordered'>
        <thead className='bg-dark text-white'>
         <tr>
         <td>USERNAME</td>
         <td><small>SUBTJECT</small></td>
         <td><small>QUESTION</small></td>
         <td>MODE</td>
         </tr>
        </thead>
        <tbody>
         <tr>
         <td>{getLocal.username}</td>
         <td><small>{getLocal.category}</small></td>
         <td>{getLocal.question}</td>
         <td>{getLocal.mode}</td>
         </tr>
        </tbody>
      </table>
     </div>
     <div className='col-lg-6 col-sm-7'>
       <h2 className='bg-dark text-white'>Time: {quizTime} </h2>
       <h3 className='bg-dark text-white'><i>{1+nextNum} / {getLocal.question} questions</i></h3>
      </div>
      
      
       </div>
       
       <div className=" text-white p-4 container" >
        <div className="pb-3" style={{ borderBottom: '5px solid white' }}>
        <p className='text-warning'><i><small>{network}</small></i></p>
             <h2>Question {1+nextNum}</h2>
            <div className="h4 text-info">
            {quest}
            </div>
         </div>
         <div className="row" style={{ borderBottom: '5px solid white' }}>
 
                 <div className="col-6 pt-3 pb-3">
                     <h5>&nbsp;A</h5>
                     <input type='radio'  style={{padding:10}} name='A'   className="form-check-input" onClick={()=>setValidateAnswer('')} value='A' />
                     <label htmlFor="radio1" className='h4'>&nbsp;&nbsp;{opt_A}</label>
                 </div>
 
                 <div className="col-6 pt-3">
                     <h5>&nbsp;B</h5>
                     <input type='radio'  style={{padding:10}} onClick={()=>setValidateAnswer('')} name='A'  className="form-check-input" value='B' />
                     <label htmlFor="radio1" className='h4'>&nbsp;&nbsp;{opt_B}</label>
                 </div>
 
             </div>
             <div className="row pt-3 pb-3" style={{ borderBottom: '5px solid blue' }}>
                 <div className="col-6">
                     <h5>&nbsp;C</h5>
                     <input style={{padding:10}} type='radio' name='A'   className="form-check-input" onClick={()=>setValidateAnswer('')} value='C' />
                     <label htmlFor="radio1" className='h4'>&nbsp;&nbsp;{opt_C}</label>
                 </div>
                 <div className="col-6">
                     <h5>&nbsp;D</h5>
                     <input type='radio'  style={{padding:10}} name='A'  onChange={(e)=>setValidateAnswer(e.target.value)} className="form-check-input" value='D' />
                     <label htmlFor="radio1" className='h4'>&nbsp;&nbsp;{ans}</label>
                 </div>
             </div>
            
            <div className='text-right mt-3' style={{float:"right"}}>
            <button className='btn btn-success btn-lg text-white'   onClick={()=>nextBtn()}>NEXT</button>
            </div>
            <div className='mt-3'>
            <button onClick={()=>submitBtn()} className='btn btn-warning btn-lg text-white' >SUBMIT</button>
            </div>
            <div style={{clear:'both'}}></div>
             </div>  
       
       </section>
     
      
             
            
      
       </div>

       <div className=' p-1 text-center fixed-bottom' style={{backgroundColor:"lightgray"}} >
         <span><i>SHEYNET QUIZ APP</i></span>
       </div>
       </div>
      
   
  )
}

export default Axious
