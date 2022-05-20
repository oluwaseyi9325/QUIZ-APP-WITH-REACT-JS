import React from 'react'
import '../App.css'
// import swal from '@sweetalert/with-react'
function Scoresheet() {
  
  function kk() {
    // swal("Good job!", "You clicked the button!", "success");
    // 
  }


  // let getLocal=JSON.parse(localStorage.getItem('userDetails'))

  function printBtn() {
    window.print()
  }
  let localDetails=JSON.parse(localStorage.getItem('userDetails'))
  let getExamScore=localStorage.getItem('totalScore')
  return (
    <div className='mt-5  container'>
      <div className=' mt-5 p-4 shadow-lg container form-card'>
      
      <h3 className='text-center' onClick={kk}>QUIZ APPLICATION</h3>
      
      <div className='card mt-3'>
         <div className='card-header text-center'>
          <h6>Performance Scoresheet :-</h6>
         </div>
         <div className='card-header text-center'>
          <h4><span className='text-warning'>Score</span> : <span className='text-info'>{getExamScore}</span> / {localDetails.question}</h4>
         </div>
         <div className='card-body'>
           <ul>
             <li><span><b>Username</b></span>: {localDetails.username}</li>
             <li><b>Subject</b>: {localDetails.category}</li>
             <li><b>Mode</b>: {localDetails.mode}</li>
           </ul>
         </div>
        
         <div className='card-footer '>
           
            <button className='btn btn-warning form-control text-white' onClick={()=>printBtn()}>PRINT SCORE</button>
            
         </div>
      </div>
      
      </div>
    </div>
  )
}

export default Scoresheet
