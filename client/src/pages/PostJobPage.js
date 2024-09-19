// client/src/pages/PostJobPage.js
import React from 'react';
import PostJobForm from '../components/PostJobForm';
import '../components/PostJobForm.css';  

const PostJobPage = () => {
    return (
        <div>
            <h1>Post a New Job</h1>
            <PostJobForm />
        </div>
    );
};

export default PostJobPage;
