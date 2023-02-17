import React ,{useState} from 'react'
import { useNavigate } from 'react-router-dom'

import { preview } from '../assets';
import {surpriseMePrompts} from '../constants';
import { FormField,Loader } from '../components';


const CreateTest = () => {
  const navigate=useNavigate();
  const tester = async () => {
    for (let i = 0; i < surpriseMePrompts.length; i++) {
      console.log(i);
      const name='Tural Mammadov'
      let prompt = surpriseMePrompts[i];
      console.log(prompt);
      if(prompt){
        try{
          let response=await fetch('http://localhost:8080/api/v1/dalle',{
            method:'POST',
            headers:{
              'Content-Type':'application/json',
            },
            body:JSON.stringify({prompt:prompt})
          });
  
          let data=await response.json();
  
          let photo=`data:image/jpeg;base64,${data.photo}`
          let form = {
            "name": name,
            "prompt": prompt,
            "photo": photo
          }
          try{
            let response=await fetch('http://localhost:8080/api/v1/post',{
              method:'POST',
              headers:{
                'Content-Type':'application/json',
              },
              body:JSON.stringify(form)
            });
    
            await response.json();
          }
          catch(error){
            alert(error);
          }
        }
        catch(error){
          alert(error);
        }
      }else{
        alert('Please enter a prompt');
      }
    }
  navigate('/');
}
  return (
      <div className='mt-5 flex gap-5'>
        <button
          type='button'
          onClick={tester}
          className="text-white bg-green-700 font-medium rounded-md text-sm w-full
          sm:w-auto px-5 py-2.5 text-center"
        >
          Generate
        </button>
      </div>
      )
}
export default CreateTest