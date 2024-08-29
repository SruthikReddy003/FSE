import React, { useEffect, useState, useRef, useCallback } from 'react';
import ArticleCard from '../components/ArticleCard';
import LoadingSpinner from '../components/LoadingSpinner';

const NewsFeed = () => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  const fetchArticles = useCallback(async () => {
    if (loading) return; // Prevent multiple fetches
    setLoading(true);
    console.log(`Fetching page ${page}...`);
    try {
      // Using JSONPlaceholder API for mock data
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${page}`
      );
      const data = await response.json();

      // If the data is empty, set hasMore to false
      if (data.length === 0) {
        setHasMore(false);
      } else {
        setArticles((prevArticles) => [...prevArticles, ...data]);
      }

      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  }, [page, loading]);

  useEffect(() => {
    if (hasMore) {
      fetchArticles();
    }
  }, [fetchArticles, hasMore]);

  const lastArticleElementRef = useCallback(
    (node) => {
      if (loading || !hasMore) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          console.log('Last element in view, loading more...');
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <div className="news-feed">
      {articles.map((article, index) => {
        if (articles.length === index + 1) {
          return (
            <div ref={lastArticleElementRef} key={article.id}>
              <ArticleCard
                title={article.title}
                description={article.body}
              />
            </div>
          );
        } else {
          return (
            <ArticleCard
              key={article.id}
              title={article.title}
              description={article.body}
            />
          );
        }
      })}
      {loading && <LoadingSpinner />}
      {!hasMore && <div>No more articles to load.</div>}
    </div>
  );
};

export default NewsFeed;
