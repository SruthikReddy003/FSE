// import React, { useEffect, useState, useRef, useCallback } from 'react';
// import ArticleCard from '../components/ArticleCard';
// import LoadingSpinner from '../components/LoadingSpinner';

// const NewsFeed = () => {
//   const [articles, setArticles] = useState([]);
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [hasMore, setHasMore] = useState(true);
//   const observer = useRef();

//   const fetchArticles = useCallback(async () => {
//     if (loading) return; // Prevent multiple fetches
//     setLoading(true);
//     console.log(`Fetching page ${page}...`);
//     try {
//       // Using JSONPlaceholder API for mock data
//       const response = await fetch(
//         `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${page}`
//       );
//       const data = await response.json();

//       // If the data is empty, set hasMore to false
//       if (data.length === 0) {
//         setHasMore(false);
//       } else {
//         setArticles((prevArticles) => [...prevArticles, ...data]);
//       }

//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       setLoading(false);
//     }
//   }, [page, loading]);

//   useEffect(() => {
//     if (hasMore) {
//       fetchArticles();
//     }
//   }, [fetchArticles, hasMore]);

//   const lastArticleElementRef = useCallback(
//     (node) => {
//       if (loading || !hasMore) return;
//       if (observer.current) observer.current.disconnect();
//       observer.current = new IntersectionObserver((entries) => {
//         if (entries[0].isIntersecting) {
//           console.log('Last element in view, loading more...');
//           setPage((prevPage) => prevPage + 1);
//         }
//       });
//       if (node) observer.current.observe(node);
//     },
//     [loading, hasMore]
//   );

//   return (
//     <div className="news-feed">
//       {articles.map((article, index) => {
//         if (articles.length === index + 1) {
//           return (
//             <div ref={lastArticleElementRef} key={article.id}>
//               <ArticleCard
//                 title={article.title}
//                 description={article.body}
//               />
//             </div>
//           );
//         } else {
//           return (
//             <ArticleCard
//               key={article.id}
//               title={article.title}
//               description={article.body}
//             />
//           );
//         }
//       })}
//       {loading && <LoadingSpinner />}
//       {!hasMore && <div>No more articles to load.</div>}
//     </div>
//   );
// };

// export default NewsFeed;

import React, { useEffect, useState, useRef, useCallback } from 'react';
import ArticleCard from '../components/ArticleCard';
import LoadingSpinner from '../components/LoadingSpinner';

const NewsFeed = () => {
  const [articles, setArticles] = useState([]);
  const [after, setAfter] = useState(null); // This will hold the `after` token for pagination
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  const fetchArticles = useCallback(async () => {
    if (loading) return; // Prevent multiple fetches
    setLoading(true);
    console.log('Fetching posts...');
    try {
      const url = `https://www.reddit.com/r/politics/new.json?limit=10${after ? `&after=${after}` : ''}`;
      const response = await fetch(url);
      const data = await response.json();

      const newArticles = data.data.children.map((child) => child.data);

      setArticles((prevArticles) => [...prevArticles, ...newArticles]);
      setAfter(data.data.after); // Set the `after` token for the next fetch
      setHasMore(data.data.after !== null); // Check if there are more posts to load
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  }, [after, loading]);

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
          setAfter((prevAfter) => prevAfter); // This triggers fetching the next set of posts
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
                description={article.selftext}
              />
            </div>
          );
        } else {
          return (
            <ArticleCard
              key={article.id}
              title={article.title}
              description={article.selftext}
            />
          );
        }
      })}
      {loading && <LoadingSpinner />}
      {!hasMore && <div>No more posts to load.</div>}
    </div>
  );
};

export default NewsFeed;