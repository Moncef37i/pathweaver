import React from 'react';
import './Community.css';

const Community = () => {
  const topics = [
    { id: 'announcements', label: 'Announcements', icon: '📢' },
    { id: 'general', label: 'General Discussion', icon: '💬' },
    { id: 'showcase', label: 'Showcase', icon: '✨' },
    { id: 'qa', label: 'Q&A / Help', icon: '❓' }
  ];

  const posts = [
    {
      id: 1,
      author: 'Alex Developer',
      avatar: 'A',
      time: '2 hours ago',
      title: 'Just finished the Advanced React Roadmap!',
      content: 'I finally completed the advanced React roadmap. It was tough but totally worth it. Now looking to apply these skills in some open source projects.',
      tags: ['Showcase', 'React'],
      likes: 42,
      comments: 12
    },
    {
      id: 2,
      author: 'Sarah Coder',
      avatar: 'S',
      time: '5 hours ago',
      title: 'Best resources for learning System Design?',
      content: 'Im prepping for some interviews and wanted to know what your favorite resources are for System Design. Books, courses, articles—drop them below!',
      tags: ['Q&A', 'System Design'],
      likes: 18,
      comments: 34
    },
    {
      id: 3,
      author: 'Admin',
      avatar: '👑',
      time: '1 day ago',
      title: 'New Feature: AI Resume Builder is now live!',
      content: 'We are thrilled to announce that our new AI-powered Resume Builder is available to all premium members. Try it out and let us know what you think.',
      tags: ['Announcements'],
      likes: 156,
      comments: 45
    }
  ];

  return (
    <div className="community-container">
      <aside className="community-sidebar">
        <button className="new-post-btn">
          <span>+</span> New Post
        </button>
        
        <div className="sidebar-section">
          <h3>Topics</h3>
          <ul className="topic-list">
            {topics.map(topic => (
              <li key={topic.id} className="topic-item">
                <span className="topic-icon">{topic.icon}</span>
                <span className="topic-label">{topic.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <main className="community-main">
        <header className="community-header">
          <h1>Community Feed</h1>
          <div className="feed-filters">
            <button className="filter-btn active">Latest</button>
            <button className="filter-btn">Top</button>
          </div>
        </header>

        <div className="posts-feed">
          {posts.map(post => (
            <div key={post.id} className="post-card">
              <div className="post-header">
                <div className="post-avatar">{post.avatar}</div>
                <div className="post-meta">
                  <span className="post-author">{post.author}</span>
                  <span className="post-time">{post.time}</span>
                </div>
              </div>
              <h2 className="post-title">{post.title}</h2>
              <p className="post-excerpt">{post.content}</p>
              <div className="post-tags">
                {post.tags.map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
              <div className="post-footer">
                <button className="action-btn like-btn">
                  <span>👍</span> {post.likes}
                </button>
                <button className="action-btn comment-btn">
                  <span>💬</span> {post.comments}
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Community;
