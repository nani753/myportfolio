import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  ChevronDown, 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Linkedin, 
  ExternalLink,
  Download,
  Code,
  Database,
  Globe,
  Award,
  BookOpen,
  Briefcase,
  User,
  Home,
  GraduationCap,
  Trophy,
  Target,
  Lightbulb,
  Cpu,
  Zap,
  Bot,
  Star,
  ArrowRight,
  CheckCircle,
  Send
} from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isVisible, setIsVisible] = useState<{[key: string]: boolean}>({});
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'education', 'achievements', 'contact'];
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
          }
        }
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    // Intersection Observer for animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = ['home', 'about', 'skills', 'projects', 'experience', 'education', 'achievements', 'contact'];
    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) observer.observe(element);
    });

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const downloadResume = () => {
    const link = document.createElement('a');
    link.href = '/myresume.pdf';
    link.download = 'Nageswara_Rao_Papeneni_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch('https://formspree.io/f/mnnvyjyl', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
        },
      });

      if (response.ok) {
        setFormStatus('success');
        form.reset();
        // Reset form status after 5 seconds
        setTimeout(() => {
          setFormStatus('idle');
        }, 5000);
      } else {
        setFormStatus('error');
        setTimeout(() => {
          setFormStatus('idle');
        }, 5000);
      }
    } catch (error) {
      setFormStatus('error');
      setTimeout(() => {
        setFormStatus('idle');
      }, 5000);
    }
  };

  const skills = [
    { name: 'HTML/CSS', level: 90, icon: Globe },
    { name: 'JavaScript', level: 85, icon: Code },
    { name: 'TypeScript', level: 80, icon: Code },
    { name: 'React.js', level: 85, icon: Code },
    { name: 'Node.js', level: 75, icon: Code },
    { name: 'Git/GitHub', level: 85, icon: Code },
    { name: 'Netlify', level: 80, icon: Globe },
    { name: 'AI Tools', level: 85, icon: Bot },
  ];

  const projects = [
    {
      title: 'Quadcopter Control System',
      description: 'Final year project involving design and development of a quadcopter with advanced flight control systems. Implemented autonomous navigation and real-time monitoring capabilities.',
      tech: ['Arduino', 'C++', 'Sensors', 'Control Systems'],
      github: '#',
      demo: '#',
      image: 'https://images.pexels.com/photos/442587/pexels-photo-442587.jpeg?auto=compress&cs=tinysrgb&w=600',
      type: 'Final Year Project'
    },
    {
      title: 'RjLinks Website',
      description: 'Real-time client project developed during internship at Sepnoty Technologies. A comprehensive business website with modern UI/UX, responsive design, and interactive features.',
      tech: ['React.js', 'TypeScript', 'CSS3', 'Netlify'],
      github: '#',
      demo: '#',
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600',
      type: 'Client Project'
    },
    {
      title: 'AI-Powered Web Applications',
      description: 'Multiple web applications built using AI tools like ChatGPT, Bolt.ai, and Claude.ai. Demonstrates proficiency in leveraging AI for rapid development and problem-solving.',
      tech: ['React.js', 'JavaScript', 'AI Tools', 'GitHub'],
      github: '#',
      demo: '#',
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600',
      type: 'AI-Assisted Projects'
    }
  ];

  const experiences = [
    {
      title: 'BPO Intern & Frontend Developer',
      company: 'Sepnoty Technologies Private Limited',
      duration: '2024',
      description: 'Dual role involving BPO operations and comprehensive frontend development training. Learned HTML, CSS, JavaScript, TypeScript, and Node.js with exceptional company support. Successfully delivered RjLinks website as a real client project.',
      skills: ['HTML/CSS', 'JavaScript', 'TypeScript', 'Node.js', 'React.js', 'Client Project'],
      type: 'Training & Client Project'
    },
    {
      title: 'Frontend Web Developer Intern',
      company: 'Airbaclabs',
      duration: '2024',
      description: 'Focused on learning fundamental web development concepts. Gained hands-on experience with HTML, CSS, and JavaScript basics. Created basic websites to strengthen foundational skills.',
      skills: ['HTML/CSS', 'JavaScript', 'Basic Web Development'],
      type: 'Foundation Learning'
    }
  ];

  const achievements = [
    {
      title: 'Successful Final Year Project',
      description: 'Completed complex Quadcopter project demonstrating technical and project management skills',
      icon: Cpu,
      year: '2024'
    },
    {
      title: 'Client Project Delivery',
      description: 'Successfully delivered RjLinks website to client during Sepnoty internship',
      icon: Trophy,
      year: '2024'
    },
    {
      title: 'AI Tool Proficiency',
      description: 'Mastered multiple AI development tools for efficient web development',
      icon: Bot,
      year: '2024'
    },
    {
      title: 'Cross-Domain Expertise',
      description: 'Successfully transitioned from ECE to Web Development with company support',
      icon: Zap,
      year: '2024'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-x-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div 
          className="absolute w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
            left: '10%',
            top: '10%'
          }}
        ></div>
        <div 
          className="absolute w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"
          style={{
            transform: `translate(${mousePosition.x * -0.02}px, ${mousePosition.y * -0.02}px)`,
            right: '10%',
            top: '20%'
          }}
        ></div>
        <div 
          className="absolute w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"
          style={{
            transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`,
            left: '20%',
            bottom: '10%'
          }}
        ></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md z-50 shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="font-bold text-xl text-gray-900 animate-slide-in-left">
              Nageswara Rao Papeneni
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-6 animate-slide-in-right">
              {[
                { name: 'Home', id: 'home', icon: Home },
                { name: 'About', id: 'about', icon: User },
                { name: 'Skills', id: 'skills', icon: Code },
                { name: 'Projects', id: 'projects', icon: Briefcase },
                { name: 'Experience', id: 'experience', icon: Award },
                { name: 'Education', id: 'education', icon: BookOpen },
                { name: 'Achievements', id: 'achievements', icon: Trophy },
                { name: 'Contact', id: 'contact', icon: Mail }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-300 text-sm transform hover:scale-105 ${
                    activeSection === item.id
                      ? 'bg-blue-100 text-blue-600 shadow-md'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  <item.icon size={16} />
                  <span>{item.name}</span>
                </button>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition-colors duration-200"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t animate-slide-down">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {[
                { name: 'Home', id: 'home' },
                { name: 'About', id: 'about' },
                { name: 'Skills', id: 'skills' },
                { name: 'Projects', id: 'projects' },
                { name: 'Experience', id: 'experience' },
                { name: 'Education', id: 'education' },
                { name: 'Achievements', id: 'achievements' },
                { name: 'Contact', id: 'contact' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors duration-200"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className={`transition-all duration-1000 ${isVisible.home ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}>
            <div className="mb-8">
              {/* Profile Image */}
              <div className="relative w-40 h-40 mx-auto mb-8">
                <div className="w-full h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-1 animate-pulse-slow">
                  <img 
                    src="/PROFF.jpg" 
                    alt="Nageswara Rao Papeneni"
                    className="w-full h-full rounded-full object-cover border-4 border-white shadow-2xl hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                  <CheckCircle size={20} className="text-white" />
                </div>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4 animate-text-shimmer bg-gradient-to-r from-gray-900 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                Nageswara Rao Papeneni
              </h1>
              <p className="text-xl md:text-2xl text-blue-600 mb-4 animate-fade-in-up animation-delay-300">
                Frontend Web Developer | ECE Graduate 2025
              </p>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8 animate-fade-in-up animation-delay-500">
                Passionate ECE graduate with hands-on experience in frontend development. 
                Skilled in React.js, TypeScript, and modern web technologies with real client project experience.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up animation-delay-700">
              <button
                onClick={() => scrollToSection('contact')}
                className="group px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105"
              >
                <Mail size={20} />
                <span>Hire Me</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
              </button>
              <button 
                onClick={downloadResume}
                className="group px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300 flex items-center space-x-2 hover:shadow-lg transform hover:-translate-y-1 hover:scale-105"
              >
                <Download size={20} className="group-hover:animate-bounce" />
                <span>Download Resume</span>
              </button>
            </div>
          </div>
          
          <div className="mt-16 animate-bounce">
            <ChevronDown size={32} className="mx-auto text-blue-600" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible.about ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">About Me</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className={`transition-all duration-1000 animation-delay-300 ${isVisible.about ? 'animate-slide-in-left' : 'opacity-0 -translate-x-10'}`}>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">ECE Graduate Turned Web Developer</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                I'm a 2025 BTech Electronics and Communication Engineering graduate who discovered my passion 
                for web development during my academic journey. Through dedicated internships and self-learning, 
                I've successfully transitioned into frontend development.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                My unique background in ECE gives me a strong analytical mindset and problem-solving approach, 
                which I apply to create efficient and user-friendly web applications. I've gained practical 
                experience through real client projects and have mastered modern development tools including AI-assisted development.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                {[
                  { icon: Mail, text: 'nageswararaopapeneni@gmail.com' },
                  { icon: Phone, text: '+91 6281836185' },
                  { icon: MapPin, text: 'Khammam, Telangana, India' },
                  { icon: GraduationCap, text: 'BTech ECE - 2025' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200 hover:scale-105 transform">
                    <item.icon size={18} className="text-blue-600" />
                    <span className="text-gray-700 text-sm">{item.text}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <h4 className="font-semibold text-gray-900 mb-4">Career Objectives</h4>
                <div className="space-y-3">
                  {[
                    'Leverage my ECE background and web development skills in innovative projects',
                    'Continue growing expertise in modern frontend frameworks and technologies',
                    'Contribute to meaningful projects that make a real impact'
                  ].map((objective, index) => (
                    <div key={index} className="flex items-start space-x-3 group">
                      <Target size={16} className="text-blue-600 mt-1 group-hover:scale-110 transition-transform duration-200" />
                      <span className="text-gray-600 text-sm">{objective}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className={`relative transition-all duration-1000 animation-delay-500 ${isVisible.about ? 'animate-slide-in-right' : 'opacity-0 translate-x-10'}`}>
              <div className="aspect-square bg-gradient-to-br from-blue-400 to-purple-600 rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
                <img 
                  src="/PROFF.jpg"  
                  alt="Profile"
                  className="w-full h-full object-cover opacity-90"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg animate-pulse-slow">
                <Code size={32} className="text-blue-600" />
              </div>
              <div className="absolute -top-6 -left-6 w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                <Star size={20} className="text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-gray-50 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible.skills ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Technical Skills</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Skills developed through internships, client projects, and continuous learning
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <div 
                key={skill.name} 
                className={`bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-500 hover:-translate-y-2 group ${
                  isVisible.skills ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <skill.icon size={24} className="text-blue-600 group-hover:scale-110 transition-transform duration-200" />
                    <h3 className="font-semibold text-gray-900">{skill.name}</h3>
                  </div>
                  <span className="text-sm text-gray-500 font-medium">{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-2000 ease-out transform origin-left"
                    style={{ 
                      width: isVisible.skills ? `${skill.level}%` : '0%',
                      animationDelay: `${index * 200}ms`
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible.projects ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Projects</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Real projects that demonstrate my technical capabilities and problem-solving skills
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div 
                key={index} 
                className={`bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden border border-gray-100 group ${
                  isVisible.projects ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="aspect-video bg-gradient-to-br from-blue-400 to-purple-600 overflow-hidden relative">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover opacity-90 group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-white/90 text-blue-800 text-xs rounded-full font-medium backdrop-blur-sm">
                      {project.type}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200">{project.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, techIndex) => (
                      <span key={techIndex} className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full hover:bg-blue-200 transition-colors duration-200">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-4">
                    <a href={project.github} className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors duration-200 group/link">
                      <Github size={16} className="group-hover/link:scale-110 transition-transform duration-200" />
                      <span className="text-sm">Code</span>
                    </a>
                    <a href={project.demo} className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors duration-200 group/link">
                      <ExternalLink size={16} className="group-hover/link:scale-110 transition-transform duration-200" />
                      <span className="text-sm">Demo</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 bg-gray-50 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible.experience ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Professional Experience</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hands-on experience gained through internships and real client projects
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-8">
            {experiences.map((exp, index) => (
              <div 
                key={index} 
                className={`bg-white rounded-xl shadow-sm p-8 hover:shadow-lg transition-all duration-500 group ${
                  isVisible.experience ? 'animate-slide-in-left' : 'opacity-0 -translate-x-10'
                }`}
                style={{ animationDelay: `${index * 300}ms` }}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Briefcase size={20} className="text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">{exp.title}</h3>
                        <p className="text-lg text-blue-600">{exp.company}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-sm text-gray-500">{exp.duration}</span>
                        <div className="mt-1">
                          <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                            {exp.type}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4 leading-relaxed">{exp.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill, skillIndex) => (
                        <span key={skillIndex} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors duration-200">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible.education ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Education</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className={`bg-white rounded-xl shadow-sm p-8 hover:shadow-lg transition-all duration-500 group ${
              isVisible.education ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
            }`}>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <GraduationCap size={20} className="text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                    Bachelor of Technology (BTech)
                  </h3>
                  <p className="text-lg text-blue-600 mb-2">Electronics and Communication Engineering</p>
                  <p className="text-gray-600 mb-4">
                    Engineering College • 2021 - 2025
                  </p>
                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    {[
                      { label: 'Status', value: 'Graduated' },
                      { label: 'Specialization', value: 'ECE' },
                      { label: 'Year', value: '2025' }
                    ].map((item, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg text-center hover:bg-gray-100 transition-colors duration-200 transform hover:scale-105">
                        <p className="text-sm text-gray-600 mb-1">{item.label}</p>
                        <p className="text-2xl font-bold text-gray-900">{item.value}</p>
                      </div>
                    ))}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Key Highlights:</h4>
                    <div className="flex flex-wrap gap-2">
                      {[
                        'Final Year Project: Quadcopter',
                        'Electronics & Communication',
                        'Signal Processing',
                        'Digital Systems',
                        'Microprocessors',
                        'Communication Systems',
                        'Control Systems',
                        'VLSI Design'
                      ].map((course, index) => (
                        <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full hover:bg-blue-200 transition-colors duration-200">
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="py-20 bg-gray-50 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible.achievements ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Key Achievements</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Notable accomplishments in academics, projects, and professional development
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {achievements.map((achievement, index) => (
              <div 
                key={index} 
                className={`bg-white p-6 rounded-xl hover:shadow-lg transition-all duration-500 group ${
                  isVisible.achievements ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <achievement.icon size={20} className="text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">{achievement.title}</h3>
                      <span className="text-sm text-blue-600 font-medium">{achievement.year}</span>
                    </div>
                    <p className="text-gray-600 text-sm">{achievement.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible.contact ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Let's Connect</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Ready to bring my skills and enthusiasm to your team. Let's discuss how I can contribute to your projects!
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div className={`space-y-6 transition-all duration-1000 animation-delay-300 ${isVisible.contact ? 'animate-slide-in-left' : 'opacity-0 -translate-x-10'}`}>
                {[
                  { icon: Mail, label: 'Email', value: 'nageswararaopapeneni@gmail.com' },
                  { icon: Phone, label: 'Phone', value: '+91 6281836185' },
                  { icon: MapPin, label: 'Location', value: 'Khammam, Telangana, India' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 group">
                    <item.icon size={24} className="text-blue-600 group-hover:scale-110 transition-transform duration-200" />
                    <div>
                      <p className="font-semibold text-gray-900">{item.label}</p>
                      <p className="text-gray-600">{item.value}</p>
                    </div>
                  </div>
                ))}
                
                <div className="flex space-x-4">
                  <a 
                    href="https://www.linkedin.com/in/nageswara-rao-papeneni-53798524b/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110"
                  >
                    <Linkedin size={20} />
                  </a>
                  <a 
                    href="https://github.com/nani753" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110"
                  >
                    <Github size={20} />
                  </a>
                </div>
              </div>
              
              <div className={`transition-all duration-1000 animation-delay-500 ${isVisible.contact ? 'animate-slide-in-right' : 'opacity-0 translate-x-10'}`}>
                <form
                  onSubmit={handleFormSubmit}
                  className="space-y-6 bg-gray-50 p-6 rounded-xl shadow-sm relative overflow-hidden"
                >
                  {/* Success/Error Overlay */}
                  {formStatus !== 'idle' && (
                    <div className={`absolute inset-0 bg-white/95 backdrop-blur-sm flex items-center justify-center z-10 transition-all duration-500 ${
                      formStatus === 'success' ? 'animate-fade-in' : formStatus === 'error' ? 'animate-fade-in' : ''
                    }`}>
                      <div className="text-center p-8">
                        {formStatus === 'submitting' && (
                          <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                        )}
                        {formStatus === 'success' && (
                          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                            <CheckCircle size={32} className="text-white" />
                          </div>
                        )}
                        {formStatus === 'error' && (
                          <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                            <X size={32} className="text-white" />
                          </div>
                        )}
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {formStatus === 'submitting' && 'Sending Message...'}
                          {formStatus === 'success' && 'Message Sent Successfully!'}
                          {formStatus === 'error' && 'Something Went Wrong'}
                        </h3>
                        <p className="text-gray-600">
                          {formStatus === 'submitting' && 'Please wait while we send your message.'}
                          {formStatus === 'success' && 'Thank you for reaching out! I\'ll get back to you soon.'}
                          {formStatus === 'error' && 'Please try again or contact me directly via email.'}
                        </p>
                      </div>
                    </div>
                  )}

                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      disabled={formStatus === 'submitting'}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200 hover:border-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      disabled={formStatus === 'submitting'}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200 hover:border-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      disabled={formStatus === 'submitting'}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200 hover:border-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="Tell me about the opportunity..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={formStatus === 'submitting'}
                    className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
                  >
                    {formStatus === 'submitting' ? (
                      <>
                        <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © 2025 Nageswara Rao Papeneni. ECE Graduate | Frontend Developer. Built with React & TypeScript.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;