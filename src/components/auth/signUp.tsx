import { useState, type ChangeEvent } from 'react';
import { User, Mail, Lock, Upload, Check, Building2, ShoppingCart } from 'lucide-react';

interface FormData {
  email: string;
  password: string;
  role: 'supplier' | 'client' | '';
  profilePicture: File | null;
}

interface FormErrors {
  email?: string;
  password?: string;
  role?: string;
}

interface Step {
  number: number;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
}

const MarketplaceStepper: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    role: '',
    profilePicture: null
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const steps: Step[] = [
    { number: 1, title: 'Account Details', icon: User },
    { number: 2, title: 'Choose Role', icon: Building2 },
    { number: 3, title: 'Profile Picture', icon: Upload }
  ];

  const validateStep1 = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = (): boolean => {
    if (!formData.role) {
      setErrors({ role: 'Please select a role' });
      return false;
    }
    setErrors({});
    return true;
  };

  const handleNext = (): void => {
    if (currentStep === 1 && !validateStep1()) return;
    if (currentStep === 2 && !validateStep2()) return;
    
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = (): void => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string | File | null): void => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing (only for fields that can have errors)
    if (field in errors && errors[field as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0] || null;
    if (file) {
      setFormData(prev => ({
        ...prev,
        profilePicture: file
      }));
    }
  };

  const handleSubmit = (): void => {
    console.log('Registration completed:', formData);
    alert('Registration completed successfully!');
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Create Your Account</h2>
        <p className="text-gray-600">Enter your email and password to get started</p>
      </div>
      
      <div className="space-y-4">
        <div>
          <div className="relative">
            <Mail
             className=" left-3 top-1/2 transform -translate-y-1/2 text-gray-900 h-5 w-5"
            />
            <input
              type="email"
              placeholder="Enter your email"
              value={formData.email}

              onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange('email', e.target.value)}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
            />
          </div>
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
        
        <div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange('password', e.target.value)}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
            />
          </div>
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Role</h2>
        <p className="text-gray-600">Select how you want to use our marketplace</p>
      </div>
      
      <div className="space-y-4">
        <div 
          onClick={() => handleInputChange('role', 'supplier' as const)}
          className={`p-6 border-2 rounded-lg cursor-pointer transition-all hover:border-orange-300 ${
            formData.role === 'supplier' ? 'border-orange-500 bg-orange-50' : 'border-gray-200'
          }`}
        >
          <div className="flex items-center space-x-4">
            <div className={`p-3 rounded-full ${
              formData.role === 'supplier' ? 'bg-orange-100' : 'bg-gray-100'
            }`}>
              <Building2 className={`h-6 w-6 ${
                formData.role === 'supplier' ? 'text-orange-600' : 'text-gray-600'
              }`} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Supplier</h3>
              <p className="text-gray-600">I want to sell products or services</p>
            </div>
          </div>
        </div>
        
        <div 
          onClick={() => handleInputChange('role', 'client' as const)}
          className={`p-6 border-2 rounded-lg cursor-pointer transition-all hover:border-orange-300 ${
            formData.role === 'client' ? 'border-orange-500 bg-orange-50' : 'border-gray-200'
          }`}
        >
          <div className="flex items-center space-x-4">
            <div className={`p-3 rounded-full ${
              formData.role === 'client' ? 'bg-orange-100' : 'bg-gray-100'
            }`}>
              <ShoppingCart className={`h-6 w-6 ${
                formData.role === 'client' ? 'text-orange-600' : 'text-gray-600'
              }`} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Client</h3>
              <p className="text-gray-600">I want to buy products or services</p>
            </div>
          </div>
        </div>
      </div>
      
      {errors.role && <p className="text-red-500 text-sm mt-2 text-center">{errors.role}</p>}
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Profile Picture</h2>
        <p className="text-gray-600">Add a profile picture to personalize your account (optional)</p>
      </div>
      
      <div className="flex flex-col items-center space-y-4">
        <div className="w-32 h-32 rounded-full border-4 border-gray-200 flex items-center justify-center bg-gray-50 overflow-hidden">
          {formData.profilePicture ? (
            <img 
              src={URL.createObjectURL(formData.profilePicture)} 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          ) : (
            <User className="w-12 h-12 text-gray-400" />
          )}
        </div>
        
        <label className="cursor-pointer">
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleFileUpload}
            className="hidden"
          />
          <div className="px-6 py-3 bg-white border-2 border-gray-300 rounded-lg hover:border-orange-500 transition-colors flex items-center space-x-2">
            <Upload className="h-5 w-5 text-gray-600" />
            <span className="text-gray-700">Choose Photo</span>
          </div>
        </label>
        
        {formData.profilePicture && (
          <p className="text-sm text-green-600 flex items-center">
            <Check className="h-4 w-4 mr-1" />
            Photo uploaded successfully
          </p>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        {/* Stepper Header */}
        <div className="flex items-center justify-between mb-8">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                currentStep >= step.number 
                  ? 'bg-orange-500 text-white' 
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {currentStep > step.number ? (
                  <Check className="h-5 w-5" />
                ) : (
                  step.number
                )}
              </div>
              {index < steps.length - 1 && (
                <div className={`w-12 h-0.5 mx-2 transition-colors ${
                  currentStep > step.number ? 'bg-orange-500' : 'bg-gray-200'
                }`}></div>
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="mb-8">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between space-x-4">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              currentStep === 1 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Previous
          </button>
          
          {currentStep < 3 ? (
            <button
              onClick={handleNext}
              className="px-6 py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors"
            >
              Continue
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
            >
              Complete Registration
            </button>
          )}
        </div>

        {/* Skip Option for Step 3 */}
        {currentStep === 3 && (
          <div className="text-center mt-4">
            <button
              onClick={handleSubmit}
              className="text-gray-500 hover:text-gray-700 text-sm underline"
            >
              Skip and complete registration
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketplaceStepper;