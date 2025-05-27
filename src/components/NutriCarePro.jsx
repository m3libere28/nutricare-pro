import React, { useState } from 'react';
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
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showSidebar, setShowSidebar] = useState(false);
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
  const [resources, setResources] = useState([
    {
      id: 1,
      type: 'website',
      title: 'Academy of Nutrition and Dietetics',
      organization: 'Academy of Nutrition and Dietetics',
      description: 'Professional Organization',
      url: 'https://www.eatright.org',
      peerReviewed: true
    },
    {
      id: 2,
      type: 'video',
      title: 'Understanding Food Labels',
      author: 'FDA',
      duration: '5 mins',
      description: 'Learn how to read and understand nutrition facts labels.',
      url: 'https://www.youtube.com/watch?v=example',
      peerReviewed: true
    }
  ]);

  // Navigation items
  const navItems = [
    { id: 'dashboard', name: 'Dashboard', icon: <Home className="h-5 w-5" /> },
    { id: 'clients', name: 'Clients', icon: <Users className="h-5 w-5" /> },
    { id: 'appointments', name: 'Appointments', icon: <Calendar className="h-5 w-5" /> },
    { id: 'assessments', name: 'Assessments', icon: <ClipboardList className="h-5 w-5" /> },
    { id: 'mealPlans', name: 'Meal Plans', icon: <Utensils className="h-5 w-5" /> },
    { id: 'resources', name: 'Resources', icon: <BookOpen className="h-5 w-5" /> },
    { id: 'messages', name: 'Messages', icon: <MessageSquare className="h-5 w-5" /> },
    { id: 'settings', name: 'Settings', icon: <Settings className="h-5 w-5" /> }
  ];

  const getActiveTabName = () => {
    const activeItem = navItems.find(item => item.id === activeTab);
    return activeItem ? activeItem.name : '';
  };

  const handleNewClient = (clientData) => {
    // Add new client logic
    setShowNewClientModal(false);
  };

  const handleScheduleSession = (sessionData) => {
    // Schedule session logic
    setShowScheduleSessionModal(false);
  };

  const handleClientSelect = (client) => {
    setSelectedClient(client);
    setShowSelectClientModal(false);
  };

  const handleViewProfile = (client) => {
    setSelectedClient(client);
    setShowClientProfileModal(true);
  };

  const handleScheduleForClient = (client) => {
    setSelectedClient(client);
    setShowScheduleSessionModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <button
                onClick={() => setShowSidebar(!showSidebar)}
                className="text-gray-500 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <Menu className="h-6 w-6" />
              </button>
              <h1 className="ml-4 text-xl font-semibold text-gray-900">{getActiveTabName()}</h1>
            </div>
            <div className="flex items-center space-x-4">
              <NotificationBell />
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 text-gray-500 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <User className="h-6 w-6" />
                  <ChevronDown className="h-4 w-4" />
                </button>
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 gap-6">
          {activeTab === 'dashboard' && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="col-span-2">
                  <NewsFeed />
                </div>
                <div className="space-y-6">
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
                    <div className="space-y-4">
                      <button
                        onClick={() => setShowSelectClientModal(true)}
                        className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 space-x-2"
                      >
                        <Calendar className="w-5 h-5" />
                        <span>Schedule Appointment</span>
                      </button>
                      <button
                        onClick={() => setShowNewAssessmentForm(true)}
                        className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 space-x-2"
                      >
                        <ClipboardList className="w-5 h-5" />
                        <span>New Assessment</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'clients' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search clients..."
                      className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    value={clientFilter}
                    onChange={(e) => setClientFilter(e.target.value)}
                    className="pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg"
                  >
                    <option value="all">All Clients</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                <button
                  onClick={() => setShowNewClientModal(true)}
                  className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Add Client
                </button>
              </div>
            </div>
          )}

          {activeTab === 'appointments' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <AppointmentCalendar
                  selectedDate={selectedDate}
                  onDateSelect={setSelectedDate}
                />
              </div>
              <div>
                <AppointmentStats />
                <div className="mt-6">
                  <AppointmentList />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'assessments' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <AssessmentList />
              </div>
              <div>
                <AssessmentStats />
              </div>
            </div>
          )}

          {activeTab === 'mealPlans' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <MealPlanCalendar
                  selectedWeek={selectedWeek}
                  onWeekChange={setSelectedWeek}
                />
              </div>
              <div>
                <NutritionSummary />
                <div className="mt-6">
                  <RecipeCard />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'resources' && (
            <div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
                <ResourceFilter
                  resourceType={resourceType}
                  onTypeChange={setResourceType}
                />
                <ResourceSearch
                  query={resourceQuery}
                  onQueryChange={setResourceQuery}
                />
              </div>
              <ResourceGrid
                resources={resources}
                savedResources={savedResources}
                onSave={(resource) => {
                  if (!savedResources.find(r => r.id === resource.id)) {
                    setSavedResources([...savedResources, resource]);
                  }
                }}
              />
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
        onSelect={handleClientSelect}
      />
      <AddMealModal
        isOpen={showAddMealModal}
        onClose={() => setShowAddMealModal(false)}
        selectedDay={selectedMealDay}
        mealType={selectedMealType}
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
