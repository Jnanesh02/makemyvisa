import React,{useState} from 'react'

export const Immigration = () => {
    const initialData = {
        name: '',
        email:'',
        phoneNumber:'',
        description: '',
        countryIn:'',
        countryout:'',
        date: '',
        time: ''
    }
    const [formData, setFormData] = useState(initialData);

    const onchangeInput = (event) => {
        event.preventDefault();
        const {name,value} = event.target;
        setFormData((prevData)=>({
            ...prevData,
            [name]:value
        }));
    };
    
  return (
    <div>immigration</div>
  )
}
