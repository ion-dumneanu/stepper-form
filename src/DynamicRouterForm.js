import { useState } from "react";
import { Form } from "react-router-dom";


const DynamicRouterForm = () => {

    const [email, setEmail] = useState("");

    const [name, setName] = useState("");

    const [emailError, setEmailError] = useState(false);

    const [prevExperience, setPrevExperience] = useState("");

    const [hasExperience, setHasExperience] = useState(false);

    const [controls, setControls] = useState([{ type: "text", value: "" }]);


    const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);


    const handleEmailChange = (event) => {

        setEmail(event.target.value);




        if (/\S+@\S+\.\S+/.test(event.target.value)) {

            setEmailError(false);

            setIsSubmitDisabled(false);

        } else {

            setEmailError(true);

            setIsSubmitDisabled(true);

        }

    };

    const handlePrevExperienceChange = (event) => {

        setPrevExperience(event.target.value);

    };

    const handleExperienceChange = (event) => {

        setHasExperience(event.target.checked);

    };




    const handleNameChange = (event) => {

        setName(event.target.value);

    };

    const handleSubmit = (event) => {

        event.preventDefault();

        console.log({ email, name, prevExperience, controls });

    };




    const handleAddControl = () => {

        const auxControls = [...controls];

        auxControls.push({ type: "text", value: "" });

        setControls(auxControls);

    };




    const handleChangeControl = (event, index) => {

        const auxControls = [...controls];

        auxControls[index].value = event.target.value;

        setControls(auxControls);

    };




    return (

        <Form method="post" action="/">

            <div style={{ display: "flex", flexDirection: "column", width: "200px" }}>

                <label>Name:</label>

                <input

                    type="text"

                    name="name"

                    value={name}

                    placeholder="Name"

                    onChange={handleNameChange}

                />

            </div>

            <div style={{ display: "flex", flexDirection: "column", width: "200px" }}>

                <label>Email:</label>

                <input

                    type="email"

                    name="email"

                    value={email}

                    placeholder="Email"

                    onChange={handleEmailChange}

                />

            </div>

            {emailError && (

                <span style={{ color: "red" }}>Email is not valid or empty!</span>

            )}

            <div style={{ display: "flex" }}>

                <label>Has previous experience:</label>

                <input

                    type="checkbox"

                    checked={hasExperience}

                    onChange={handleExperienceChange}

                />

            </div>

            {hasExperience && (

                <div

                    style={{ display: "flex", flexDirection: "column", width: "200px" }}

                >

                    <label>Previous experience:</label>

                    <input

                        type="text"

                        name="prevExperience"

                        value={prevExperience}

                        placeholder=""

                        onChange={handlePrevExperienceChange}

                    />

                </div>

            )}




            {controls.map((control, index) => (

                <div

                    key={index}

                    style={{ display: "flex", flexDirection: "column", width: "200px" }}

                >

                    <label>Control {index + 1}</label>

                    <input

                        type={control.type}

                        value={control.value}

                        onChange={(e) => handleChangeControl(e, index)}

                    />

                </div>

            ))}




            <button type="button" onClick={handleAddControl}>

                +

            </button>

            <button type="submit" disabled={isSubmitDisabled}>

                Save!

            </button>

        </Form>

    );

};

export default DynamicRouterForm;
