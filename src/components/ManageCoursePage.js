import React, { useEffect, useState } from 'react';
import CourseForm from './CourseForm';
import * as courseApi from '../api/courseApi';
import { toast } from 'react-toastify';

const ManageCoursePage = props => {
    const [errors, setErrors] = useState({});
    const [course, setCourse] = useState({
        id: null,
        slug: "",
        title: "",
        authorId: "",
        category: ""
    })

    useEffect(() => {
        const slug = props.match.params.slug;
        courseApi.getCourseBySlug(slug).then(_course => setCourse(_course));
    }, [props.match.params.slug])

    function handleChange({ target }) {
        const updatedCourse = { ...course, [target.name]: target.value };
        setCourse(updatedCourse);
    }

    function formIsValid() {
        const _errors = {};
        if (course.title.length === 0) _errors.title = "Title is required";
        if (course.authorId.length === 0) _errors.authorId = "Author Id is required";
        if (course.category.length === 0) _errors.category = "Category is required";
        setErrors(_errors);
        return Object.keys(_errors).length === 0;
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (!formIsValid()) return;
        courseApi.saveCourse(course).then(() => {
            props.history.push("/courses");
            toast.success('Course Saved.')
        });
    }

    return (
        <>
            <h2>Manage Course</h2>
            <CourseForm course={course} onChange={handleChange} onSubmit={handleSubmit} errors={errors} />
        </>
    );
}

export default ManageCoursePage;