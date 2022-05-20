import React from 'react'
import { Formik,Form,Field,ErrorMessage } from 'formik'
import * as Yup from 'yup'
import '../App.css'
import { useDispatch, useSelector } from 'react-redux'
import { action } from './REDUX/Actions'
import { useNavigate } from 'react-router-dom'


const initialValues={
    username:'',
    time:'',
   mode:"",
    category:"",
    question:''
   
}

const validationSchema=Yup.object({
    username:Yup.string().required('Username required !!!'),
    question:Yup.number().typeError('You must specify a number').min(10,'Min question is 10').max(60,'Max question is 60').required('Field required'),
    time:Yup.number().typeError('You must specify a number').min(4,'Min Time is 4').max(40,'Max Time is 40') .required('Please enter Time for test !!'),
    category:Yup.string().required('Please select a category'),
    mode:Yup.string().required('Please select a Mode')
})
function Homepage() {
    const nav = useNavigate()
    // const getStore=useSelector(state=>state.arr)
    // console.log(getStore)
    const dispacth=useDispatch()
const onSubmit=(values,onSubmitProps)=>{
   console.log('for',values)
   onSubmitProps.setSubmitting(false)
   localStorage.setItem('userDetails',JSON.stringify(values))
   dispacth(action(values))
   nav('/quiz-mode')
}
  return (
    <div >
        <div className='container text-center  mt-5 p-5 form-card'  style={{backgroundColor:'lightgrey'}}>
          <h4 style={{fontFamily:"cursive"}} className='text-dark mb-3'><i><u>WELCOME TO QUIZ APP</u></i></h4>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} >
        
         <Form>
        <div>
        <div className="text-danger"><i><ErrorMessage  name='username'/></i></div>
        <Field className='form-control text-center' name='username' placeholder='Enter username'/>
        
        </div>

        <div className='mt-3'>
        <div className="text-danger"><i><ErrorMessage  name='question'/></i></div>
        <Field className='form-control text-center' name='question' placeholder='Number of Question'/>
        
        </div>

        <div className='mt-3'>
        <div className="text-danger"><i><ErrorMessage  name='time'/></i></div>
        <Field className='form-control text-center' name='time' placeholder='Time'/>
        
        </div>
        <div className='mt-3'>
        <div className="text-danger"><i><ErrorMessage  name='category'/></i></div>
        <Field className='form-control text-center' name='category' component='select'>
        <option value=''>Categories</option>
             <option value='9'>General Knowledge</option>
             <option value='17'>Science  & Nature</option>
             <option value='18'>Computer</option>
             <option value='19'>Mathematics</option>
             <option value='21'>Sport</option>
             <option value='24'>Politics</option>
        </Field>
      
        </div>
        <div className='mt-3'>
        <div className="text-danger"><i><ErrorMessage  name='mode'/></i></div>
        <Field className='form-control text-center' name='mode' component='select' >
        <option value=''>Mode</option>
             <option value='easy'>Easy</option>
             <option value='medium'>Medium</option>
             <option value='hard'>Hard</option>
             
        </Field>
        
      
        </div>
        <div className='mt-4'>
        <button type='submit' disabled={Formik.isValid ||Formik.isSubmitting} className='btn btn-success btn-lg'>START</button>
        </div>
         </Form>
        
        </Formik>
         
        
        </div>
    </div>
  )
}

export default Homepage
