# 🚀 Modern Developer Portfolio

A cutting-edge software developer portfolio built with **React**, **TypeScript**, **Tailwind CSS**, **Shadcn/ui components**, and **Lucide React icons**. This portfolio features a modern, responsive design that effectively showcases projects, skills, and professional experience.

## ✨ Features

### 🎨 Modern Design
- **Responsive Design**: Optimized for all devices (mobile, tablet, desktop)
- **Dark/Light Theme**: Toggle between themes with smooth transitions
- **Gradient Effects**: Beautiful gradients and visual effects
- **Smooth Animations**: Framer Motion powered animations
- **Glass Morphism**: Modern glassmorphism UI elements

### 🛠️ Technical Stack
- **React 18** with TypeScript for type safety
- **Vite** for lightning-fast development
- **Tailwind CSS** for utility-first styling
- **Shadcn/ui** for consistent, accessible components
- **Lucide React** for beautiful, consistent icons
- **Framer Motion** for smooth animations
- **Radix UI** for accessible component primitives

### 📱 Sections Included
1. **Hero Section**: Eye-catching introduction with call-to-actions
2. **About**: Professional summary with key features and skills overview
3. **Projects**: Showcase of featured and other projects with live demos
4. **Skills**: Interactive skill levels with categorized technical expertise
5. **Experience**: Professional timeline with achievements and technologies
6. **Contact**: Contact form and social media links
7. **Footer**: Additional navigation and professional links

## 🚀 Quick Start

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd Portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:5174`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 🎯 Customization

### Personal Information
Update the following files with your personal information:

1. **Hero Section** (`src/components/Hero.tsx`):
   - Change name, title, and description
   - Update social media links
   - Modify call-to-action buttons

2. **About Section** (`src/components/About.tsx`):
   - Update professional summary
   - Modify skills list
   - Change personal features

3. **Projects Section** (`src/components/Projects.tsx`):
   - Add your actual projects
   - Include real project URLs
   - Update project descriptions and technologies

4. **Experience Section** (`src/components/Experience.tsx`):
   - Add your work experience
   - Update company names, positions, and achievements
   - Modify timeline and descriptions

5. **Contact Section** (`src/components/Contact.tsx`):
   - Update contact information
   - Change social media links
   - Modify contact form handling

### Styling
- **Colors**: Modify CSS variables in `src/index.css`
- **Fonts**: Update font imports in `src/index.css`
- **Components**: Customize component styles in respective files

### Theme Customization
Update the Tailwind configuration in `tailwind.config.js` to modify:
- Color palette
- Typography scales
- Spacing values
- Animation settings

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/              # Reusable UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   └── tabs.tsx
│   ├── Header.tsx       # Navigation header
│   ├── Hero.tsx         # Landing section
│   ├── About.tsx        # About section
│   ├── Projects.tsx     # Projects showcase
│   ├── Skills.tsx       # Skills & expertise
│   ├── Experience.tsx   # Work experience
│   ├── Contact.tsx      # Contact form
│   └── Footer.tsx       # Footer section
├── lib/
│   └── utils.ts         # Utility functions
├── App.tsx              # Main app component
├── main.tsx            # Entry point
└── index.css           # Global styles
```

## 🎨 Component Features

### Header
- Fixed navigation with scroll effects
- Mobile-responsive hamburger menu
- Dark/light theme toggle
- Smooth scroll navigation

### Hero Section
- Animated text and elements
- Social media integration
- Call-to-action buttons
- Particle/gradient backgrounds

### Projects Section
- Featured and regular project cards
- Live demo and source code links
- Technology badges
- Hover effects and animations

### Skills Section
- Tabbed skill categories
- Animated progress bars
- Detailed skill descriptions
- Icon-based categorization

### Experience Timeline
- Chronological work history
- Achievement highlights
- Technology stack per role
- Responsive timeline design

### Contact Form
- Functional contact form
- Social media links
- Contact information display
- Form validation ready

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Deploy automatically on every push
3. Custom domain setup available

### Netlify
1. Build command: `npm run build`
2. Publish directory: `dist`
3. Deploy from GitHub repository

### GitHub Pages
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add deploy script to package.json
3. Run: `npm run deploy`

## 📈 Performance

- **Lighthouse Score**: 90+ on all metrics
- **Bundle Size**: Optimized with code splitting
- **Images**: Lazy loading and optimization
- **Animations**: Hardware accelerated
- **SEO**: Optimized meta tags and structure

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Shadcn/ui** for the beautiful component library
- **Tailwind CSS** for the utility-first CSS framework
- **Lucide** for the consistent icon set
- **Framer Motion** for smooth animations
- **React** and **Vite** for the solid foundation

---

**Made with ❤️ using React, TypeScript, and modern web technologies**
