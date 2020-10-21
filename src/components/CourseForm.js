import React from "react";
import SelectBox from "./common/SelectBox";
import TextInput from "./common/TextInput";
import PropTypes from "prop-types";

function CourseForm(props) {

    return (
        <form onSubmit={props.onSubmit}>
            <TextInput id="title" label="Title" name="title" value={props.course.title} onChange={props.onChange} error={props.errors.title} />
            <SelectBox id="author" label="Author" name="authorId" value={props.course.authorId || 1} onChange={props.onChange} dropdownlist={props.authors} error={props.errors.authorId} />
            <TextInput id="category" label="Category" name="category" value={props.course.category} onChange={props.onChange} error={props.errors.category} />
            <input type="submit" value="Save" className="btn btn-primary" />
        </form>
    );
}

CourseForm.propTypes = {
    course: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
}

export default CourseForm;
