import React, { useEffect, useState } from 'react';
import CourseForm from './CourseForm';
import courseStore from '../stores/courseStore';
import authorStore from '../stores/authorStore';
import * as courseActions from '../actions/courseAction';
import * as authorActions from '../actions/authorAction';

import { toast } from 'react-toastify';


const ManageCoursePage = props => {
    const [errors, setErrors] = useState({});
    const [courses, setCourses] = useState(courseStore.getCourses());
    const [authors, setAuthors] = useState(authorStore.getAuthors());
    const [course, setCourse] = useState({
        id: null,
        slug: "",
        title: "",
        authorId: "",
        category: ""
    })


    useEffect(() => {
        authorStore.addChangeListener(onAuthorsChange);
        if (authors.length === 0) {
            authorActions.loadAuthors();
        } else {
            setAuthors(authorStore.getAuthors());
        }
    }, [authors.length])

    function onAuthorsChange() {
        setAuthors(authorStore.getAuthors());
    }

    useEffect(() => {
        courseStore.addChangeListener(onChange);
        const slug = props.match.params.slug;
        if (courses.length === 0) {
            courseActions.loadCourses();
        } else if (slug) {
            console.log(courseStore.getCourseBySlug(slug));
            if (courseStore.getCourseBySlug(slug) === undefined) {
                props.history.push("/404");
            } else {
                setCourse(courseStore.getCourseBySlug(slug));
            }
        }
        return () => courseStore.removeChangeListener(onChange);
    }, [courses.length, props.history, props.match.params.slug])

    function onChange() {
        setCourses(courseStore.getCourses());
    }
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
        courseActions.saveCourse(course).then(() => {
            props.history.push("/courses");
            toast.success('Course Saved.');
        });
    }

    return (
        <>
            <h2>Manage Course</h2>
            <CourseForm course={course} authors={authors} onChange={handleChange} onSubmit={handleSubmit} errors={errors} />
        </>
    );
}

export default ManageCoursePage;