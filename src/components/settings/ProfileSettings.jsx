import React, { useState } from 'react';
import { 
  User, 
  Bell, 
  Lock, 
  Shield, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Save,
  Camera
} from 'lucide-react';

const ProfileSettings = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, City, State 12345',
    dateOfBirth: '1990-01-01',
    profileImage: null,

    // Notification Preferences
    emailNotifications: true,
    smsNotifications: false,
    appointmentReminders: true,
    newsletterSubscription: true,
    mealPlanUpdates: true,

    // Privacy Settings
    profileVisibility: 'public',
    showEmail: false,
    showPhone: false,
    allowMessaging: true,

    // Account Settings
    language: 'english',
    timezone: 'EST',
    theme: 'light',
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          profileImage: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Saving settings:', formData);
    // Show success message
    alert('Settings saved successfully!');
  };

  const renderPersonalInfo = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-6">
        <div className="relative">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100">
            {formData.profileImage ? (
              <img 
                src={formData.profileImage} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-full h-full p-4 text-gray-400" />
            )}
          </div>
          <label className="absolute bottom-0 right-0 p-1 bg-blue-500 rounded-full cursor-pointer hover:bg-blue-600">
            <Camera className="w-4 h-4 text-white" />
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </label>
        </div>
        <div className="flex-1">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="block w-full pl-10 rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Phone className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="block w-full pl-10 rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="block w-full pl-10 rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              className="block w-full pl-10 rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Email Notifications</h3>
        <div className="space-y-4">
          {[
            { id: 'emailNotifications', label: 'General Email Notifications' },
            { id: 'appointmentReminders', label: 'Appointment Reminders' },
            { id: 'newsletterSubscription', label: 'Newsletter Subscription' },
            { id: 'mealPlanUpdates', label: 'Meal Plan Updates' },
          ].map(({ id, label }) => (
            <div key={id} className="flex items-center">
              <input
                type="checkbox"
                id={id}
                name={id}
                checked={formData[id]}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor={id} className="ml-3 text-sm text-gray-700">
                {label}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 space-y-4">
        <h3 className="text-lg font-medium text-gray-900">SMS Notifications</h3>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="smsNotifications"
            name="smsNotifications"
            checked={formData.smsNotifications}
            onChange={handleInputChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="smsNotifications" className="ml-3 text-sm text-gray-700">
            Enable SMS notifications
          </label>
        </div>
      </div>
    </div>
  );

  const renderPrivacy = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Profile Visibility</h3>
        <div className="space-y-4">
          <div className="flex items-center">
            <input
              type="radio"
              id="public"
              name="profileVisibility"
              value="public"
              checked={formData.profileVisibility === 'public'}
              onChange={handleInputChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <label htmlFor="public" className="ml-3">
              <div className="text-sm font-medium text-gray-900">Public</div>
              <p className="text-sm text-gray-500">Anyone can view your profile</p>
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="private"
              name="profileVisibility"
              value="private"
              checked={formData.profileVisibility === 'private'}
              onChange={handleInputChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <label htmlFor="private" className="ml-3">
              <div className="text-sm font-medium text-gray-900">Private</div>
              <p className="text-sm text-gray-500">Only you can view your profile</p>
            </label>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information Visibility</h3>
        <div className="space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="showEmail"
              name="showEmail"
              checked={formData.showEmail}
              onChange={handleInputChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="showEmail" className="ml-3 text-sm text-gray-700">
              Show email address on profile
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="showPhone"
              name="showPhone"
              checked={formData.showPhone}
              onChange={handleInputChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="showPhone" className="ml-3 text-sm text-gray-700">
              Show phone number on profile
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="allowMessaging"
              name="allowMessaging"
              checked={formData.allowMessaging}
              onChange={handleInputChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="allowMessaging" className="ml-3 text-sm text-gray-700">
              Allow others to send you messages
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAccountSettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Preferences</h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Language</label>
            <select
              name="language"
              value={formData.language}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="english">English</option>
              <option value="spanish">Spanish</option>
              <option value="french">French</option>
              <option value="german">German</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Timezone</label>
            <select
              name="timezone"
              value={formData.timezone}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="EST">Eastern Time (EST)</option>
              <option value="CST">Central Time (CST)</option>
              <option value="MST">Mountain Time (MST)</option>
              <option value="PST">Pacific Time (PST)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Theme</h3>
        <div className="space-y-4">
          <div className="flex items-center">
            <input
              type="radio"
              id="light"
              name="theme"
              value="light"
              checked={formData.theme === 'light'}
              onChange={handleInputChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <label htmlFor="light" className="ml-3 text-sm text-gray-700">
              Light Mode
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="dark"
              name="theme"
              value="dark"
              checked={formData.theme === 'dark'}
              onChange={handleInputChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <label htmlFor="dark" className="ml-3 text-sm text-gray-700">
              Dark Mode
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="md:grid md:grid-cols-3 md:gap-6">
        {/* Navigation Sidebar */}
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Profile Settings</h3>
            <p className="mt-1 text-sm text-gray-600">
              Manage your account settings and preferences
            </p>
            <nav className="mt-5 space-y-1">
              {[
                { id: 'personal', icon: User, label: 'Personal Information' },
                { id: 'notifications', icon: Bell, label: 'Notifications' },
                { id: 'privacy', icon: Shield, label: 'Privacy' },
                { id: 'account', icon: Lock, label: 'Account Settings' },
              ].map(({ id, icon: Icon, label }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`${
                    activeTab === id
                      ? 'bg-blue-50 border-blue-500 text-blue-700'
                      : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  } flex items-center w-full px-3 py-2 text-sm font-medium border-l-4`}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="mt-5 md:mt-0 md:col-span-2">
          <form onSubmit={handleSubmit}>
            <div className="shadow sm:rounded-md sm:overflow-hidden">
              <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                {activeTab === 'personal' && renderPersonalInfo()}
                {activeTab === 'notifications' && renderNotifications()}
                {activeTab === 'privacy' && renderPrivacy()}
                {activeTab === 'account' && renderAccountSettings()}
              </div>
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button
                  type="submit"
                  className="inline-flex justify-center items-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
