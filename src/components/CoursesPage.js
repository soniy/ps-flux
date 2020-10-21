import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import courseStore from '../stores/courseStore';
import CourseList from './CourseList';
import { loadCourses, deleteCourse } from "../actions/courseAction";
import { loadAuthors } from "../actions/authorAction";
import { toast } from 'react-toastify';
import authorStore from '../stores/authorStore';

export default function CoursesPage() {
    const [courses, setCourses] = useState(courseStore.getCourses());
    const [authors, setAuthors] = useState(authorStore.getAuthors());

    useEffect(() => {
        authorStore.addChangeListener(onAuthorChange);
        if (authors.length === 0) {
            loadAuthors();
        } else {
            setAuthors(authorStore.getAuthors());
        }
        return () => authorStore.removeChangeListener(onAuthorChange);
    }, [authors.length])

    useEffect(() => {
        courseStore.addChangeListener(onChange);
        if (courses.length === 0 || courseStore.getCourses().length === 0) loadCourses();
        return () => courseStore.removeChangeListener(onChange);
    }, [courses.length]);

    function onAuthorChange() {
        setAuthors(authorStore.getAuthors());
    }

    function onChange() {
        setCourses(courseStore.getCourses());
    }

    function deleteCourseOnPage(courseId) {
        deleteCourse(courseId).then(() => {
            toast.error("Course deleted successfully");
        })
    }

    return (
        <>
            <h2>Courses</h2>
            <Link to="/course" className="btn btn-primary">Add Course</Link>
            <CourseList courses={courses} authors={authors} deleteCourse={deleteCourseOnPage} />
        </>
    )

};