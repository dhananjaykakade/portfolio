// Content block types for rich blog content
export type ContentBlockType = 'paragraph' | 'heading' | 'image' | 'code' | 'quote' | 'list'

export interface BaseContentBlock {
    id: string
    type: ContentBlockType
    order: number
}

export interface ParagraphBlock extends BaseContentBlock {
    type: 'paragraph'
    content: string
}

export interface HeadingBlock extends BaseContentBlock {
    type: 'heading'
    level: 1 | 2 | 3 | 4 | 5 | 6
    content: string
}

export interface ImageBlock extends BaseContentBlock {
    type: 'image'
    url: string
    alt: string
    caption?: string
}

export interface CodeBlock extends BaseContentBlock {
    type: 'code'
    language: string
    code: string
    filename?: string
}

export interface QuoteBlock extends BaseContentBlock {
    type: 'quote'
    content: string
    author?: string
}

export interface ListBlock extends BaseContentBlock {
    type: 'list'
    ordered: boolean
    items: string[]
}

export type ContentBlock = ParagraphBlock | HeadingBlock | ImageBlock | CodeBlock | QuoteBlock | ListBlock

export interface BlogPost {
    id: string
    slug: string
    title: string
    description: string
    content: string // Markdown content for backward compatibility
    contentBlocks?: ContentBlock[] // New structured content
    image?: Images
    date: string
    readTime: number // in minutes
    tags: string[]
    views: number
    category: string
    excerpt?: string
    published?: boolean // For draft management
    author?: string
    updated_at?: string
}

interface Images{
    url: string
    alt: string
    caption?: string
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "building-scalable-nodejs-apis",
    category: "Backend",
    title: "Building Scalable Node.js APIs: Best Practices and Patterns",
    description: "Learn how to build highly scalable and maintainable Node.js APIs with modern architecture patterns.",
    content: `
# Building Scalable Node.js APIs

In today's digital landscape, building scalable APIs is crucial for handling growing user demands. As a backend developer, I've learned several key practices that can make or break your Node.js applications.

## Architecture Patterns

### Microservices vs Monolith

When starting a new project, the first decision is often about architecture. While microservices offer scalability, they also introduce complexity.

\`\`\`javascript
// Example: Modular route structure
const express = require('express');
const app = express();

const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/products', productRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});
\`\`\`

### Database Optimization

Proper database design is essential for performance. Here are some key considerations:

- **Indexing**: Always index frequently queried fields
- **Connection Pooling**: Use connection pools to handle concurrent requests
- **Caching**: Implement Redis for frequently accessed data

\`\`\`javascript
// Redis caching example
const redis = require('redis');
const client = redis.createClient();

async function getCachedUser(userId) {
  const cachedUser = await client.get(\`user:\${userId}\`);
  if (cachedUser) {
    return JSON.parse(cachedUser);
  }
  
  const user = await User.findById(userId);
  await client.setex(\`user:\${userId}\`, 3600, JSON.stringify(user));
  return user;
}
\`\`\`

## Performance Tips

1. **Use Async/Await** properly
2. **Implement rate limiting**
3. **Use compression middleware**
4. **Monitor and log effectively**

\`\`\`javascript
// Rate limiting with express-rate-limit
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP'
});

app.use(limiter);
\`\`\`

![Node.js API Architecture](https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop)

## Load Testing Results

| Concurrent Users | Response Time | Throughput |
|-----------------|---------------|------------|
| 100             | 120ms         | 850 req/s  |
| 500             | 250ms         | 780 req/s  |
| 1000            | 450ms         | 720 req/s  |

## Conclusion

Building scalable APIs requires careful planning and the right tools. By following these practices, you can create robust applications that grow with your user base.

> **Pro Tip**: Always monitor your API performance in production and set up proper alerting systems.
    `,
    image: {
      url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop",
      alt: "Node.js API Architecture",
      caption: "A visual representation of Node.js API architecture."
    },
    date: "2024-01-15",
    readTime: 8,
    tags: ["Node.js", "Backend", "API Design", "Scalability"],
    views: 0
  },
  {
    id: "2",
    slug: "react-performance-optimization",
    title: "Advanced React Performance Optimization Techniques",
    description: "Discover advanced techniques to optimize your React applications for better user experience.",
    category: "Frontend",
    content: `
# Advanced React Performance Optimization

Performance is a critical aspect of modern web applications. In this post, I'll share advanced techniques I've used to optimize React applications.

## Code Splitting

Dynamic imports and React.lazy can significantly reduce your initial bundle size.

\`\`\`javascript
import React, { Suspense } from 'react';

// Lazy load components
const LazyDashboard = React.lazy(() => import('./components/Dashboard'));
const LazySettings = React.lazy(() => import('./components/Settings'));

function App() {
  const [currentTab, setCurrentTab] = React.useState('dashboard');

  return (
    <div>
      <nav>
        <button onClick={() => setCurrentTab('dashboard')}>Dashboard</button>
        <button onClick={() => setCurrentTab('settings')}>Settings</button>
      </nav>
      
      <Suspense fallback={<div>Loading...</div>}>
        {currentTab === 'dashboard' && <LazyDashboard />}
        {currentTab === 'settings' && <LazySettings />}
      </Suspense>
    </div>
  );
}

export default App;
\`\`\`

## Memoization Techniques

### React.memo

Use React.memo to prevent unnecessary re-renders:

\`\`\`javascript
import React from 'react';

const ExpensiveComponent = React.memo(({ data, onUpdate }) => {
  console.log('ExpensiveComponent rendered');
  
  return (
    <div>
      <h3>{data.title}</h3>
      <p>{data.description}</p>
      <button onClick={onUpdate}>Update</button>
    </div>
  );
});

// Custom comparison function
const areEqual = (prevProps, nextProps) => {
  return prevProps.data.id === nextProps.data.id;
};

export default React.memo(ExpensiveComponent, areEqual);
\`\`\`

### useMemo and useCallback

These hooks are essential for optimizing expensive calculations and preventing unnecessary re-renders.

\`\`\`javascript
import React, { useMemo, useCallback, useState } from 'react';

function UserList({ users, onUserSelect }) {
  const [filter, setFilter] = useState('');
  
  // Memoize filtered users
  const filteredUsers = useMemo(() => {
    return users.filter(user => 
      user.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [users, filter]);
  
  // Memoize callback function
  const handleUserSelect = useCallback((userId) => {
    onUserSelect(userId);
  }, [onUserSelect]);

  return (
    <div>
      <input
        type="text"
        placeholder="Filter users..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      {filteredUsers.map(user => (
        <UserItem
          key={user.id}
          user={user}
          onSelect={handleUserSelect}
        />
      ))}
    </div>
  );
}
\`\`\`

## Virtualization for Large Lists

When dealing with large datasets, virtualization is a must:

\`\`\`javascript
import { FixedSizeList as List } from 'react-window';

const VirtualizedList = ({ items }) => (
  <List
    height={400}
    itemCount={items.length}
    itemSize={50}
    itemData={items}
  >
    {({ index, style, data }) => (
      <div style={style} className="px-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <span>{data[index].name}</span>
          <span>{data[index].email}</span>
        </div>
      </div>
    )}
  </List>
);

export default VirtualizedList;
\`\`\`

![React Performance Optimization](https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop)

## Performance Comparison

| Technique | Bundle Size | Initial Load | Runtime Perf |
|-----------|-------------|--------------|--------------|
| No Optimization | 1.2MB | 3.2s | 45fps |
| Code Splitting | 850KB | 2.1s | 55fps |
| + Memoization | 850KB | 2.1s | 58fps |
| + Virtualization | 860KB | 2.1s | 60fps |

## Best Practices

1. **Keep components small and focused**
2. **Use the production build**
3. **Implement proper error boundaries**
4. **Monitor bundle size regularly**

\`\`\`javascript
// Error Boundary
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
\`\`\`

> **Note**: Always measure performance before and after optimization to validate your changes.

By implementing these techniques, I've achieved up to 60% performance improvements in production applications.
    `,
    image: {
      url: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop",
      alt: "React Performance Optimization",
      caption: "A visual representation of React performance optimization techniques."
    },
    date: "2024-01-10",
    readTime: 6,
    tags: ["React", "Performance", "Frontend", "JavaScript"],
    views: 0
  }
];