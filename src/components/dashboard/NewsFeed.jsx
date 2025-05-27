import React, { useState, useEffect } from 'react';
import { ExternalLink, ThumbsUp, MessageSquare, Share2 } from 'lucide-react';
import { useNotifications } from '../../contexts/NotificationContext';

export default function NewsFeed() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addNotification } = useNotifications();

  useEffect(() => {
    fetchArticles();
    // Set up polling for new articles every 30 minutes
    const interval = setInterval(fetchArticles, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const fetchArticles = async () => {
    try {
      // Fetch from a nutrition/dietetics news API
      // For demo, using sample data
      const sampleArticles = [
        {
          id: 1,
          title: "New Study Links Mediterranean Diet to Increased Longevity",
          source: "Journal of Nutrition",
          summary: "Recent research shows strong correlation between Mediterranean dietary patterns and increased life expectancy...",
          image: "https://source.unsplash.com/random/800x600/?mediterranean,food",
          likes: 245,
          comments: 58,
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
        },
        {
          id: 2,
          title: "Plant-Based Proteins: The Future of Sustainable Nutrition",
          source: "Dietetics Today",
          summary: "Exploring the environmental and health impacts of plant-based protein alternatives...",
          image: "https://source.unsplash.com/random/800x600/?vegetables,protein",
          likes: 189,
          comments: 42,
          timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000)
        },
        {
          id: 3,
          title: "AI in Nutrition: Personalized Meal Planning Revolution",
          source: "Tech & Health Weekly",
          summary: "How artificial intelligence is transforming the way we approach personalized nutrition...",
          image: "https://source.unsplash.com/random/800x600/?technology,food",
          likes: 312,
          comments: 73,
          timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000)
        }
      ];

      setArticles(sampleArticles);
      setLoading(false);

      // Notify about new articles
      addNotification({
        message: "New nutrition research articles available!",
        type: "info",
        link: "#dashboard"
      });
    } catch (error) {
      console.error("Error fetching articles:", error);
      setLoading(false);
    }
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) return 'Just now';
    if (hours === 1) return '1 hour ago';
    if (hours < 24) return `${hours} hours ago`;
    return `${Math.floor(hours / 24)} days ago`;
  };

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-32 bg-gray-200 rounded-lg mb-4"></div>
        <div className="h-32 bg-gray-200 rounded-lg mb-4"></div>
        <div className="h-32 bg-gray-200 rounded-lg"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Latest in Nutrition & Dietetics</h2>
        <button
          onClick={fetchArticles}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          Refresh
        </button>
      </div>

      {articles.map((article) => (
        <div key={article.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="aspect-w-16 aspect-h-9">
            <img
              src={article.image}
              alt={article.title}
              className="object-cover w-full h-48"
            />
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-blue-600">{article.source}</span>
              <span className="text-sm text-gray-500">{formatTimestamp(article.timestamp)}</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{article.title}</h3>
            <p className="text-gray-600 mb-4">{article.summary}</p>
            
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex space-x-4">
                <button className="flex items-center text-gray-600 hover:text-blue-600">
                  <ThumbsUp className="w-5 h-5 mr-1" />
                  <span>{article.likes}</span>
                </button>
                <button className="flex items-center text-gray-600 hover:text-blue-600">
                  <MessageSquare className="w-5 h-5 mr-1" />
                  <span>{article.comments}</span>
                </button>
                <button className="flex items-center text-gray-600 hover:text-blue-600">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
              <a
                href="#"
                className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
                onClick={(e) => {
                  e.preventDefault();
                  // Open article in new tab
                  window.open('#', '_blank');
                }}
              >
                Read More
                <ExternalLink className="w-4 h-4 ml-1" />
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
