import React, { useState } from 'react';
import {
  Activity,
  Bell,
  Calendar,
  ChevronDown,
  ClipboardList,
  FileText,
  Home,
  Menu,
  MessageSquare,
  Plus,
  Search,
  Settings,
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
import RecipeCard from './mealplans/RecipeCard';
import MealPlanCalendar from './mealplans/MealPlanCalendar';
import RecipeDetails from './mealplans/RecipeDetails';
import NutritionSummary from './mealplans/NutritionSummary';
import AddMealModal from './mealplans/AddMealModal';
import AssessmentList from './assessments/AssessmentList';
import AssessmentStats from './assessments/AssessmentStats';
import AssessmentForm from './assessments/AssessmentForm';
import ResourceFilter from './resources/ResourceFilter';
import ResourceSearch from './resources/ResourceSearch';
import ResourceGrid from './resources/ResourceGrid';
import ProfileSettings from './settings/ProfileSettings';

const NutriCarePro = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showSidebar, setShowSidebar] = useState(true);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [clientFilter, setClientFilter] = useState('all');
  const [showNewClientModal, setShowNewClientModal] = useState(false);
  const [showClientProfileModal, setShowClientProfileModal] = useState(false);
  const [showScheduleSessionModal, setShowScheduleSessionModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showSelectClientModal, setShowSelectClientModal] = useState(false);
  const [isSchedulingNewAppointment, setIsSchedulingNewAppointment] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showAddMealModal, setShowAddMealModal] = useState(false);
  const [selectedMealDay, setSelectedMealDay] = useState(null);
  const [selectedMealType, setSelectedMealType] = useState(null);
  const [selectedWeek, setSelectedWeek] = useState(new Date());
  const [showAssessmentForm, setShowAssessmentForm] = useState(false);
  const [showNewAssessmentForm, setShowNewAssessmentForm] = useState(false);
  const [selectedAssessment, setSelectedAssessment] = useState(null);

  // Resources state
  const [resourceType, setResourceType] = useState('all');
  const [resourceQuery, setResourceQuery] = useState('');
  const [savedResources, setSavedResources] = useState([]);

  const [resources] = useState([
    {
      id: 1,
      type: 'website',
      title: 'Google',
      organization: 'Google',
      description: 'Search Engine',
      url: 'https://www.google.com',
      peerReviewed: false
    },
    {
      id: 2,
      type: 'website',
      title: 'YouTube',
      organization: 'Google',
      description: 'Video Platform',
      url: 'https://www.youtube.com',
      peerReviewed: false
    },
    {
      id: 3,
      type: 'website',
      title: 'GitHub',
      organization: 'Microsoft',
      description: 'Code Repository',
      url: 'https://www.github.com',
      peerReviewed: false
    },
    {
      id: 4,
      type: 'organization',
      title: 'Academy of Nutrition and Dietetics',
      organization: 'Academy of Nutrition and Dietetics',
      description: 'World\'s largest organization of food and nutrition professionals, providing expert nutrition resources.',
      url: 'https://www.eatright.org/'
    },
    {
      id: 5,
      type: 'article',
      title: 'Mediterranean Diet for Heart Health',
      author: 'Mayo Clinic Staff',
      date: '2024-03-10',
      description: 'Learn about the heart-healthy benefits of the Mediterranean diet and how to get started.',
      url: 'https://www.mayoclinic.org/healthy-lifestyle/nutrition-and-healthy-eating/in-depth/mediterranean-diet/art-20047801',
      peerReviewed: true
    },
    {
      id: 6,
      type: 'video',
      title: 'Meal Prep with Gordon Ramsay',
      author: 'Gordon Ramsay',
      duration: '12 mins',
      description: 'Learn professional meal prep techniques and healthy recipes from celebrity chef Gordon Ramsay.',
      url: 'https://www.youtube.com/watch?v=YfxQNCDYGSk'
    },
    {
      id: 7,
      type: 'website',
      title: 'Nutrition.gov',
      organization: 'U.S. Department of Health and Human Services',
      description: 'Reliable information about nutrition, healthy eating, physical activity, and food safety.',
      url: 'https://www.nutrition.gov/'
    },
    {
      id: 8,
      type: 'organization',
      title: 'World Health Organization - Nutrition',
      organization: 'World Health Organization',
      description: 'Global nutrition guidelines, research, and recommendations from the WHO.',
      url: 'https://www.who.int/health-topics/nutrition'
    },
    {
      id: 9,
      type: 'article',
      title: 'The Science of Protein Requirements',
      author: 'Examine.com Research Team',
      date: '2024-02-15',
      description: 'Evidence-based analysis of protein requirements for different populations and activity levels.',
      url: 'https://examine.com/guides/protein-intake/',
      peerReviewed: true
    },
    {
      id: 10,
      type: 'video',
      title: 'Understanding Food Labels',
      author: 'FDA',
      duration: '5 mins',
      description: 'Learn how to read and understand nutrition facts labels to make informed food choices.',
      url: 'https://www.youtube.com/watch?v=mBKm9TGp9-8'
    }
  ]);

  const filteredResources = resources.filter(resource => {
    const matchesType = resourceType === 'all' || resource.type === resourceType;
    const matchesQuery = resourceQuery === '' || 
      resource.title.toLowerCase().includes(resourceQuery.toLowerCase()) ||
      (resource.description && resource.description.toLowerCase().includes(resourceQuery.toLowerCase()));
    return matchesType && matchesQuery;
  });

  const handleSaveResource = (resource) => {
    if (!savedResources.find(r => r.id === resource.id)) {
      setSavedResources([...savedResources, resource]);
    }
  };

  const [assessments, setAssessments] = useState([
    {
      id: 1,
      clientName: 'Sarah Johnson',
      type: 'Initial Assessment',
      date: '2025-05-20',
      status: 'completed',
      healthGoals: 'Weight management and improved energy levels',
      currentStatus: 'Generally healthy, but experiencing fatigue',
      height: 165,
      weight: 68,
      dietaryRestrictions: 'Lactose intolerant',
      notes: 'Client is motivated to make lifestyle changes'
    },
    {
      id: 2,
      clientName: 'Michael Chen',
      type: 'Follow-up Assessment',
      date: '2025-05-23',
      status: 'pending',
      healthGoals: 'Muscle gain and sports performance',
      currentStatus: 'Active lifestyle, regular gym attendance',
      height: 178,
      weight: 75,
      dietaryRestrictions: 'None',
      notes: 'Making good progress on strength goals'
    },
    {
      id: 3,
      clientName: 'Emma Rodriguez',
      type: 'Quarterly Review',
      date: '2025-05-25',
      status: 'completed',
      healthGoals: 'Blood sugar management',
      currentStatus: 'Type 2 diabetes, well controlled',
      height: 162,
      weight: 65,
      dietaryRestrictions: 'Low sugar diet',
      notes: 'Blood sugar levels have improved since last visit'
    }
  ]);

  const [appointments, setAppointments] = useState([
    {
      clientName: 'Sarah Johnson',
      clientId: 1,
      type: 'Initial Consultation',
      date: '2025-05-26',
      time: '10:00',
      duration: '60',
      notes: 'First meeting to discuss nutrition goals'
    },
    {
      clientName: 'Michael Chen',
      clientId: 2,
      type: 'Follow-up',
      date: '2025-05-26',
      time: '14:30',
      duration: '45',
      notes: 'Monthly progress check'
    },
    {
      clientName: 'Emma Davis',
      clientId: 3,
      type: 'Assessment',
      date: '2025-05-27',
      time: '11:00',
      duration: '60',
      notes: 'Quarterly health assessment'
    },
    {
      clientName: 'James Wilson',
      clientId: 4,
      type: 'Follow-up',
      date: '2025-05-28',
      time: '15:00',
      duration: '30',
      notes: 'Review meal plan adjustments'
    }
  ]);

  const clients = [
    {
      id: 1,
      name: 'Sarah Johnson',
      age: 34,
      email: 'sarah.j@email.com',
      phone: '(555) 123-4567',
      status: 'active',
      nextAppointment: '2025-06-02',
      goals: ['Weight Management', 'Sports Nutrition'],
      progress: 75,
      image: 'https://i.pravatar.cc/150?img=1'
    },
    {
      id: 2,
      name: 'Michael Chen',
      age: 28,
      email: 'mchen@email.com',
      phone: '(555) 234-5678',
      status: 'new',
      nextAppointment: '2025-05-30',
      goals: ['Muscle Gain', 'Meal Planning'],
      progress: 25,
      image: 'https://i.pravatar.cc/150?img=2'
    },
    {
      id: 3,
      name: 'Emma Rodriguez',
      age: 42,
      email: 'emma.r@email.com',
      phone: '(555) 345-6789',
      status: 'active',
      nextAppointment: '2025-06-05',
      goals: ['Diabetes Management', 'Heart Health'],
      progress: 60,
      image: 'https://i.pravatar.cc/150?img=3'
    },
    {
      id: 4,
      name: 'David Wilson',
      age: 45,
      email: 'd.wilson@email.com',
      phone: '(555) 456-7890',
      status: 'pending',
      nextAppointment: '2025-06-01',
      goals: ['Weight Loss', 'Cholesterol Management'],
      progress: 40,
      image: 'https://i.pravatar.cc/150?img=4'
    },
    {
      id: 5,
      name: 'Lisa Thompson',
      age: 31,
      email: 'lisa.t@email.com',
      phone: '(555) 567-8901',
      status: 'active',
      nextAppointment: '2025-06-03',
      goals: ['Prenatal Nutrition', 'Wellness'],
      progress: 85,
      image: 'https://i.pravatar.cc/150?img=5'
    }
  ];

  const recipes = [
    {
      id: 1,
      name: 'Mediterranean Quinoa Bowl',
      description: 'A healthy and filling bowl with quinoa, roasted vegetables, and tahini dressing',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800',
      category: 'Lunch',
      prepTime: 30,
      servings: 4,
      difficulty: 'Medium',
      calories: 450,
      nutrition: {
        protein: 15,
        carbs: 65,
        fat: 12,
        fiber: 8
      },
      ingredients: [
        '1 cup quinoa',
        '2 cups mixed vegetables (bell peppers, zucchini, eggplant)',
        '1 can chickpeas',
        '2 tbsp olive oil',
        '1 lemon',
        '2 tbsp tahini',
        'Fresh herbs (parsley, mint)',
        'Salt and pepper to taste'
      ],
      instructions: [
        'Cook quinoa according to package instructions',
        'Roast vegetables with olive oil at 400°F for 25 minutes',
        'Drain and rinse chickpeas, season with spices',
        'Make tahini dressing by mixing tahini, lemon juice, and water',
        'Assemble bowls with quinoa, roasted vegetables, and chickpeas',
        'Drizzle with dressing and garnish with fresh herbs'
      ],
      tags: ['Vegetarian', 'High-Protein', 'Mediterranean']
    },
    {
      id: 2,
      name: 'Protein-Packed Breakfast Bowl',
      description: 'Start your day with this energizing bowl of oats, fruits, and nuts',
      image: 'https://images.unsplash.com/photo-1517673400267-0251440c45dc?auto=format&fit=crop&q=80&w=800',
      category: 'Breakfast',
      prepTime: 15,
      servings: 1,
      difficulty: 'Easy',
      calories: 380,
      nutrition: {
        protein: 18,
        carbs: 45,
        fat: 14,
        fiber: 6
      },
      ingredients: [
        '1/2 cup rolled oats',
        '1 scoop protein powder',
        '1 banana',
        '1/4 cup mixed berries',
        '1 tbsp chia seeds',
        '1 tbsp almond butter',
        'Almond milk to taste',
        'Honey for drizzling'
      ],
      instructions: [
        'Cook oats with almond milk',
        'Stir in protein powder while oats are warm',
        'Top with sliced banana and berries',
        'Sprinkle with chia seeds',
        'Drizzle with almond butter and honey'
      ],
      tags: ['High-Protein', 'Vegetarian', 'Breakfast']
    }
  ];

  const [mealPlan, setMealPlan] = useState(Array(7).fill().map(() => ({
    breakfast: [],
    lunch: [],
    dinner: [],
    snacks: []
  })));

  const dailyGoals = {
    calories: 2000,
    protein: 150,
    carbs: 200,
    fat: 65
  };

  const currentTotals = {
    calories: 1450,
    protein: 95,
    carbs: 160,
    fat: 48
  };

  const handleNewClient = (clientData) => {
    const newClient = {
      id: clients.length + 1,
      ...clientData,
    };
    clients.push(newClient);
    setShowNewClientModal(false);
  };

  const handleScheduleSession = (sessionData) => {
    // Add the appointment to the appointments array
    setAppointments(prev => [...prev, sessionData]);
    setShowScheduleSessionModal(false);
    setSelectedClient(null);
  };

  const handleClientSelect = (client) => {
    setSelectedClient(client);
    setShowSelectClientModal(false);
    setTimeout(() => setShowScheduleSessionModal(true), 100);
  };

  const handleViewProfile = (client) => {
    setSelectedClient(client);
    setShowClientProfileModal(true);
  };

  const handleScheduleForClient = (client) => {
    setSelectedClient(client);
    setShowScheduleSessionModal(true);
  };

  const filteredClients = clients.filter(client => {
    if (clientFilter !== 'all' && client.status !== clientFilter) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        client.name.toLowerCase().includes(query) ||
        client.email.toLowerCase().includes(query) ||
        client.goals.some(goal => goal.toLowerCase().includes(query))
      );
    }
    return true;
  });

  const navItems = [
    { id: 'dashboard', name: 'Dashboard', icon: <Home className="w-5 h-5" /> },
    { id: 'clients', name: 'Clients', icon: <Users className="w-5 h-5" /> },
    { id: 'appointments', name: 'Appointments', icon: <Calendar className="w-5 h-5" /> },
    { id: 'mealPlans', name: 'Meal Plans', icon: <Utensils className="w-5 h-5" /> },
    { id: 'assessments', name: 'Assessments', icon: <ClipboardList className="w-5 h-5" /> },
    { id: 'resources', name: 'Resources', icon: <FileText className="w-5 h-5" /> },
    { id: 'messages', name: 'Messages', icon: <MessageSquare className="w-5 h-5" /> },
    { id: 'settings', name: 'Settings', icon: <Settings className="w-5 h-5" /> },
  ];

  const getActiveTabName = () => {
    const item = navItems.find(item => item.id === activeTab);
    return item ? item.name : '';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
        <div className="px-4 mx-auto max-w-7xl">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => setShowSidebar(!showSidebar)}
                className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100"
              >
                <Menu className="w-5 h-5" />
              </button>
              <span className="ml-4 text-xl font-semibold text-gray-900">NutriCare Pro</span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                className="relative p-2 hover:bg-gray-100 rounded-lg"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <Bell className="w-5 h-5 text-gray-500" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <button
                className="relative p-2 hover:bg-gray-100 rounded-lg"
                onClick={() => setActiveTab('settings')}
              >
                <Settings className="w-5 h-5 text-gray-500" />
              </button>
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg"
                >
                  <img
                    src="https://i.pravatar.cc/150?img=4"
                    alt="Emily Torres-Medaglia"
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="text-left">
                    <div className="text-sm font-medium text-gray-900">Emily Torres-Medaglia</div>
                    <div className="text-xs text-gray-500">R.D.N.</div>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 ring-1 ring-black ring-opacity-5">
                    <button 
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => {
                        setShowUserMenu(false);
                        setActiveTab('settings');
                      }}
                    >
                      Profile Settings
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>


      {/* Sidebar */}
      <aside className={`fixed left-0 top-16 bottom-0 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out ${showSidebar ? 'translate-x-0' : '-translate-x-full'} z-40`}>
        <nav className="mt-5 px-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 mb-1 rounded-lg ${activeTab === item.id ? 'bg-gradient-to-r from-blue-50 to-teal-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              {item.icon}
              <span className="text-sm font-medium">{item.name}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className={`pt-16 ${showSidebar ? 'pl-64' : 'pl-0'} transition-all duration-300`}>
        <div className="p-6">
          {/* Content Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">{getActiveTabName()}</h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="search-icon" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
              </div>
              {activeTab !== 'dashboard' && (
                <button 
                  onClick={() => {
                    // Add new item based on active tab
                  }} 
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-lg hover:from-blue-700 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center space-x-2"
                >
                  <Plus className="w-5 h-5" />
                  <span>Add New</span>
                </button>
              )}
            </div>
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            {activeTab === 'dashboard' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="col-span-2 bg-gradient-to-br from-blue-50 to-teal-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Overview</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <h4 className="text-sm text-gray-500">Appointments Today</h4>
                      <p className="text-2xl font-semibold text-gray-900 mt-1">5</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <h4 className="text-sm text-gray-500">Pending Assessments</h4>
                      <p className="text-2xl font-semibold text-gray-900 mt-1">3</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <h4 className="text-sm text-gray-500">New Messages</h4>
                      <p className="text-2xl font-semibold text-gray-900 mt-1">2</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50">
                      <Calendar className="w-5 h-5" />
                      <span>Schedule Appointment</span>
                    </button>
                    <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50">
                      <ClipboardList className="w-5 h-5" />
                      <span>Create Assessment</span>
                    </button>
                    <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50">
                      <Utensils className="w-5 h-5" />
                      <span>New Meal Plan</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'clients' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setClientFilter('all')}
                    className={`px-4 py-2 rounded-lg ${clientFilter === 'all' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
                  >
                    All Clients
                  </button>
                  <button
                    onClick={() => setClientFilter('active')}
                    className={`px-4 py-2 rounded-lg ${clientFilter === 'active' ? 'bg-green-100 text-green-700' : 'text-gray-600 hover:bg-gray-100'}`}
                  >
                    Active
                  </button>
                  <button
                    onClick={() => setClientFilter('new')}
                    className={`px-4 py-2 rounded-lg ${clientFilter === 'new' ? 'bg-yellow-100 text-yellow-700' : 'text-gray-600 hover:bg-gray-100'}`}
                  >
                    New
                  </button>
                  <button
                    onClick={() => setClientFilter('pending')}
                    className={`px-4 py-2 rounded-lg ${clientFilter === 'pending' ? 'bg-orange-100 text-orange-700' : 'text-gray-600 hover:bg-gray-100'}`}
                  >
                    Pending
                  </button>
                  </div>
                  <button
                    onClick={() => setShowNewClientModal(true)}
                    className="primary-button"
                  >
                    <Plus className="w-5 h-5" />
                    <span>New Client</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredClients.map(client => (
                    <div key={client.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
                      <div className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-4">
                            <img
                              src={client.image}
                              alt={client.name}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900">{client.name}</h3>
                              <p className="text-sm text-gray-500">{client.email}</p>
                            </div>
                          </div>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                            ${client.status === 'active' ? 'bg-green-100 text-green-800' :
                              client.status === 'new' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-orange-100 text-orange-800'
                            }`}
                          >
                            {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                          </span>
                        </div>

                        <div className="mt-4 space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Next Appointment</span>
                            <span className="text-gray-900">{new Date(client.nextAppointment).toLocaleDateString()}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Age</span>
                            <span className="text-gray-900">{client.age} years</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Phone</span>
                            <span className="text-gray-900">{client.phone}</span>
                          </div>
                        </div>

                        <div className="mt-4">
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span className="text-gray-500">Progress</span>
                            <span className="text-gray-900">{client.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${client.progress}%` }}
                            />
                          </div>
                        </div>

                        <div className="mt-4">
                          <h4 className="text-sm font-medium text-gray-900 mb-2">Goals</h4>
                          <div className="flex flex-wrap gap-2">
                            {client.goals.map((goal, index) => (
                              <span
                                key={index}
                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                              >
                                {goal}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="mt-6 flex items-center justify-between">
                          <button 
                            onClick={() => handleViewProfile(client)}
                            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                          >
                            View Details
                          </button>
                          <button 
                            onClick={() => handleScheduleForClient(client)}
                            className="text-sm text-gray-600 hover:text-gray-700 font-medium"
                          >
                            Schedule Session
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeTab === 'appointments' && (
              <div className="space-y-6">
                <AppointmentStats appointments={appointments} />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-1">
                    <AppointmentCalendar
                      selectedDate={selectedDate}
                      onDateSelect={setSelectedDate}
                      appointments={appointments}
                    />
                  </div>
                  <div className="lg:col-span-2">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-gray-900">
                          {selectedDate ? (
                            `Appointments for ${selectedDate.toLocaleDateString()}`
                          ) : (
                            'All Appointments'
                          )}
                        </h2>
                        <button
                          onClick={() => setShowSelectClientModal(true)}
                          className="primary-button"
                        >
                          <Plus className="w-5 h-5" />
                          <span>New Appointment</span>
                        </button>
                        <button
                          className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => {
                            setShowUserMenu(false);
                            setActiveTab('settings');
                          }}
                        >
                          <div className="flex items-center">
                            <Settings className="mr-3 h-5 w-5 text-gray-400" />
                            Settings
                          </div>
                        </button>
                      </div>
                      <AppointmentList
                        appointments={appointments}
                        selectedDate={selectedDate}
                        onEditAppointment={(appointment) => {
                          setSelectedClient(clients.find(c => c.id === appointment.clientId));
                          setShowScheduleSessionModal(true);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'mealPlans' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-semibold text-gray-900">Meal Plans</h1>
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        placeholder="Search..."
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64"
                      />
                    </div>
                    <button
                      onClick={() => setShowAddMealModal(true)}
                      className="px-4 py-2 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-lg hover:from-blue-700 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center space-x-2"
                    >
                      <Plus className="w-5 h-5" />
                      <span>Add New</span>
                    </button>
                  </div>
                </div>
                <NutritionSummary
                  dailyGoals={dailyGoals}
                  currentTotals={currentTotals}
                />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <MealPlanCalendar
                      selectedWeek={selectedWeek}
                      onWeekChange={(days) => {
                        const newDate = new Date(selectedWeek);
                        newDate.setDate(newDate.getDate() + days);
                        setSelectedWeek(newDate);
                      }}
                      mealPlan={mealPlan}
                      onAddMeal={(dayIndex, mealType) => {
                        setSelectedMealDay(dayIndex);
                        setSelectedMealType(mealType);
                        setShowAddMealModal(true);
                      }}
                    />
                  </div>

                  <div className="space-y-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                      <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Recipes</h2>
                      <div className="space-y-4">
                        {recipes.map(recipe => (
                          <RecipeCard
                            key={recipe.id}
                            recipe={recipe}
                            onClick={() => setSelectedRecipe(recipe)}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {selectedRecipe && (
                  <RecipeDetails
                    recipe={selectedRecipe}
                    onClose={() => setSelectedRecipe(null)}
                  />
                )}

                <AddMealModal
                  isOpen={showAddMealModal}
                  onClose={() => setShowAddMealModal(false)}
                  recipes={recipes}
                  onAddMeal={(recipe) => {
                    const newMealPlan = [...mealPlan];
                    newMealPlan[selectedMealDay][selectedMealType.toLowerCase()].push({
                      name: recipe.name,
                      calories: recipe.calories
                    });
                    setMealPlan(newMealPlan);
                  }}
                />
              </div>
            )}
            {activeTab === 'assessments' && (
              <div className="space-y-6">
                <AssessmentStats
                  stats={{
                    total: assessments.length,
                    thisMonth: assessments.filter(a => new Date(a.date).getMonth() === new Date().getMonth()).length,
                    pending: assessments.filter(a => a.status === 'pending').length,
                    completionRate: Math.round((assessments.filter(a => a.status === 'completed').length / assessments.length) * 100)
                  }}
                />

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-gray-900">Recent Assessments</h2>
                    <button
                      onClick={() => setShowNewAssessmentForm(true)}
                      className="primary-button"
                    >
                      <Plus className="w-5 h-5" />
                      <span>New Assessment</span>
                    </button>
                  </div>

                  <AssessmentList
                    assessments={assessments}
                    onViewAssessment={(assessment) => {
                      setSelectedAssessment(assessment);
                      setShowAssessmentForm(true);
                    }}
                  />
                </div>
              </div>
            )}
            {activeTab === 'resources' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Resource Library</h2>
                  <div className="space-y-6">
                    <ResourceSearch
                      query={resourceQuery}
                      onQueryChange={setResourceQuery}
                    />
                    <ResourceFilter
                      activeType={resourceType}
                      onTypeChange={setResourceType}
                    />
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {resourceType === 'all' ? 'All Resources' :
                       resourceType === 'article' ? 'Articles' :
                       resourceType === 'video' ? 'Videos' :
                       resourceType === 'website' ? 'Websites' : 'Organizations'}
                    </h3>
                    {savedResources.length > 0 && (
                      <span className="text-sm text-gray-500">
                        {savedResources.length} saved items
                      </span>
                    )}
                  </div>

                  <ResourceGrid
                    resources={filteredResources}
                    onSaveResource={handleSaveResource}
                  />
                </div>
              </div>
            )}
            {activeTab === 'messages' && (
              <div className="text-center text-gray-500 py-12">
                <MessageSquare className="w-12 h-12 mx-auto text-gray-400" />
                <h3 className="mt-4 text-lg font-medium text-gray-900">No Messages</h3>
                <p className="mt-2">Your inbox is empty. Messages from clients will appear here.</p>
              </div>
            )}
            {activeTab === 'settings' && <ProfileSettings />}
          </div>
        </div>
      </main>

      {/* Modals */}
      <NewClientModal
        isOpen={showNewClientModal}
        onClose={() => setShowNewClientModal(false)}
        onSave={handleNewClient}
      />
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
        clients={clients}
        onSelect={handleClientSelect}
      />

      <AssessmentForm
        isOpen={showAssessmentForm || showNewAssessmentForm}
        assessment={selectedAssessment}
        onClose={() => {
          setShowAssessmentForm(false);
          setShowNewAssessmentForm(false);
          setSelectedAssessment(null);
        }}
        onSave={(assessmentData) => {
          if (selectedAssessment) {
            // Update existing assessment
            setAssessments(assessments.map(a =>
              a.id === selectedAssessment.id ? { ...a, ...assessmentData } : a
            ));
          } else {
            // Add new assessment
            setAssessments([...assessments, {
              id: assessments.length + 1,
              ...assessmentData,
              date: new Date().toISOString().split('T')[0],
              status: 'pending'
            }]);
          }
          setShowAssessmentForm(false);
          setShowNewAssessmentForm(false);
          setSelectedAssessment(null);
        }}
      />
    </div>
  );
};

export default NutriCarePro;
