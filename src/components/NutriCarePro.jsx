import React, { useState, useEffect } from 'react';
import ErrorBoundary from '../components/common/ErrorBoundary';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useNotifications } from '../contexts/NotificationContext';
import NotificationBell from './common/NotificationBell';
import NewsFeed from './dashboard/NewsFeed';
import {
  Activity,
  Bell,
  BookOpen,
  Calendar,
  ChevronDown,
  ClipboardList,
  FileText,
  Home,
  LayoutGrid,
  List,
  Menu,
  MessageSquare,
  Plus,
  Search,
  Settings,
  Share2,
  Star,
  Bookmark,
  User,
  Users,
  Utensils,
  X
} from 'lucide-react';

import NewClientModal from './modals/NewClientModal';
import ClientProfileModal from './modals/ClientProfileModal';
import ScheduleSessionModal from './modals/ScheduleSessionModal';
import AppointmentCalendar from './appointments/AppointmentCalendar';
import AppointmentList from './appointments/AppointmentList';
import AppointmentStats from './appointments/AppointmentStats';
import SelectClientModal from './modals/SelectClientModal';
import MealPlans from './mealplans/MealPlans.jsx';
import AssessmentList from './assessments/AssessmentList';
import AssessmentStats from './assessments/AssessmentStats';
import AssessmentForm from './assessments/AssessmentForm';

import ProfileSettings from './settings/ProfileSettings';
import ClientGrid from './clients/ClientGrid';

const NutriCarePro = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState(location.pathname.slice(1) || 'dashboard');

  useEffect(() => {
    const path = location.pathname.slice(1) || 'dashboard';
    setActiveTab(path);
    setShowSidebar(false);
  }, [location]);
  // UI state
  const [showSidebar, setShowSidebar] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);

  // Navigation configuration
  const navigation = [
    { id: 'dashboard', name: 'Dashboard', icon: <Home className="w-5 h-5" /> },
    { id: 'clients', name: 'Clients', icon: <Users className="w-5 h-5" /> },
    { id: 'appointments', name: 'Appointments', icon: <Calendar className="w-5 h-5" /> },
    { id: 'assessments', name: 'Assessments', icon: <ClipboardList className="w-5 h-5" /> },
    { id: 'resources', name: 'Resources', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'messages', name: 'Messages', icon: <MessageSquare className="w-5 h-5" /> },
    { id: 'settings', name: 'Settings', icon: <Settings className="w-5 h-5" /> },
  ];

  // Client state
  const [selectedClient, setSelectedClient] = useState(null);
  const [showNewClientModal, setShowNewClientModal] = useState(false);
  const [showClientProfileModal, setShowClientProfileModal] = useState(false);
  const [clientFilter, setClientFilter] = useState('all');

  // Appointment state
  const [showScheduleSessionModal, setShowScheduleSessionModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showSelectClientModal, setShowSelectClientModal] = useState(false);
  const [isSchedulingNewAppointment, setIsSchedulingNewAppointment] = useState(false);

  // Assessment state
  const [showAssessmentForm, setShowAssessmentForm] = useState(false);
  const [showNewAssessmentForm, setShowNewAssessmentForm] = useState(false);
  const [selectedAssessment, setSelectedAssessment] = useState(null);

  const handleNewClient = (clientData) => {
    // Add new client to the clients list
    const newClient = {
      id: Date.now(), // Temporary ID generation
      ...clientData,
      status: 'Active',
      joinDate: new Date().toISOString(),
    };
    setClients(prevClients => [...prevClients, newClient]);
    setShowNewClientModal(false);
  };

  const handleScheduleSession = (sessionData) => {
    // Add new session to appointments list
    const newSession = {
      id: Date.now(),
      ...sessionData,
      status: 'Scheduled',
      createdAt: new Date().toISOString(),
    };
    setAppointments(prevAppointments => [...prevAppointments, newSession]);
    setShowScheduleSessionModal(false);
    setSelectedDate(null);
  };

  const handleClientSelect = (client) => {
    setSelectedClient(client);
    setShowSelectClientModal(false);
    if (isSchedulingNewAppointment) {
      setShowScheduleSessionModal(true);
    }
  };

  const handleViewClientProfile = (client) => {
    setSelectedClient(client);
    setShowClientProfileModal(true);
  };

  const handleScheduleSessionClient = (client) => {
    setSelectedClient(client);
    setShowScheduleSessionModal(true);
  };

  // Assessment data
  const [assessments, setAssessments] = useState([
    {
      id: 1,
      clientName: 'Sarah Johnson',
      type: 'Initial Assessment',
      date: '2025-05-15',
      status: 'Completed',
      healthGoals: ['Weight management', 'Improve energy levels'],
      currentHealth: 'Generally good, but experiencing fatigue',
      height: 165,
      weight: 68,
      dietaryRestrictions: 'Gluten-free',
      notes: 'Client shows high motivation for lifestyle changes'
    },
    {
      id: 2,
      clientName: 'Mike Thompson',
      type: 'Follow-up Assessment',
      date: '2025-05-20',
      status: 'Pending Review',
      healthGoals: ['Muscle gain', 'Sports nutrition'],
      currentHealth: 'Active lifestyle, training 4x/week',
      height: 180,
      weight: 82,
      dietaryRestrictions: 'None',
      notes: 'Making good progress with strength goals'
    },
    {
      id: 3,
      clientName: 'Emily Davis',
      type: 'Initial Assessment',
      date: '2025-05-25',
      status: 'Scheduled',
      healthGoals: ['Plant-based diet transition', 'Weight loss'],
      currentHealth: 'Good overall health, seeking dietary guidance',
      height: 170,
      weight: 65,
      dietaryRestrictions: 'Vegetarian',
      notes: 'Interested in plant-based nutrition education'
    }
  ]);

  const assessmentStats = {
    total: assessments.length,
    thisMonth: assessments.filter(a => new Date(a.date).getMonth() === new Date().getMonth()).length,
    pending: assessments.filter(a => a.status === 'Pending Review').length,
    completionRate: Math.round((assessments.filter(a => a.status === 'Completed').length / assessments.length) * 100)
  };

  const [appointments, setAppointments] = useState([
    {
      id: 1,
      clientName: 'Sarah Johnson',
      date: new Date(2025, 4, 28),
      time: '10:00',
      duration: 60,
      type: 'Initial Consultation',
      status: 'confirmed',
      notes: 'First-time client, focusing on weight management'
    },
    {
      id: 2,
      clientName: 'Mike Thompson',
      date: new Date(2025, 4, 28),
      time: '14:30',
      duration: 30,
      type: 'Follow-up',
      status: 'confirmed',
      notes: 'Monthly progress check'
    },
    {
      id: 3,
      clientName: 'Emily Davis',
      date: new Date(2025, 4, 29),
      time: '11:00',
      duration: 45,
      type: 'Meal Planning',
      status: 'pending',
      notes: 'Vegetarian diet planning session'
    }
  ]);

  // Nutrition state
  const [nutrition, setNutrition] = useState({
    dailyGoals: {
      calories: 2000,
      protein: 150,
      carbs: 200,
      fat: 65
    },
    currentTotals: {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0
    }
  });

  // Initialize meal plan state with sample data
  const [mealPlanState, setMealPlanState] = useState(Array(7).fill(null).map(() => ({
    breakfast: [
      {
        id: 1,
        name: 'Greek Yogurt Parfait',
        calories: 350,
        protein: 15,
        carbs: 45,
        fat: 12,
        image: 'https://source.unsplash.com/random/400x300/?yogurt,parfait'
      }
    ],
    lunch: [
      {
        id: 2,
        name: 'Quinoa Buddha Bowl',
        calories: 450,
        protein: 18,
        carbs: 65,
        fat: 15,
        image: 'https://source.unsplash.com/random/400x300/?quinoa,bowl'
      }
    ],
    dinner: [
      {
        id: 3,
        name: 'Grilled Salmon with Vegetables',
        calories: 550,
        protein: 35,
        carbs: 25,
        fat: 28,
        image: 'https://source.unsplash.com/random/400x300/?salmon,vegetables'
      }
    ],
    snacks: [
      {
        id: 4,
        name: 'Mixed Nuts and Dried Fruit',
        calories: 200,
        protein: 6,
        carbs: 22,
        fat: 12,
        image: 'https://source.unsplash.com/random/400x300/?nuts,dried-fruit'
      }
    ]
  })));




  // Clients data
  const [clients, setClients] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      phone: '(555) 123-4567',
      age: 32,
      image: 'https://source.unsplash.com/random/200x200/?portrait,woman',
      status: 'active',
      goals: ['Weight management', 'Improve energy levels'],
      dietaryRestrictions: ['Gluten-free'],
      medicalConditions: ['None'],
      startDate: '2025-04-15'
    },
    {
      id: 2,
      name: 'Mike Thompson',
      email: 'mike.t@example.com',
      phone: '(555) 234-5678',
      age: 45,
      image: 'https://source.unsplash.com/random/200x200/?portrait,man',
      status: 'active',
      goals: ['Muscle gain', 'Sports nutrition'],
      dietaryRestrictions: ['None'],
      medicalConditions: ['High blood pressure'],
      startDate: '2025-04-20'
    },
    {
      id: 3,
      name: 'Emily Davis',
      email: 'emily.d@example.com',
      phone: '(555) 345-6789',
      age: 28,
      image: 'https://source.unsplash.com/random/200x200/?portrait,woman',
      status: 'new',
      goals: ['Plant-based diet transition', 'Weight loss'],
      dietaryRestrictions: ['Vegetarian'],
      medicalConditions: ['None'],
      startDate: '2025-05-25'
    }
  ]);



  // Navigation items
  // Resource state
  const [resourceType, setResourceType] = useState('all');
  const [resourceQuery, setResourceQuery] = useState('');
  const [savedResources, setSavedResources] = useState([]);
  const [showAddResourceModal, setShowAddResourceModal] = useState(false);
  const [resourceView, setResourceView] = useState('grid'); // 'grid' or 'list'
  const [resources] = useState([
    {
      id: 1,
      type: 'article',
      title: 'The Impact of Mediterranean Diet on Cardiovascular Health',
      author: 'Dr. Maria Rodriguez',
      organization: 'Journal of Clinical Nutrition',
      description: 'A comprehensive review of recent studies on the Mediterranean diet and its effects on heart health.',
      date: '2025-04-15',
      url: 'https://www.health.harvard.edu/staying-healthy/foods-that-fight-inflammation',
      peerReviewed: true,
      thumbnail: "/images/default-avatar.svg",
      tags: ['Diet', 'Cardiovascular Health', 'Research']
    },
    {
      id: 2,
      type: 'video',
      title: 'Understanding Macro and Micronutrients',
      author: 'Nutrition Academy',
      description: 'An in-depth video course explaining the role of different nutrients in the body.',
      duration: '45 min',
      url: 'https://www.youtube.com/watch?v=nutrition-basics',
      thumbnail: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      views: 15234,
      rating: 4.8,
      tags: ['Nutrition', 'Education', 'Fundamentals']
    },
    {
      id: 3,
      type: 'pdf',
      title: 'Complete Guide to Sports Nutrition',
      author: 'Dr. James Smith',
      organization: 'Sports Science Institute',
      description: 'Comprehensive guide covering nutrition strategies for athletes and active individuals.',
      date: '2025-03-20',
      url: 'https://www.eatright.org/food/nutrition/eating-as-an-athlete/nutrition-for-athletes',
      thumbnail: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      downloads: 3420,
      fileSize: '2.4 MB',
      tags: ['Sports', 'Performance', 'Athletes']
    },
    {
      id: 4,
      type: 'course',
      title: 'Meal Planning Mastery',
      author: 'Chef Sarah Chen',
      organization: 'Culinary Institute',
      description: 'Learn professional techniques for efficient and nutritious meal planning.',
      duration: '4 hours',
      url: 'https://www.coursera.org/learn/meal-planning',
      thumbnail: 'https://images.unsplash.com/photo-1543352634-a1c51d9f1fa7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      tags: ['Meal Planning', 'Cooking', 'Nutrition'],
      modules: 8,
      students: 1205
    },
    {
      id: 5,
      type: 'tool',
      title: 'Nutrition Calculator Pro',
      organization: 'Health Tech Solutions',
      description: 'Advanced calculator for detailed nutritional analysis and meal planning.',
      url: 'https://www.myfitnesspal.com',
      thumbnail: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      tags: ['Calculator', 'Analysis', 'Planning'],
      users: 50000,
      lastUpdated: '2025-05-01'
    },
    {
      id: 6,
      type: 'webinar',
      title: 'Latest Trends in Plant-Based Nutrition',
      author: 'Dr. Emily Wong',
      organization: 'Plant-Based Health Institute',
      description: 'Expert discussion on current research and trends in plant-based nutrition.',
      date: '2025-06-15',
      duration: '90 min',
      url: 'https://www.plantbasednews.org/lifestyle/nutrition',
      thumbnail: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      tags: ['Plant-Based', 'Trends', 'Research'],
      registered: 850
    }
  ]);

  const handleResourceClick = (resource) => {
    if (resource.url) {
      window.open(resource.url, '_blank', 'noopener,noreferrer');
    }
  };

  const renderResources = () => {
    return resources
      .filter(resource => {
        const matchesSearch = resource.title.toLowerCase().includes(resourceQuery.toLowerCase()) ||
          resource.description.toLowerCase().includes(resourceQuery.toLowerCase()) ||
          resource.tags?.some(tag => tag.toLowerCase().includes(resourceQuery.toLowerCase()));
        const matchesType = resourceType === 'all' || resource.type === resourceType;
        return matchesSearch && matchesType;
      })
      .map(resource => (
        <div key={resource.id} 
          className={`bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow
            ${resourceView === 'list' ? 'flex' : ''}`}
          onClick={() => handleResourceClick(resource)}
        >
          {resource.thumbnail && (
            <img
              src={resource.thumbnail}
              alt={resource.title}
              className={resourceView === 'grid' ? 
                "w-full h-48 object-cover" :
                "w-48 h-full object-cover flex-shrink-0"}
            />
          )}
          <div className="p-4 flex-1">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-600"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <h3 className="font-medium text-gray-900">{resource.title}</h3>
                  </a>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {resource.type}
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-500">{resource.description}</p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSavedResources(prev => 
                    prev.includes(resource.id) 
                      ? prev.filter(id => id !== resource.id)
                      : [...prev, resource.id]
                  );
                }}
                className="ml-4 p-1 hover:bg-gray-100 rounded"
              >
                {savedResources.includes(resource.id) ? (
                  <Bookmark className="w-5 h-5 text-blue-600 fill-current" />
                ) : (
                  <Bookmark className="w-5 h-5 text-gray-400" />
                )}
              </button>
            </div>

            <div className="mt-2 flex flex-wrap gap-2">
              {resource.tags?.map(tag => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-3 text-sm text-gray-500 space-y-1">
              {resource.author && (
                <p>By {resource.author}{resource.organization && ` · ${resource.organization}`}</p>
              )}
              {resource.date && <p>Published {new Date(resource.date).toLocaleDateString()}</p>}
              {resource.duration && <p>Duration: {resource.duration}</p>}
              {resource.views && <p>{resource.views.toLocaleString()} views</p>}
              {resource.downloads && <p>{resource.downloads.toLocaleString()} downloads</p>}
              {resource.rating && (
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="ml-1">{resource.rating}</span>
                </div>
              )}
            </div>

            <div className="mt-4 flex space-x-3">
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {resource.type === 'video' ? 'Watch Now' :
                 resource.type === 'pdf' ? 'Download PDF' :
                 resource.type === 'course' ? 'Start Course' :
                 resource.type === 'webinar' ? 'Join Webinar' :
                 resource.type === 'tool' ? 'Open Tool' :
                 'View Resource'}
              </a>
              <button
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={(e) => {
                  e.stopPropagation();
                  navigator.clipboard.writeText(resource.url);
                }}
              >
                <Share2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      ));
  };

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden touch-manipulation">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-50 flex items-center justify-between px-4">
        <button
          onClick={() => setShowSidebar(!showSidebar)}
          className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
        >
          <Menu className="h-6 w-6" />
        </button>
        <div className="flex items-center">
          <img
            src="/images/logo.svg"
            alt="NutriCare Pro"
            className="h-8 w-8"
          />
          <span className="ml-2 text-xl font-semibold text-gray-800">NutriCare Pro</span>
        </div>
        <button
          onClick={() => setShowNotifications(!showNotifications)}
          className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
        >
          <Bell className="h-6 w-6" />
        </button>
      </header>

      <div className="flex h-screen pt-16 lg:pt-0">
        {/* Overlay */}
        {showSidebar && (
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-50 transition-opacity lg:hidden z-40"
            onClick={() => setShowSidebar(false)}
          />
        )}

        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-40 w-64 bg-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${showSidebar ? 'translate-x-0' : '-translate-x-full'}`}
        >
          <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200 lg:border-none">
            <div className="flex items-center">
              <img
                src="/images/logo.svg"
                alt="NutriCare Pro"
                className="h-8 w-8"
              />
              <span className="ml-2 text-xl font-semibold text-gray-800">NutriCare Pro</span>
            </div>
            <button
              onClick={() => setShowSidebar(false)}
              className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto pt-5 pb-4">
            <nav className="px-4 space-y-1">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    navigate(`/${item.id}`);
                    setActiveTab(item.id);
                    setShowSidebar(false);
                  }}
                  className={`group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg w-full transition-colors ${activeTab === item.id ? 'bg-blue-100 text-blue-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
                >
                  {item.icon}
                  <span className="ml-3">{item.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab content */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8 pb-safe">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <div className="bg-white shadow rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900">Upcoming Sessions</h3>
                  <p className="mt-2 text-3xl font-bold text-blue-600">
                    {appointments.filter(a => new Date(a.date) > new Date()).length}
                  </p>
                </div>
                <div className="bg-white shadow rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900">Active Clients</h3>
                  <p className="mt-2 text-3xl font-bold text-blue-600">
                    {clients.filter(c => c.status === 'Active').length}
                  </p>
                </div>
                <div className="bg-white shadow rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900">Pending Assessments</h3>
                  <p className="mt-2 text-3xl font-bold text-blue-600">
                    {assessments.filter(a => a.status === 'Pending Review').length}
                  </p>
                </div>
              </div>
              <NewsFeed />
            </div>
          )}

          {activeTab === 'clients' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Clients</h2>
                <button
                  onClick={() => setShowNewClientModal(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="-ml-1 mr-2 h-5 w-5" />
                  New Client
                </button>
              </div>
              <ClientGrid 
                clients={clients} 
                onViewProfile={handleViewClientProfile}
                onScheduleSession={handleScheduleSessionClient}
              />
            </div>
          )}

          {activeTab === 'appointments' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Appointments</h2>
                <button
                  onClick={() => {
                    setIsSchedulingNewAppointment(true);
                    setShowSelectClientModal(true);
                  }}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="-ml-1 mr-2 h-5 w-5" />
                  Schedule Session
                </button>
              </div>
              <AppointmentStats appointments={appointments} />
              <div className="bg-white shadow rounded-lg p-6">
                <AppointmentCalendar 
                  appointments={appointments}
                  onDateSelect={(date) => {
                    setSelectedDate(date);
                    setIsSchedulingNewAppointment(true);
                    setShowSelectClientModal(true);
                  }}
                />
              </div>
              <AppointmentList 
                appointments={appointments}
                onAppointmentSelect={(appointment) => {
                  setSelectedClient(clients.find(c => c.id === appointment.clientId));
                  setShowScheduleSessionModal(true);
                }}
              />
            </div>
          )}

          {activeTab === 'assessments' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Assessments</h2>
                <button
                  onClick={() => {
                    setSelectedAssessment(null);
                    setShowNewAssessmentForm(true);
                  }}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="-ml-1 mr-2 h-5 w-5" />
                  New Assessment
                </button>
              </div>
              <AssessmentStats assessments={assessments} />
              <AssessmentList 
                assessments={assessments}
                onAssessmentSelect={(assessment) => {
                  setSelectedAssessment(assessment);
                  setShowAssessmentForm(true);
                }}
              />
            </div>
          )}

          {activeTab === 'resources' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Resources</h2>
                <button
                  onClick={() => setShowAddResourceModal(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="-ml-1 mr-2 h-5 w-5" />
                  Add Resource
                </button>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <div className="relative flex-1 max-w-xs">
                  <input
                    type="text"
                    placeholder="Search resources..."
                    value={resourceQuery}
                    onChange={(e) => setResourceQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>
              </div>

              <div className="flex items-center space-x-2 border border-gray-300 rounded-lg p-1">
                <button
                  onClick={() => setResourceView('grid')}
                  className={`p-1.5 rounded ${resourceView === 'grid' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                  title="Grid View"
                >
                  <LayoutGrid className="w-4 h-4 text-gray-600" />
                </button>
                <button
                  onClick={() => setResourceView('list')}
                  className={`p-1.5 rounded ${resourceView === 'list' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                  title="List View"
                >
                  <List className="w-4 h-4 text-gray-600" />
                </button>
              </div>

              <div className="mb-6 flex flex-wrap gap-2">
                {['all', 'article', 'video', 'pdf', 'course', 'tool', 'webinar'].map(type => (
                  <button
                    key={type}
                    onClick={() => setResourceType(type)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium
                      ${resourceType === type
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-100'
                      }`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>

              <div className={resourceView === 'grid' ? 
                "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : 
                "space-y-4"
              }>
                {renderResources()}
              </div>
            </div>
          )}

          {activeTab === 'messages' && (
            <div className="text-center py-12">
              <MessageSquare className="w-12 h-12 mx-auto text-gray-400" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">No Messages</h3>
              <p className="mt-2 text-sm text-gray-500">Your inbox is empty. Messages from clients will appear here.</p>
            </div>
          )}
          {activeTab === 'settings' && <ProfileSettings />}
        </div>
      </div>

      {/* User menu dropdown */}
      {showUserMenu && (
        <div className="origin-top-right absolute right-4 top-20 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <button
            onClick={() => {
              setActiveTab('settings');
              setShowUserMenu(false);
            }}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Settings
          </button>
          <button
            onClick={() => {
              // Handle logout
              setShowUserMenu(false);
            }}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Sign out
          </button>
        </div>
      )}

      {/* Modals */}
      <ClientProfileModal
        isOpen={showClientProfileModal}
        onClose={() => setShowClientProfileModal(false)}
        client={selectedClient}
      />
      <ScheduleSessionModal
        isOpen={showScheduleSessionModal}
        onClose={() => setShowScheduleSessionModal(false)}
        client={selectedClient}
        onSave={handleScheduleSession}
      />
      <SelectClientModal
        isOpen={showSelectClientModal}
        onClose={() => {
          setShowSelectClientModal(false);
          setIsSchedulingNewAppointment(false);
        }}
        onSelect={handleClientSelect}
        clients={clients}
      />
      <AssessmentForm
        isOpen={showAssessmentForm || showNewAssessmentForm}
        assessment={selectedAssessment}
        onClose={() => {
          setShowAssessmentForm(false);
          setShowNewAssessmentForm(false);
          setSelectedAssessment(null);
        }}
      />
    </div>
  );
};

export default NutriCarePro;
