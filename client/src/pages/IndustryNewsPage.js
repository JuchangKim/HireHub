// JC - IndustryNewsPage.js - This page shows list of news, the news show image, title, description, industry, posted date.
//      there are filtering by industry and searching by keyword to find specific news 

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function IndustryNewsPage() {
    const [newsArticles, setNewsArticles] = useState([]); // JC - Store the list of news articles
    const [filteredArticles, setFilteredArticles] = useState([]); // JC - Store the filtered list
    const [keyword, setKeyword] = useState(""); // JC - For searching by keyword
    const [selectedIndustry, setSelectedIndustry] = useState(""); // JC - For filtering by industry
    const navigate = useNavigate(); // JC - Use the navigate hook for navigation

    const industries = ["IT", "Finance", "Health", "Marketing", "Trades", "Engineering"];

    // JC - Fetch the list of news articles when the component mounts
    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/news');
                
                // JC - Since `datePosted` is already formatted on the server side, we don't need to reformat it here
                const sortedArticles = response.data;
                
                setNewsArticles(sortedArticles);
                setFilteredArticles(sortedArticles); // JC - Initially, show all articles
            } catch (error) {
                console.error('Error fetching news:', error);
            }
        };
        fetchNews();
    }, []);

    // JC - Automatically filter the news articles based on keyword and industry when they change
    useEffect(() => {
        const filtered = newsArticles.filter(article => {
            const matchesKeyword = article.title.toLowerCase().includes(keyword.toLowerCase());
            const matchesIndustry = selectedIndustry === "" || article.industry.includes(selectedIndustry);
            return matchesKeyword && matchesIndustry;
        });
        setFilteredArticles(filtered);
    }, [keyword, selectedIndustry, newsArticles]); // JC - Trigger the filtering whenever keyword, selectedIndustry, or newsArticles change

    // JC - Handle clicking on an article by navigating to its detail page
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
                      placeholder="Search by keyword in news title"
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
    <div className="row g-4 d-flex flex-wrap">
        {filteredArticles.length > 0 ? (
            filteredArticles.map((article) => (
                <div className="col-md-6 mb-4 d-flex align-items-stretch" key={article.id} style={{ height: '450px'}}>
                    <div className="card h-100" onClick={() => handleArticleClick(article)} style={{ cursor: 'pointer' }}>
                        <img
                            src={article.imageUrl}
                            alt={article.title}
                            className="img-fluid"
                            style={{ height: '200px', objectFit: 'cover', width: '100%' }}
                        />
                        <div className="card-body d-flex flex-column">
                            <h5 className="card-title" style={{ fontWeight: 'bold', color: 'black', padding: '10px' }}>
                                {article.title}
                            </h5>
                            <p className="text-muted" style={{ padding: '10px' }}>
                                <strong>{article.industry.join(' / ')}</strong> • {article.datePosted}
                            </p>
                            <p className="card-text" style={{ padding: '10px', flexGrow: 1 }}>{article.description}</p>
                        </div>
                    </div>
                </div>
            ))
        ) : (
            <p>No news found.</p>
        )}
    </div>
</div>
  );
}


export default IndustryNewsPage;
