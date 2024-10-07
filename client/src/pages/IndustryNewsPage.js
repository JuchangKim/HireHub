import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function IndustryNewsPage() {
    const [newsArticles, setNewsArticles] = useState([]); // Store the list of news articles
    const [filteredArticles, setFilteredArticles] = useState([]); // Store the filtered list
    const [keyword, setKeyword] = useState(""); // For searching by keyword
    const [selectedIndustry, setSelectedIndustry] = useState(""); // For filtering by industry
    const navigate = useNavigate(); // Use the navigate hook for navigation

    const industries = ["IT", "Finance", "Health", "Marketing", "Trades", "Engineering"];

    // Fetch the list of news articles when the component mounts
    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/news');
                setNewsArticles(response.data);
                setFilteredArticles(response.data); // Initially, show all articles
            } catch (error) {
                console.error('Error fetching news:', error);
            }
        };
        fetchNews();
    }, []);

    // Automatically filter the news articles based on keyword and industry when they change
    useEffect(() => {
        const filtered = newsArticles.filter(article => {
            const matchesKeyword = article.title.toLowerCase().includes(keyword.toLowerCase());
            const matchesIndustry = selectedIndustry === "" || article.industry.includes(selectedIndustry);
            return matchesKeyword && matchesIndustry;
        });
        setFilteredArticles(filtered);
    }, [keyword, selectedIndustry, newsArticles]); // Trigger the filtering whenever keyword, selectedIndustry, or newsArticles change

    // Handle clicking on an article by navigating to its detail page
    const handleArticleClick = (article) => {
        navigate(`/industry-news/${article.id}`);
    };

    return (
        <div className="container mt-5">
            {/* Search Form */}
            <div className="row mb-4">
                <div className="col-md-6">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by keyword"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                </div>
                <div className="col-md-6">
                    <select
                        className="form-control"
                        value={selectedIndustry}
                        onChange={(e) => setSelectedIndustry(e.target.value)}
                    >
                        <option value="">All Industries</option>
                        {industries.map((industry, index) => (
                            <option key={index} value={industry}>
                                {industry}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* News Articles */}
            <div className="row">
                {filteredArticles.length > 0 ? (
                    filteredArticles.map((article) => (
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
                                    <p className="card-text">{article.description}</p>
                                    <p className="text-muted">{article.datePosted}</p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No articles found.</p>
                )}
            </div>
        </div>
    );
}

export default IndustryNewsPage;
