import React, { useState } from 'react'
import DynamicForm from './DynamicForm';

export default function SteperForm() {

const steps = [
  {
    title:'SIGNUP INFO',
    elements: [
      {name:'email', label: 'Email', type:'email'},
      {name:'password', label: 'Password', type:'password'},
      {name:'confirm_password', label: 'Confirm password', type:'password'} 
    ]
   },
   {
    title:'PERSONAL INFO',
    elements: [
      {name:'username', label: 'User Name', type:'text'},
      {name:'firstname', label: 'First Name', type:'text'},
      {name:'lastname', label: 'Last Name', type:'text'} 
    ]
   },
   {
    title:'PROFESSIONAL INFO',
    elements: [
      {name:'currentCompany', label: 'Current Company', type:'text'},
      {name:'totalExperience', label: 'Total Experience', type:'number'},
      {name:'designation', label: 'Designation', type:'text'} 
    ]
   }
];
  
const [data, setData] = useState([
  {email:'bob@ddd.cc',password:'bob',confirm_password:'bob'},
  {username:'123', firstname:'firstname', lastname:'lastname'},
  {currentCompany:'Signant Health',totalExperience: 5, designation:'Manager'}  
]);

const [index, setIndex] = useState(0); 

  return (
    <div>
      <DynamicForm 
        structure={steps[index]} 
        payload={data[index]} isFirst={index===0} isLast={index===steps.length-1} 
        backAction={()=>setIndex(index-1)} 
        nextAction={
          (step)=>{
            // setData([...data.slice(0,index-1), step, ...data.slice(index+1)]);
            setIndex(index+1)
          }
        } 
      />
    </div>
  )
}
