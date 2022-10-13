import useForm from './useForm';

const Form = () => {
    const initValues = {
        defaultValues: true,
        name: '',
        email: '',
        gender: '',
        age: '',
        descr: '',
        country: 'def',
        agree: false
    };

    const validate = (values) => {
        const errors = {};
        const emailReg = new RegExp(/^[a-zA-Z0-9]+@[a-z]+\.[a-z]{2,4}$/);
 
        if(values.defaultValues) {
            return {};
        }

        if (values.name === '') {
            errors.name = 'Name is required'
        }

        if (values.email === '') {
            errors.email = 'Email is required'
        } else if (!emailReg.test(values.email)) {
            errors.email = 'Email format is not correct!'
        }
        
        if (!values.agree) {
            errors.agree = 'You have to agree to submit the form'
        }

        return errors;
    }

    const onSubmit = (values) => {
        setTimeout(() => {
            setIsSubmitting(false);
        }, 500);


        console.log({values});
    }

    const {
        values,
        errors,
        touched,
        isValid,
        isSubmitting,
        setIsSubmitting,
        handleBlur,
        handleChange,
        handleCheck,
        handleSubmit
    } = useForm({ initValues, validate, onSubmit });



  return (
    <div>
        <h3>Formik</h3>
        <div className="form-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '15px'}}>

            <label htmlFor="agree">
                <span>Send Default Values</span>
                <input 
                    type="checkbox"
                    name='defaultValues'
                    checked={values.defaultValues}
                    onChange={handleCheck}
                />
            </label>

           {!values.defaultValues && <div style={{ display: 'flex', flexDirection: 'column', gap: '15px'}}> 

            <label htmlFor="name">
                <span>Name</span>
                <input 
                    type="text"
                    name='name' 
                    placeholder='name'
                    value={values.name}
                    onBlur={handleBlur}
                    onChange={handleChange}
                />
            </label>
            {touched.name && errors.name && <ErrorMsg message={errors.name}/>}

            <label htmlFor="email">
                <span>Email</span>
                <input 
                    type="text"
                    name='email' 
                    placeholder='email'
                    value={values.email}
                    onBlur={handleBlur}
                    onChange={handleChange}
                />
            </label>
            {touched.email && errors.email && <ErrorMsg message={errors.email}/>}

            <label htmlFor="gender">
                <span>Gender</span>
                <p>man</p>
                <input
                    type="radio"
                    name='gender'
                    value={'man'}
                    onChange={handleChange} 
                    onBlur={handleBlur}
                    checked={values.gender === 'man'}            
                    />
                    
                <p>woman</p>
                <input
                    type="radio"
                    name='gender'
                    value={'woman'}
                    onChange={handleChange}
                    checked={values.gender === 'woman'}
                onBlur={handleBlur}/>
            </label>

            <label htmlFor="age">
                <span>Age</span>
                <input
                    type="number"
                    name='age'
                    placeholder='age'
                    min={0}
                    value={values.age}
                    onChange={handleChange} 
                    onBlur={handleBlur}
                />
            </label>

            <div>
            <textarea
                name="descr"
                id=""
                cols="30"
                rows="10"
                value={values.descr}
                onChange={handleChange} 
                onBlur={handleBlur}
                ></textarea>
            </div>

           <div className="select-wrapper">
            <select 
                name="country"
                id=""
                value={values.country}
                onChange={handleChange}
                onBlur={handleBlur}
                defaultChecked={values.country}
            >
                    <option value="def" disabled>Select country</option>
                    <option value="fr">France</option>
                    <option value="bg">Bulgaria</option>
                    <option value="au">Australia</option>
                </select>
           </div>

            <label htmlFor="agree">
                <span>Agree</span>
                <input
                    type="checkbox"
                    name='agree'
                    checked={values.agree}
                    onBlur={handleBlur}
                    onChange={handleCheck}
                    />
            </label>
            {touched.agree && errors.agree && <ErrorMsg message={errors.agree}/>}

            </div>}
            
            <div className="btn-wrapper">
                 <button  
                    onClick={handleSubmit}
                    disabled={!isValid || isSubmitting}
                >Submit</button>
            </div>

        </div>
    </div>
  )
}

const ErrorMsg = (props) => {
    return <div style={{ color: 'red'}}>
        {props.message}
    </div>
}

export default Form