import { useState } from "react";


const dynamicItemRender = ({name, label, type, value, handleInputChange})=>    
    { console.log(">", value)
        return (<div key={name} style={{ display: "flex", flexDirection: "column", width: "200px" }}>
        <label htmlFor={name}>{label}:</label>
        <input type={type} id={name} placeholder={label} value={value} onChange={handleInputChange}/>
    </div>)
    
    }

const DynamicForm = ({structure, payload, isFirst, isLast, backAction, nextAction}) => {


    const [step, setStep] = useState(payload || {});

    console.log('payload>', payload);

    const handleInputChange = event => {
        console.log(event)
        setStep({...step, [event.target.name]: event.target.value});
        console.log(step)
    }

    const handleSubmit = event => {
        event.preventDefault(); 
        nextAction(step)
    };

    const dynamicFormRender = structure.elements.map(item => dynamicItemRender({...item, value:step[item.name], handleInputChange}))

     return (
        <form onSubmit={handleSubmit} method="post">
            <h2>{structure.title}</h2>
            {dynamicFormRender}
            <button type="button" onClick={backAction}>&lt;Back</button>
            <button type="submit" > Next &gt;</button>
        </form>

    );

};




export default DynamicForm;