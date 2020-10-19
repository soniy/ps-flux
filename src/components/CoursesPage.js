import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCourses } from "../api/courseApi";
import CourseList from './CourseList';

export default function CoursesPage() {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        getCourses().then(_courses => setCourses(_courses));
    }, []);

    return (
        <>
            <h2>Courses</h2>
            <Link to="/course" className="btn btn-primary">Add Course</Link>
            <CourseList courses={courses} />
        </>
    )

};