// seed.js - Populate database with sample data
require('dotenv').config();
const mongoose = require('mongoose');

const Service = require('./models/Service');
const Project = require('./models/Project');
const Testimonial = require('./models/Testimonial');
const Team = require('./models/Team');
const User = require('./models/User');

const SAMPLE_DATA = {
  services: [
    {
      title: 'Web Development',
      slug: 'web-development',
      description: 'Custom web applications built with cutting-edge technologies. We create responsive, fast, and scalable solutions using React, Node.js, and modern frameworks.',
      shortDescription: 'Custom web applications and responsive websites',
      icon: 'globe',
      features: [
        { title: 'React Applications', description: 'Modern SPA development' },
        { title: 'Full Stack', description: 'Frontend to Backend integration' },
        { title: 'API Development', description: 'RESTful API design' },
        { title: 'Database Design', description: 'MongoDB & PostgreSQL expertise' }
      ],
      isFeatured: true,
      order: 1
    },
    {
      title: 'Mobile App Development',
      slug: 'mobile-app-development',
      description: 'Native and cross-platform mobile applications that deliver exceptional user experiences.',
      shortDescription: 'iOS and Android app development',
      icon: 'smartphone',
      features: [
        { title: 'React Native', description: 'Cross-platform development' },
        { title: 'Native Development', description: 'Swift & Kotlin expertise' },
        { title: 'App Store Release', description: 'Complete deployment support' }
      ],
      isFeatured: true,
      order: 2
    },
    {
      title: 'UI/UX Design',
      slug: 'ui-ux-design',
      description: 'Beautiful and intuitive user interfaces that users love. We focus on user experience and modern design principles.',
      shortDescription: 'User interface and experience design',
      icon: 'palette',
      features: [
        { title: 'Wireframing', description: 'Structure and planning' },
        { title: 'Prototyping', description: 'Interactive mockups' },
        { title: 'Design Systems', description: 'Scalable design frameworks' }
      ],
      isFeatured: true,
      order: 3
    },
    {
      title: 'Digital Marketing',
      slug: 'digital-marketing',
      description: 'Comprehensive digital marketing strategies to boost your online presence and reach your target audience.',
      shortDescription: 'SEO, SEM, Social Media & Content Marketing',
      icon: 'trending-up',
      features: [
        { title: 'SEO Optimization', description: 'Search engine ranking' },
        { title: 'Social Media', description: 'Platform management' },
        { title: 'Content Strategy', description: 'Engaging content creation' }
      ],
      isFeatured: false,
      order: 4
    }
  ],
  projects: [
    {
      title: 'E-commerce Platform',
      slug: 'ecommerce-platform',
      description: 'A comprehensive e-commerce platform with payment integration, inventory management, and real-time analytics.',
      shortDescription: 'Full-featured online store',
      image: 'https://via.placeholder.com/600x400?text=E-commerce+Platform',
      category: 'Web Application',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      kpiResults: [
        { metric: 'Sales Growth', value: '300%', description: 'Year-over-year increase' },
        { metric: 'Time to Market', value: '3 months', description: 'From concept to launch' },
        { metric: 'User Adoption', value: '10K+', description: 'Active monthly users' }
      ],
      isFeatured: true,
      client: 'TechRetail Co.',
      caseStudyUrl: '/case-studies/ecommerce-platform'
    },
    {
      title: 'SaaS Analytics Dashboard',
      slug: 'saas-analytics-dashboard',
      description: 'A powerful analytics dashboard for data-driven decision making with real-time insights.',
      shortDescription: 'Real-time analytics platform',
      image: 'https://via.placeholder.com/600x400?text=Analytics+Dashboard',
      category: 'Web Application',
      technologies: ['React', 'D3.js', 'Express', 'PostgreSQL'],
      kpiResults: [
        { metric: 'Data Processing', value: '1M+', description: 'Events processed daily' },
        { metric: 'Query Speed', value: '<100ms', description: 'Average response time' },
        { metric: 'Uptime', value: '99.9%', description: 'System availability' }
      ],
      isFeatured: true,
      client: 'DataViz Analytics',
      caseStudyUrl: '/case-studies/analytics-dashboard'
    },
    {
      title: 'Mobile Fitness App',
      slug: 'mobile-fitness-app',
      description: 'A cross-platform fitness tracking application with workout plans and community features.',
      shortDescription: 'Fitness tracking & training app',
      image: 'https://via.placeholder.com/600x400?text=Fitness+App',
      category: 'Mobile Application',
      technologies: ['React Native', 'Firebase', 'Python'],
      kpiResults: [
        { metric: 'Downloads', value: '500K+', description: 'App store installs' },
        { metric: 'Rating', value: '4.8/5', description: 'User reviews' },
        { metric: 'Daily Active Users', value: '50K+', description: 'Engagement metric' }
      ],
      isFeatured: true,
      client: 'FitLife Inc.'
    }
  ],
  testimonials: [
    {
      name: 'Rajesh Kumar',
      position: 'CEO',
      company: 'TechRetail Co.',
      content: 'Outpro India transformed our business with their innovative web platform. The team was professional, responsive, and delivered beyond expectations.',
      rating: 5,
      image: 'https://via.placeholder.com/100x100?text=Rajesh',
      isFeatured: true
    },
    {
      name: 'Priya Sharma',
      position: 'Product Manager',
      company: 'DataViz Analytics',
      content: 'Excellent work on our analytics dashboard. The UI is intuitive and the performance is outstanding. Highly recommended!',
      rating: 5,
      image: 'https://via.placeholder.com/100x100?text=Priya',
      isFeatured: true
    },
    {
      name: 'Amit Patel',
      position: 'Founder',
      company: 'FitLife Inc.',
      content: 'The team at Outpro India is exceptional. They built our mobile app from scratch and handled everything perfectly. Great communication and expertise.',
      rating: 5,
      image: 'https://via.placeholder.com/100x100?text=Amit',
      isFeatured: true
    },
    {
      name: 'Neha Gupta',
      position: 'CTO',
      company: 'CloudTech Solutions',
      content: 'We were impressed with their technical knowledge and project management. They delivered quality code and met all deadlines.',
      rating: 4,
      image: 'https://via.placeholder.com/100x100?text=Neha',
      isFeatured: false
    }
  ],
  team: [
    {
      name: 'Arjun Singh',
      position: 'Founder & Lead Developer',
      image: 'https://via.placeholder.com/200x200?text=Arjun',
      bio: 'Full-stack developer with 10+ years of experience in building scalable applications.',
      linkedin: 'https://linkedin.com/in/arjunsingh',
      twitter: 'https://twitter.com/arjunsingh',
      isFeatured: true
    },
    {
      name: 'Kavya Mendis',
      position: 'UI/UX Designer',
      image: 'https://via.placeholder.com/200x200?text=Kavya',
      bio: 'Creative designer specializing in user-centered design and modern aesthetics.',
      linkedin: 'https://linkedin.com/in/kavyamendis',
      twitter: 'https://twitter.com/kavyamendis',
      isFeatured: true
    },
    {
      name: 'Vikram Desai',
      position: 'Senior Backend Developer',
      image: 'https://via.placeholder.com/200x200?text=Vikram',
      bio: 'Database expert and backend architect with expertise in cloud technologies.',
      linkedin: 'https://linkedin.com/in/vikramdesai',
      twitter: 'https://twitter.com/vikramdesai',
      isFeatured: true
    },
    {
      name: 'Sneha Bansal',
      position: 'Frontend Developer',
      image: 'https://via.placeholder.com/200x200?text=Sneha',
      bio: 'React specialist and JavaScript expert focused on creating performant UIs.',
      linkedin: 'https://linkedin.com/in/snehabansal',
      twitter: 'https://twitter.com/snehabansal',
      isFeatured: false
    }
  ]
};

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('🔗 Connected to MongoDB');

    // Clear existing data
    await Service.deleteMany({});
    await Project.deleteMany({});
    await Testimonial.deleteMany({});
    await Team.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Seed services
    await Service.insertMany(SAMPLE_DATA.services);
    console.log('✅ Services seeded');

    // Seed projects
    await Project.insertMany(SAMPLE_DATA.projects);
    console.log('✅ Projects seeded');

    // Seed testimonials
    await Testimonial.insertMany(SAMPLE_DATA.testimonials);
    console.log('✅ Testimonials seeded');

    // Seed team
    await Team.insertMany(SAMPLE_DATA.team);
    console.log('✅ Team members seeded');

    // Create default admin user
    const adminExists = await User.findOne({ username: 'admin' });
    if (!adminExists) {
      await User.create({
        username: 'admin',
        password: 'admin123' // Change this in production!
      });
      console.log('✅ Default admin user created (username: admin, password: admin123)');
    }

    console.log('🎉 Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
};

seedDatabase();