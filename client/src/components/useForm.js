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
        
        handleValidate();
    };

    const handleChange = (e) => {
        setErrors((prev) => {
            delete prev[e.target.name];
            return prev;
        });

        setValues(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));

        handleValidate()

    };

    const handleCheck = (e) => {
        setValues(prev => ({
            ...prev,
            [e.target.name]: e.target.checked
        }))
    }
 
    const handleValidate = () => {

        const validationRes = validate(values);
        const isErrors = Boolean(Object.keys(validationRes).length > 0);
 
        setErrors(Object.assign(errors, validationRes));

        setIsValid(!isErrors);

    }

    const handleSubmit = (e) => {
        e.preventDefault();

        handleValidate(values);

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
        handleValidate,
        handleSubmit
    };
};

export default useForm;