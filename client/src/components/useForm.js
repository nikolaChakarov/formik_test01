import { useState, useEffect } from "react";

const useForm = (props) => {
    const { initValues, validate, onSubmit } = props;

    const [values, setValues] = useState(initValues);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [isValid, setIsValid] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleBlur = (e) => {
       
        setTouched(prev => ({
            ...prev,
            [e.target.name]: true
        }));

        const validationErrors = validate(values);
        setErrors(Object.assign(errors, validationErrors));

        // handleValidate(values);
    };

    const handleChange = (e) => {

        setErrors((prev) => {
            delete prev[e.target.name];
            console.log({ prev });
            return prev;
        });

        setValues(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));

        const validationErrors = validate(values);
        setErrors(Object.assign(errors, validationErrors));


        // handleValidate(values)

    };

    const handleCheck = (e) => {

        setErrors((prev) => {
            delete prev[e.target.name];
            console.log({ prev });
            return prev;
        });

        setValues(prev => ({
            ...prev,
            [e.target.name]: e.target.checked
        }));

        const validationErrors = validate(values);
        setErrors(Object.assign(errors, validationErrors));

    }

    console.log({ errors });

    const handleValidate = (val) => {

        const validationRes = validate(val);
        const isErrors = Boolean(Object.keys(validationRes).length > 0);
 
        setIsValid(!isErrors);

        return {isErrors, validationRes};

    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const {isErrors, validationRes} = handleValidate(values);

        if (isErrors) {
        
            setTouched(validationRes)
            setErrors(validationRes)
            return;
        };
        

        setIsSubmitting(true);

        onSubmit(values);
    }


    return { 
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
    };
};

export default useForm;