import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function IndustryNewsPage() {
    const [newsArticles, setNewsArticles] = useState([]); // Store the list of news articles
    const navigate = useNavigate(); // Use the navigate hook for navigation

    // Fetch the list of news articles when the component mounts
    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/news');
                setNewsArticles(response.data);
            } catch (error) {
                console.error('Error fetching news:', error);
            }
        };
        fetchNews();
    }, []);

    // Handle clicking on an article by navigating to its detail page
    const handleArticleClick = (article) => {
        navigate(`/industry-news/${article.id}`);
    };

    return (
        <div className="container mt-5">
            <div className="row">
                {newsArticles.map((article) => (
                    <div className="col-md-4 mb-4" key={article.id}>
                        <div className="card" onClick={() => handleArticleClick(article)} style={{ cursor: 'pointer' }}>
                            <img 
                                src={article.imageUrl} // Use article.imageUrl to display the image
                                alt={article.title} 
                                className="card-img-top" 
                                style={{ height: '200px', objectFit: 'cover' }} // Adjust size and fit
                            />
                            <div className="card-body">
                                <h5 className="card-title">{article.title}</h5>
                                <p className="card-text">{article.description}</p> {/* Updated to use 'description' */}
                                <p className="text-muted">{article.datePosted}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default IndustryNewsPage;
